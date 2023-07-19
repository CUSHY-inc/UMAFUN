import { NextApiRequest, NextApiResponse } from "next";
import { getPrismaClient } from "@/boilerplate/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = getPrismaClient();
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
