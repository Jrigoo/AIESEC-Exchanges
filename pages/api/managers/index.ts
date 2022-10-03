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

  //Traer todo de la base de datos
  if (req.method === "GET") {
    db.all("SELECT name, lc FROM Managers", (err, rows) => {
      res.status(200).json(rows);
    });
  }

  //Añadir manager en la base de datos
  if (req.method === "POST") {
    const { name, lc } = JSON.parse(req.body);
    db.run(`INSERT INTO Managers (name,lc) VALUES ('${name}','${lc}')`);
    res.status(200).json("Done!");
  }

  //Eliminar todos los managers
  if (req.method === "DELETE") {
    db.run("DELETE FROM Managers");
    res.status(200).json("All Items Deleted!");
  }

  db.close();
}
