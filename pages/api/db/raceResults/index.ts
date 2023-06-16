import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  switch (req.method) {
    case "POST": {
      const where = req.body;
      const raceResult = await prisma.mgt_race_result.findMany({
        where: where,
      });
      return res.json(raceResult);
    }
  }
}
