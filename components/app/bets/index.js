import {
  Button,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useUserDBContext } from "../../../context/UserDBContext";
import Row from "./row";

const BetsOverview = ({ user }) => {
  const [matches, setMatches] = useState(null);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);
  const [userFromDB, setUserDBFromContext] = useUserDBContext();
  const [picks, setPicks] = useState(null);
  const [total, setTotal] = useState([0, 0]);
  const router = useRouter();

  const handleSubmit = () => {
    console.log(picks);
    if (picks.includes(undefined)) {
      return console.log("not completed");
    } else {
      const userWithUpdatedBets = userFromDB;
      userWithUpdatedBets.bets = userWithUpdatedBets.bets.concat(picks);
      axios.put(`../api/users/${user.sub}`, userWithUpdatedBets).then((res) => {
        setUserDBFromContext(res.updatedUser);
        router.push("/app/history");
      });
    }
  };

  useEffect(() => {
    axios.get("../api/bets").then((result) => {
      setMatches(result.data.bets);
      setPicks(new Array(result.data.bets.length));
      setTotal(
        Array.apply(null, Array(result.data.bets.length)).map(function (x, i) {
          return 0;
        })
      );
    });
    return () => {};
  }, []);

  useEffect(() => {
    if (userFromDB && matches) {
      if (userFromDB.bets.length > 0) {
        userFromDB.bets.forEach((bet) => {
          for (let i = 0; i < matches.length; i++) {
            console.log(bet.id, matches[i].matchId);
            if (matches[i].matchId === bet.id) {
              return setAlreadyPlayed(true);
            }
          }
        });
      }
    }
    return () => {};
  }, [matches]);

  if (alreadyPlayed) {
    return (
      <Text>
        You have already played for this week, check your Bet History on the
        sidebar
      </Text>
    );
  }

  if (!matches) {
    return <Spinner />;
  }

  return (
    <>
      <Table colorScheme='green'>
        <TableCaption>
          <Button
            bg='red.400'
            onClick={handleSubmit}
            _hover={{
              background: "red.500",
            }}
          >
            Submit Bets
          </Button>
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Home</Th>
            <Th>Away</Th>
            <Th>Wager</Th>
            <Th>Choices</Th>
            <Th>Expected Winning</Th>
          </Tr>
        </Thead>
        <Tbody>
          {matches.map((match, index) => {
            return (
              <Row
                key={match.home}
                index={index}
                total={total}
                setTotal={setTotal}
                setPicks={setPicks}
                picks={picks}
                match={match}
              />
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th>
              Total:
              {total.reduce((sum, number) => {
                return sum + number;
              }, 0)}
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </>
  );
};

export default BetsOverview;
