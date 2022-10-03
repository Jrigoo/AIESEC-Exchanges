import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";

export default function handleSqlite(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = new sqlite3.Database(
    "./managers.db",
    sqlite3.OPEN_READWRITE,
    (err) =>
      err ? console.error(err.message) : console.log("Connection done!")
  );

  //Traer managers por LC
  if (req.method === "GET") {
    const { lc } = req.query;
    db.all(`SELECT name, lc FROM Managers WHERE lc='${lc}'`, (err, rows) => {
      res.status(200).json(rows);
    });
  }
  //Borrar todos los managers de un LC
  if (req.method === "DELETE") {
    const { lc } = req.query;
    db.run(`DELETE FROM Managers WHERE lc='${lc}'`);
    res.status(200).json("Items Deleted!");
  }
  db.close();
}
