import { NextApiRequest, NextApiResponse } from "next";
import { getPrismaClient } from "@/boilerplate/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = getPrismaClient();
  switch (req.method) {
    case "POST": {
      const where = req.body;
      const results = await prisma.mgt_race_result.findMany({
        where: where,
        orderBy: [
          {
            race_id: "asc",
          },
          {
            year: "desc",
          },
          {
            arrive: "asc",
          },
        ],
      });
      return res.json(results);
    }
  }
}
