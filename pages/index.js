import { getSession } from "@auth0/nextjs-auth0";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  ListItem,
  OrderedList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { connectToDatabase } from "../util/mongodb";

export default function Home({ user, isConnected }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap'
          rel='stylesheet'
        />
      </Head>

      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Welcome to <br />
            <Text as={"span"} color={"green.400"}>
              FantasyBets{" "}
            </Text>
          </Heading>
          <Text>
            Fantasy bets is where we decide who is the better football analyst
          </Text>
          <Box textAlign='left'>
            <Text fontWeight='bold'>Features</Text>{" "}
            <OrderedList>
              <ListItem>Get 1000 coins each week</ListItem>
              <ListItem>
                Use your coins to place your bets on 5? handpicked games in
                premier league (single bet or accumulator)
              </ListItem>
              <ListItem>Results will be reflected in a leaderboard</ListItem>
              <ListItem>
                At the end of the season, distribute the prize to the winner
                according to the leaderboard.
              </ListItem>
            </OrderedList>
          </Box>
          <HStack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            {user ? (
              <>
                <Button
                  bg='green.400'
                  onClick={() => {
                    router.push("/app/home");
                  }}
                >
                  Enter App{" "}
                </Button>{" "}
                <Button
                  bg='red.400'
                  onClick={() => {
                    router.push("/api/auth/logout");
                  }}
                >
                  Logout{" "}
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  router.push("/api/auth/login");
                }}
              >
                Login{" "}
              </Button>
            )}
          </HStack>
          <Box>
            <Text>
              Status: {user ? `Logged in as ${user.email}` : "Not Logged In"}
            </Text>
            <Text>
              DB: {isConnected ? `connected` : "not connected"}
            </Text>
          </Box>
        </Stack>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase();
  const session = getSession(context.req, context.res);

  const isConnected = await client.isConnected();

  return {
    props: { isConnected, user: session ? session.user : null },
  };
}
