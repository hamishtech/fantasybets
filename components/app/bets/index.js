import {
  Button,
  Table,
  TableCaption,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Row from "./row";

const BetsOverview = ({ matches }) => {
  const [picks, setPicks] = useState(new Array(matches.length));
  const [total, setTotal] = useState(
    Array.apply(null, Array(matches.length)).map(function (x, i) {
      return 0;
    })
  );

  const handleSubmit = () => {
    picks.includes(undefined)
      ? console.log("not completed")
      : console.log("completeed");
  };

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
                key={match.teams.home}
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
