import { SEGMENTACION } from "./data";
import { IFormData, ISegmentacion, IUniversidad } from "./interfaces";

import { FetchAPI } from "../client/FetchAPI";

export interface IManager {
  name: string;
  phone?: string;
  genre?: string;
  lc?: ISegmentacion;
  email?: string;
}

const network = {
  UTP: [
    {
      name: "Ana Domingo",
      phone: "63788834",
      genre: "female",
      email: "ana.domingo@aiesec.net",
    }
  ],
  UP: [
    {
      name: "Ana Domingo",
      phone: "63788834",
      genre: "female",
      email: "ana.domingo@aiesec.net",
    }
  ],
  Santiago: [
    {
      name: "Ana Domingo",
      phone: "63788834",
      genre: "female",
      email: "ana.domingo@aiesec.net",
    }
  ],
};

const getSegmentation = (universidad: IUniversidad) => {
  for (const key of Object.keys(SEGMENTACION)) {
    if (SEGMENTACION[key as ISegmentacion].includes(universidad)) {
      return key as ISegmentacion;
    }
  }
  return;
};

export const getRandomManager = async (user: IFormData) => {
  const lc = getSegmentation(user["Universidad"]); //Obtenemos el LC
  if (lc) {
    try {
      //Obtenemos managers que ya le tocaron SUs
      const currentManagers = await FetchAPI.getAllManagers();

      //Filtramos aquellos managers que ya le tocaron SUs
      let managers = network[lc].filter(
        (member) =>
          !currentManagers.map((cm: IManager) => cm.name).includes(member.name)
      );

      //Si aún quedan managers que no han contactado
      if (managers.length > 0) {
        const random = managers[Math.floor(Math.random() * managers.length)];
        await FetchAPI.addManager({ name: random.name, lc: lc });
        return random;
      } else {
        //Si ya todos los de un LC contactaron
        await FetchAPI.deleteManagersByLC(lc);
        const random = network[lc][Math.floor(Math.random() * managers.length)]; //Seleccionamos uno nuevo aleatorio
        await FetchAPI.addManager({ name: random.name, lc: lc });
        return random;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
};

export const getWhatsappMessage = (user: IFormData, manager: IManager) => {
  const programa =
    user["Program"] === "Pasantia"
      ? "tomar una pasantía"
      : user["Program"] === "Voluntariado"
      ? "tomar un voluntariado"
      : "ser profesor";
  return `https://wa.me/${manager["phone"]}?text=¡Hola ${
    manager["name"].split(" ")[0]
  }! me acabo de registrar para ${programa} con AIESEC y me gustaría saber más información`;
};
