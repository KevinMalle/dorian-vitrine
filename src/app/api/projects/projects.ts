import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const projets = await prisma.projet.findMany();
      console.log("✅ Données récupérées :", projets);
      res.status(200).json(projets);
    } catch (error) {
      console.error("❌ Erreur récupération projets :", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
