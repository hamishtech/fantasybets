// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { ObjectID } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

export default withApiAuthRequired(async function handler(req, res) {
  const session = getSession(req, res);
  if (req.method === "POST") {
    try {
      const { db } = await connectToDatabase();
      const savedUser = await db
        .collection("users")
        .save({ name: session.user.name, email: session.user.email });
      res.json(savedUser.ops[0]);
    } catch (error) {
      console.log(error);
    }
  } else if (req.method === "GET") {
    try {
      const { db } = await connectToDatabase();
      let users = await db.collection("users").find().toArray();
      console.log(users);

      const results = await db
        .collection("results")
        .findOne({ _id: ObjectID("60effab741222d111df5caf0") });

      if (users.length > 0) {
        const usersWithWinLoss = users.map((user) => {
          if (results && user.bets.length > 0) {
            let updatedBets = user.bets.map((bet) => {
              if (results[bet.id] && results[bet.id].status !== "pending") {
                if (bet.predictedRes === results[bet.id].result) {
                  return { ...bet, status: "won" };
                } else {
                  return { ...bet, status: "lost" };
                }
              } else return bet;
            });
            return { ...user, bets: updatedBets };
          } else return user;
        });
        users = usersWithWinLoss;
      }

      let userWithScores = users.map((user) => {
        let score = 0;
        if (user.bets.length < 1) {
          return user;
        }
        user.bets.forEach((bet) => {
          if (bet.status === "won") {
            score += bet.expectedWin;
          } else if (bet.status === "pending") {
            return;
          } else {
            score -= 200;
          }
        });
        return { ...user, score: score };
      });

      users = userWithScores;
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  }
});
