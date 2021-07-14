// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
// import { connectToDatabase } from "../../util/mongoDB";

export default withApiAuthRequired(async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log(req.query.id);
      console.log(req.body);
      const { db } = await connectToDatabase();
      const user = await db
        .collection("users")
        .findOneAndUpdate(
          { _id: req.query.id },
          { $set: req.body },
          { returnOriginal: false }
        );
      res.json({ opStatus: true, newUser: user.value });
    } catch (error) {
      console.log(error);
    }
  }
});
