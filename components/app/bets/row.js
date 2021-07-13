import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Stack,
  Td,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Row = ({ match, setPicks, index, picks, total, setTotal }) => {
  const [expectedWin, setExpectedWin] = useState(0);

  const updateExpectedWin = (odds) => {
    let expectedWin = odds * 200;
    setExpectedWin(expectedWin.toFixed(0));
    const newTotal = [...total];
    newTotal[index] = odds * 200;
    setTotal(newTotal);
  };

  return (
    <Tr>
      <Td>{match.teams.home}</Td>
      <Td>{match.teams.away}</Td>
      <Td align='left'>
        <NumberInput width='100px' defaultValue={200}>
          <NumberInputField />
          <NumberInputStepper></NumberInputStepper>
        </NumberInput>{" "}
      </Td>
      <Td>
        <RadioGroup>
          <Stack justifyContent='flex-start'>
            <Radio
              value={match.odds.home}
              onChange={(e) => {
                updateExpectedWin(e.target.value);
                const pick = {
                  matchID: match.id,
                  match,
                  predictedRes: "home",
                  expectedWin: e.target.value * 200,
                };
                const newPicks = picks;
                newPicks[index] = pick;
                setPicks(newPicks);
              }}
            >
              {match.odds.home}
            </Radio>
            <Radio
              onChange={(e) => {
                updateExpectedWin(e.target.value);
                const pick = {
                  matchID: match.id,
                  match,
                  predictedRes: "draw",
                  expectedWin: e.target.value * 200,
                };
                const newPicks = picks;
                newPicks[index] = pick;
                setPicks(newPicks);
              }}
              value={match.odds.draw}
            >
              {match.odds.draw}
            </Radio>
            <Radio
              onChange={(e) => {
                updateExpectedWin(e.target.value);
                const pick = {
                  matchID: match.id,
                  match,
                  predictedRes: "away",
                  expectedWin: e.target.value * 200,
                };
                const newPicks = picks;
                newPicks[index] = pick;
                setPicks(newPicks);
              }}
              value={match.odds.away}
            >
              {match.odds.away}
            </Radio>
          </Stack>
        </RadioGroup>
      </Td>
      <Td>{expectedWin}</Td>
    </Tr>
  );
};

export default Row;
