import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Box, Container } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import AppShell from "../../components/app/appShell";

export default withPageAuthRequired(function Profile({ user }) {
  const router = useRouter();
  console.log(router);

  return <AppShell user={user}>leaderboard</AppShell>;
});

export const getServerSideProps = withPageAuthRequired();
