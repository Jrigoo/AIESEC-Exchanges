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
    },
    {
      name: "Zurisadai Zuñiga",
      phone: "68577411",
      genre: "female",
      email: "zurisadai.zuniga4@aiesec.net ",
    },
    {
      name: "Erick Espinosa",
      phone: "68714072",
      genre: "male",
      email: "erick.espinosa2@aiesec.net",
    },
    {
      name: "Rogelio Paredes",
      phone: "67464481",
      genre: "male",
      email: "rogelio.paredes@aiesec.net",
    },
  ],
  UP: [
    {
      name: "Madelyne Miranda",
      phone: "63511402",
      genre: "female",
      email: "madelyne.miranda@aiesec.net",
    },
    {
      name: "Fabio Urriola",
      phone: "68930988",
      genre: "male",
      email: "fabiourriola@aiesec.net ",
    },
    {
      name: "Luigi Yau",
      phone: "60754488",
      genre: "male",
      email: "luigi.yau2@aiesec.net",
    },
    {
      name: "Maurielka White",
      phone: "68187189",
      genre: "female",
      email: "mcwc15@aiesec.net",
    },
    {
      name: "Grace Mitre",
      phone: "62790854",
      genre: "female",
      email: "grace.mitre@aiesec.net",
    },
  ],
  Santiago: [
    {
      name: "Damaris Cerrud",
      phone: "65033438",
      genre: "female",
      email: "damaris.cerrud3@aiesec.net",
    },
    {
      name: "Zuleimy Powell",
      phone: "69061086",
      genre: "female",
      email: "zuleimy.powell@aiesec.net",
    },
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
