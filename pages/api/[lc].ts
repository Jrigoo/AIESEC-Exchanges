import mongoose from "mongoose";
import { connectMongo } from "../../db/connect.db";
import { NextApiRequest, NextApiResponse } from "next";
import { ManagerDAO } from "../../db/Manager.dao";

export default async function handleManager(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (mongoose.connection.readyState === 0) {
      await connectMongo();
    }

    //Traer todos lo managers
    if (req.method === "GET") {
      const { lc } = req.query;
      const response = await ManagerDAO.getManagersByLC(lc as string);
      res.status(200).json(response);
    }

    //Añadir managers
    if (req.method === "DELETE") {
      const { lc } = req.query;
      const response = await ManagerDAO.deleteManagersByLC(lc as string);
      res.status(200).json(response);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
