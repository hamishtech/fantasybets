import Cors from "cors";
import { ObjectID } from "mongodb";
import { ObjectId } from "mongodb";
import { bets } from "../../../mockData/activeBets";
import initMiddleware from "../../../util/init-middleware";
import { connectToDatabase } from "../../../util/mongodb";

const id = "60efefc4b1055403a424e706";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "PUT", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  // Run cors
  await cors(req, res);
  if (req.method === "GET") {
    try {
      const { db } = await connectToDatabase();
      const bets = await db
        .collection("activeBets")
        .findOne({ _id: ObjectID(id) });
      console.log(bets);
      res.json(bets);
    } catch (error) {
      console.log(error);
    }
  }
  if (req.method === "PUT") {
    try {
      const { db } = await connectToDatabase();
      const savedBets = await db
        .collection("activeBets")
        .findOneAndUpdate(
          { _id: ObjectID(id) },
          { $set: bets },
          { returnOriginal: false }
        );
      console.log(savedBets);
      res.json(savedBets.value);
    } catch (error) {
      console.log(error);
    }
  }
  //   // Rest of the API logic
}
