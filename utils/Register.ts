import { Podio } from "./Podio";
import { IFormItem, ISegmentacion, IProgramas } from "./interfaces";
import { SEGMENTACION, LCIDs, EXPA_PROGRAMAS, EXPA_REFERENTES } from "./data";

/* 
    Class para registrar al usuario tanto en Podio 
    como en expa
*/

export class Register {
  private user: IFormItem;
  private segExpaId: number;
  private segPodioId: number;
  private progExpaID: Array<number>;

  constructor(user: IFormItem) {
    this.user = user;
    this.segExpaId = 0;
    this.segPodioId = 0;
    this.progExpaID = [];

    /*  Metodo para verificar la universidad correspondiente */
    const universidad = user["Universidad"];
    for (const key of Object.keys(SEGMENTACION)) {
      if (SEGMENTACION[key as ISegmentacion].includes(universidad as string)) {
        this.segExpaId = LCIDs[key as ISegmentacion][0];
        this.segPodioId = LCIDs[key as ISegmentacion][1];
        break;
      }
    }

    const programas = user["Programs"];
    for (const prog of programas) {
      this.progExpaID.push(EXPA_PROGRAMAS[prog as IProgramas]);
    }

    this.user["Podio Id"] = this.segPodioId;
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
        lc: this.segExpaId,
        allow_phone_communication: "true",
        allow_email_communication: "true",
        selected_programmes: this.progExpaID,
        referral_type: EXPA_REFERENTES[this.user["Referral"]],
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
