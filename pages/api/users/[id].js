// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { connectToDatabase } from "../../../util/mongodb";

export default withApiAuthRequired(async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { db } = await connectToDatabase();
      const user = await db
        .collection("users")
        .findOneAndUpdate(
          { _id: req.query.id },
          { $set: req.body },
          { returnOriginal: false }
        );
      res.json({ opStatus: true, updatedUser: user.value });
    } catch (error) {
      console.log(error);
    }
  }
});
