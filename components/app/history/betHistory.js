import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Text,
  Td,
  TableCaption,
} from "@chakra-ui/react";

const BetHistory = ({ userDB }) => {
  if (userDB.bets.length < 1) {
    return <Text>No bet history</Text>;
  }
  return (
    <>
      {" "}
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Home</Th>
            <Th>Away</Th>
            <Th>Your Prediction</Th>
            <Th>Status</Th>
            <Th isNumeric>Score</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userDB.bets.length > 0
            ? userDB.bets.map((bet) => {
                return (
                  <Tr key={bet.id}>
                    <Td>{bet.match.home}</Td> <Td>{bet.match.away}</Td>
                    <Td>{bet.predictedRes}</Td>
                    <Td>{bet.status}</Td>
                    <Td isNumeric>
                      {bet.status === "won"
                        ? bet.expectedWin
                        : bet.status === "pending"
                        ? "pending"
                        : -200}
                    </Td>
                  </Tr>
                );
              })
            : null}
        </Tbody>
        <Tr>
          <Th></Th>
          <Th></Th>
          <Th></Th>
          <Th></Th>
          <Th isNumeric>Total:{userDB.score}</Th>
        </Tr>
      </Table>
    </>
  );
};

export default BetHistory;
