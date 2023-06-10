import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  try {
    switch (req.method) {
      case "GET":
        const raceIds = await prisma.mgt_race_info.findMany();
        return res.json(raceIds);
    }
  } catch (error) {
    return res.status(500).json(error);
  } finally {
    await prisma.$disconnect();
  }
}
