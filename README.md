Instructions: ADDING NEW BETS -> replace `activeBets.js` object completely with new bets. in the format below
Send PUT Request to `PUT: http://localhost:3000/api/bets/`

<!-- export const bets = {
bets: [
{
matchId: "souspu",
home: "southampton",
away: "spurs",
homeOdds: 1.35,
drawOdds: 1.62,
awayOdds: 2.21,
},
{
matchId: "leewes",
home: "leeds",
away: "westHam",
homeOdds: 1.52,
drawOdds: 2.35,
awayOdds: 2.61,
},
{
matchId: "bureve",
home: "burnley",
away: "everton",
homeOdds: 1.63,
drawOdds: 1.62,
awayOdds: 2.62,
},
],
}; -->

Instructions: ADDING Results -> replace `results.js` object completely with new bets. in the format below
Send PUT Request to `PUT: http://localhost:3000/api/bets/results`

<!--
export const results = {
// barrea: { result: "home" },
// baydor: { result: "away" },
// totsou: { result: "away" },
// leewes: { result: "away" },
// bureve: { result: "away" },
}; -->

Automation:
--> pull PL games every week and set it as active bets
--> pull results after matchday-> Monday evenings? set results 
--> Send email reminder to bet