import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  switch (req.method) {
    case "GET": {
      const raceIds = await prisma.mgt_race_id.findMany();
      return res.json(raceIds);
    }
    case "POST": {
      const where = req.body;
      const raceIds = await prisma.mgt_race_id.findMany({
        where: where,
      });
      return res.json(raceIds);
    }
  }
}
