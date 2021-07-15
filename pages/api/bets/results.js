import Cors from "cors";
import { ObjectID } from "mongodb";
import { results } from "../../../mockData/results";
import initMiddleware from "../../../util/init-middleware";
import { connectToDatabase } from "../../../util/mongodb";

const id = "60effab741222d111df5caf0";

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
    console.log("got req");
    try {
      const { db } = await connectToDatabase();
      const results = await db
        .collection("results")
        .findOne({ _id: ObjectID(id) });
      console.log(results);
      res.json(results.results);
    } catch (error) {
      console.log(error);
    }
  }
  if (req.method === "PUT") {
    try {
      const { db } = await connectToDatabase();
      const savedResults = await db
        .collection("results")
        .findOneAndUpdate(
          { _id: ObjectID(id) },
          { $set: results },
          { returnOriginal: false }
        );
      console.log(savedResults);
      res.json(savedResults.value);
    } catch (error) {
      console.log(error);
    }
  }
  if (req.method === "POST") {
    try {
      const { db } = await connectToDatabase();
      const savedResults = await db.collection("results").insertOne(results);
      res.json(savedResults.ops);
    } catch (error) {
      console.log(error);
    }
  }
  //   // Rest of the API logic
}
