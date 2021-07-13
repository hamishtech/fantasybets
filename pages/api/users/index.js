// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { connectToDatabase } from "../../util/mongoDB";

export default withApiAuthRequired(async function handler(req, res) {
  const session = getSession();
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
  }
});
