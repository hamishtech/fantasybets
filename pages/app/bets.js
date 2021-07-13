import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/dist/client/router";
import React from "react";
import AppShell from "../../components/app/appShell";
import BetsOverview from "../../components/app/bets";
import { games } from "../../mockData/gamesData";

export default withPageAuthRequired(function Profile({ user, matches }) {
  const router = useRouter();

  return (
    <AppShell user={user}>
      <BetsOverview matches={matches} />
    </AppShell>
  );
});

export async function getServerSideProps(context) {
  return {
    props: { matches: games },
  };
}
