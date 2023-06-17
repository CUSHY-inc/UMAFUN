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
      console.log({ where });
      const results = await prisma.mgt_race_result.findMany({
        where: where,
        orderBy: [
          {
            year: "desc", // ① yearの降順
          },
          {
            arrive: "asc", // ② arriveの昇順
          },
        ],
      });
      return res.json(results);
    }
  }
}
