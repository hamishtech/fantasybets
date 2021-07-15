import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

const Leaderboard = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios.get("/api/users/").then((res) => {
      setUsers(res.data);
    });
  }, []);

  if (!users) {
    return <Spinner />;
  }
  return (
    <>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Player</Th>
            <Th isNumeric>Score</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => {
            return (
              <Tr key={user._id}>
                <Td>{user.nickName}</Td>
                <Td isNumeric>{user.score}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

export default Leaderboard;
