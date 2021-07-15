import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Button, Center, Heading, Stack } from "@chakra-ui/react";
import axios from "axios";
import { ObjectID } from "mongodb";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import AppShell from "../../components/app/appShell";
import BetsOverview from "../../components/app/bets";
import BetHistory from "../../components/app/history/betHistory";
import SetNickName from "../../components/app/home/setNickName";
import Leaderboard from "../../components/app/leaderboard";
import { useUserDBContext } from "../../context/UserDBContext";
import { connectToDatabase } from "../../util/mongodb";

export default withPageAuthRequired(function Profile({ user, userDB }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [_, setUserDBFromContext] = useUserDBContext();
  const { page } = router.query;

  useEffect(() => {
    setUserDBFromContext(userDB);
    if (!userDB.nickName) {
      setIsOpen(true);
    }
  }, []);

  if (page === "home") {
    return (
      <AppShell userDB={userDB}>
        <SetNickName isOpen={isOpen} userDB={userDB} setIsOpen={setIsOpen} />
      </AppShell>
    );
  }
  if (page === "bets") {
    return (
      <AppShell userDB={userDB}>
        <SetNickName isOpen={isOpen} userDB={userDB} setIsOpen={setIsOpen} />
        <BetsOverview user={user} />
      </AppShell>
    );
  }
  if (page === "leaderboard") {
    return (
      <AppShell userDB={userDB}>
        <SetNickName isOpen={isOpen} userDB={userDB} setIsOpen={setIsOpen} />
        <Leaderboard />
      </AppShell>
    );
  }
  if (page === "history") {
    return (
      <AppShell userDB={userDB}>
        <SetNickName isOpen={isOpen} userDB={userDB} setIsOpen={setIsOpen} />
        <BetHistory userDB={userDB} />
      </AppShell>
    );
  }

  return (
    <Center>
      <Stack>
        <Heading>Page Not Found</Heading>
        <Button
          onClick={() => {
            router.push("/");
          }}
        >
          Back to homepage
        </Button>
      </Stack>
    </Center>
  );
});

export async function getServerSideProps({ req, res }) {
  const { db } = await connectToDatabase();
  const session = await getSession(req, res);
  const id = session.user.sub;
  const userDB = await db.collection("users").find({ _id: id }).toArray();

  if (userDB.length === 0) {
    const savedUser = await db.collection("users").insertOne({
      _id: session.user.sub,
      name: session.user.name,
      email: session.user.email,
      bets: [],
      score: 0,
    });
    return {
      props: { userDB: savedUser.ops[0] },
    };
  }

  const results = await db
    .collection("results")
    .findOne({ _id: ObjectID("60effab741222d111df5caf0") });

  //updating bets
  let updatedBets = userDB[0].bets;
  if (results && updatedBets.length > 0) {
    updatedBets = updatedBets.map((bet) => {
      if (results[bet.id] && results[bet.id].status !== "pending") {
        if (bet.predictedRes === results[bet.id].result) {
          return { ...bet, status: "won" };
        } else {
          return { ...bet, status: "lost" };
        }
      }
      return bet;
    });
  }

  let score = 0;
  updatedBets.forEach((bet) => {
    if (bet.status === "won") {
      return (score += bet.expectedWin);
    } else if (bet.status === "pending") {
      return;
    } else {
      return (score -= 200);
    }
  });
  userDB[0].bets = updatedBets;
  userDB[0].score = score;

  return {
    props: { userDB: userDB[0] },
  };
}
