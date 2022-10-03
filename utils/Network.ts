import { SEGMENTACION } from "./data";
import { FetchAPI } from "../api/FetchAPI";

import { IFormData, ISegmentacion, IUniversidad } from "./interfaces";

export interface IManager {
  name: string;
  phone?: string;
  genre?: string;
  lc?: ISegmentacion;
}

const network = {
  UTP: [
    { name: "Ana Domingo", phone: "63788834", genre: "female" },
    { name: "Zurisadai Zuñiga", phone: "68577411", genre: "female" },
    { name: "Erick", phone: "68714072", genre: "male" },
    { name: "Rogelio Paredes", phone: "67464481", genre: "male" },
  ],
  UP: [
    { name: "Madelyne Miranda", phone: "63511402", genre: "female" },
    { name: "Fabio Urriola", phone: "68930988", genre: "male" },
    { name: "Luigi", phone: "60754488", genre: "male" },
  ],
  Santiago: [
    { name: "Damaris Cerrud", phone: "65033438", genre: "female" },
    { name: "Zuleimy", phone: "69061086", genre: "female" },
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
    //Obtenemos managers que ya le tocaron SUs
    const currentManagers = await FetchAPI.getManagersByLC(lc);

    //Filtramos aquellos managers que ya le tocaron SUs
    let managers = network[lc].filter(
      (member) =>
        !currentManagers.map((cm: IManager) => cm.name).includes(member.name)
    );

    //Si aún quedan managers que no han contactado
    if (managers.length > 0) {
      const random = managers[Math.floor(Math.random() * managers.length)];
      await FetchAPI.addManagers(random.name, lc); //Lo añado
      return random;
    } else {
      //Si ya todos los de un LC contactaron
      await FetchAPI.deleteManagersByLC(lc); //Borramos todos
      const random = network[lc][Math.floor(Math.random() * managers.length)]; //Seleccionamos uno nuevo aleatorio
      await FetchAPI.addManagers(random.name, lc); //Lo añadimos
      return random;
    }
  }
};
