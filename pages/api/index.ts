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
      //Si la base de datos esta off por x motivo
      await connectMongo();
    }

    //Traer todos lo managers
    if (req.method === "GET") {
      const response = await ManagerDAO.getAllManagers();
      res.status(200).json(response);
    }

    //Añadir managers
    if (req.method === "POST") {
      const { name, lc } = JSON.parse(req.body);
      if (name && lc) {
        const response = await ManagerDAO.addManager({ name, lc });
        res.status(200).json(response);
      } else {
        res.status(400).json({ error: "Name and LC required" });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
