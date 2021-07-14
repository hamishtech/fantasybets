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
      <Td>{match.home}</Td>
      <Td>{match.away}</Td>
      <Td align='left'>
        <NumberInput width='100px' isDisabled defaultValue={200}>
          <NumberInputField />
          <NumberInputStepper></NumberInputStepper>
        </NumberInput>{" "}
      </Td>
      <Td>
        <RadioGroup>
          <Stack justifyContent='flex-start'>
            <Radio
              onChange={(e) => {
                updateExpectedWin(e.target.value);
                const pick = {
                  id: match.matchId,
                  match,
                  status: "pending",
                  result: "",
                  predictedRes: "home",
                  expectedWin: e.target.value * 200,
                };
                const newPicks = picks;
                newPicks[index] = pick;
                setPicks(newPicks);
              }}
              value={match.homeOdds.toString()}
            >
              {match.homeOdds}
            </Radio>
            <Radio
              onChange={(e) => {
                updateExpectedWin(e.target.value);
                const pick = {
                  id: match.matchId,
                  match,
                  status: "pending",
                  result: "",
                  predictedRes: "draw",
                  expectedWin: e.target.value * 200,
                };
                const newPicks = picks;
                newPicks[index] = pick;
                setPicks(newPicks);
              }}
              value={match.drawOdds.toString()}
            >
              {match.drawOdds}
            </Radio>
            <Radio
              onChange={(e) => {
                updateExpectedWin(e.target.value);
                const pick = {
                  id: match.matchId,
                  match,
                  status: "pending",
                  result: "",
                  predictedRes: "away",
                  expectedWin: e.target.value * 200,
                };
                const newPicks = picks;
                newPicks[index] = pick;
                setPicks(newPicks);
              }}
              value={match.awayOdds.toString()}
            >
              {match.awayOdds}
            </Radio>
          </Stack>
        </RadioGroup>
      </Td>
      <Td>{expectedWin}</Td>
    </Tr>
  );
};

export default Row;
