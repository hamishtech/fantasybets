//For new bets -> send PUT request with fully new bet object to
// PUT: http://localhost:3000/api/bets/

export const bets = {
  bets: [
    {
      matchId: "manlee",
      home: "Manutd",
      away: "Leeds",
      homeOdds: 1.35,
      drawOdds: 1.62,
      awayOdds: 2.21,
    },
    {
      matchId: "checry",
      home: "Chelsea",
      away: "Crystal Palace",
      homeOdds: 1.52,
      drawOdds: 2.35,
      awayOdds: 2.61,
    },
    {
      matchId: "leiwol",
      home: "Leicester",
      away: "Wolves",
      homeOdds: 1.63,
      drawOdds: 1.62,
      awayOdds: 2.62,
    },
    {
      matchId: "norliv",
      home: "Norwich",
      away: "Liverpool",
      homeOdds: 1.63,
      drawOdds: 1.62,
      awayOdds: 2.62,
    },
    {
      matchId: "spucit",
      home: "Spurs",
      away: "City",
      homeOdds: 1.63,
      drawOdds: 1.62,
      awayOdds: 2.62,
    },
  ],
};
