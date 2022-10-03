import { SEGMENTACION } from "./data";
import { IFormData, ISegmentacion } from "./interfaces";

export interface IManager {
  name: string;
  phone: string;
  genre: string;
}

const Network = {
  UTP: [
    { name: "Ana", phone: "63788834", genre: "female" },
    { name: "Zurisadai", phone: "68577411", genre: "female" },
    { name: "Erick", phone: "68714072", genre: "male" },
    { name: "Rogelio", phone: "67464481", genre: "male" },
  ],
  UP: [
    { name: "Madelyne", phone: "63511402", genre: "female" },
    { name: "Fabio", phone: "68930988", genre: "male" },
    { name: "Luigi", phone: "60754488", genre: "male" },
  ],
  Santiago: [
    { name: "Damaris", phone: "65033438", genre: "female" },
    { name: "Zuleimy", phone: "69061086", genre: "female" },
  ],
};

export const getRandomManager = (user: IFormData): IManager => {
  //Verificamos la segmentación del SU y enviamos un manager aleatorio
  const universidad = user["Universidad"];
  for (const key of Object.keys(SEGMENTACION)) {
    if (SEGMENTACION[key as ISegmentacion].includes(universidad)) {
      const miembros = Network[key as ISegmentacion];
      return miembros[Math.floor(Math.random() * miembros.length)];
    }
  }
  return { name: "", phone: "", genre: "" };
};
