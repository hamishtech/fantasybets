export const games = [
  {
    id: "livman",
    teams: { home: "liverpool", away: "manutd" },
    odds: {
      home: (Math.random() + 1).toFixed(2),
      draw: (Math.random() + 1).toFixed(2),
      away: (Math.random() + 2).toFixed(2),
    },
  },
  {
    id: "citche",
    teams: { home: "city", away: "chelsea" },
    odds: {
      home: (Math.random() + 1).toFixed(2),
      draw: (Math.random() + 1).toFixed(2),
      away: (Math.random() + 2).toFixed(2),
    },
  },
  {
    id: "arseve",
    teams: { home: "arsenal", away: "everton" },
    odds: {
      home: (Math.random() + 1).toFixed(2),
      draw: (Math.random() + 1).toFixed(2),
      away: (Math.random() + 2).toFixed(2),
    },
  },
  {
    id: "totsou",
    teams: { home: "spurs", away: "southampton" },
    odds: {
      home: (Math.random() + 1).toFixed(2),
      draw: (Math.random() + 1).toFixed(2),
      away: (Math.random() + 2).toFixed(2),
    },
  },
  {
    id: "wolbur",
    teams: { home: "wolves", away: "burnley" },
    odds: {
      home: (Math.random() + 1).toFixed(2),
      draw: (Math.random() + 1).toFixed(2),
      away: (Math.random() + 2).toFixed(2),
    },
  },
  {
    id: "astwes",
    teams: { home: "astonVilla", away: "westham" },
    odds: {
      home: (Math.random() + 1).toFixed(2),
      draw: (Math.random() + 1).toFixed(2),
      away: (Math.random() + 2).toFixed(2),
    },
  },
];

export const results = {
  citliv: { result: "home" },
  cheman: { result: "away" },
  souspu: { result: "home" },
  leewes: { result: "draw" },
  livman: { result: "draw" },
  bureve: { result: "away" },
};
