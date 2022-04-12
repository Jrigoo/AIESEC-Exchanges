import { Podio } from "./Podio";
import {
  oAuthResponse,
  PodioFileResponse,
  IFormItem,
  IFormData,
  IFile,
  PodioItemResponse,
  ISegmentacion,
} from "./interfaces";
import { SEGMENTACION, LCIDs } from "./data";

/* 
    Class para registrar al usuario tanto en Podio 
    como en expa
*/

export class Register {
  private user: IFormData | IFormItem;
  private expaId: number;
  private podioId: number;

  constructor(user: IFormData | IFormItem) {
    this.user = user;
    this.expaId = 0;
    this.podioId = 0;

    /*  Metodo para verificar la universidad correspondiente */
    const universidad = user["Universidad"];
    for (const key of Object.keys(SEGMENTACION)) {
      if (SEGMENTACION[key as ISegmentacion].includes(universidad as string)) {
        this.expaId = LCIDs[key as ISegmentacion][0];
        this.podioId = LCIDs[key as ISegmentacion][1];
        break;
      }
    }
    this.user["Podio Id"] = this.podioId;
  }

  async expaRegister() {
    const url = "https://auth.aiesec.org/users.json";
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      user: {
        first_name: this.user["First Name"],
        last_name: this.user["Last Name"],
        email: this.user["Email"],
        country_code: "+507",
        phone: this.user["Phone"],
        password: this.user["Password"],
        lc: this.expaId,
        allow_phone_communication: "true",
        allow_email_communication: "true",
        selected_programmes: [7, 8, 9],
      },
    });

    const request = {
      method: "POST",
      headers: headers,
      body: raw,
    };

    try {
      const response = await fetch(url, request);
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
  }
  async podioRegister() {
    const podio = new Podio();
    await podio.registerSU(this.user);
  }
}
