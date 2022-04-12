/* 
TODOS

- Falta pasar la información de la API a un .env para mayor seguridad
*/

import {
  oAuthResponse,
  PodioFileResponse,
  IFormItem,
  IFormData,
  IFile,
  PodioItemResponse,
  INivelIngles,
  IReferrals,
  IEstudios,
} from "./interfaces";
import { PODIO_REFERENTES, NIVEL_INGLES, ESTUDIOS } from "./data";

export class Podio {
  private API_URL = "https://api.podio.com";
  private token = "No token";

  async oAuth(): Promise<string> {
    /* 
     Se realiza la autenticación y obtenemos el token para empezar a trabajar con los metodos de la API
    */
    const data = new FormData();
    data.append("grant_type", "app");
    data.append("app_id", process.env.NEXT_PUBLIC_APP_ID as string);
    data.append("app_token", process.env.NEXT_PUBLIC_APP_TOKEN as string);
    data.append("client_id", process.env.NEXT_PUBLIC_CLIENT_ID as string);
    data.append(
      "client_secret",
      process.env.NEXT_PUBLIC_CLIENT_SECRET as string
    );

    const request = {
      method: "POST",
      body: data,
    };

    try {
      const response = await fetch(`${this.API_URL}/oauth/token`, request);
      const result: oAuthResponse = await response.json();
      const token = result["access_token"];
      return token;
    } catch (err) {
      console.error(err);
      return "Fail";
    }
  }
  async createItem(formData: IFormData | IFormItem): Promise<number> {
    /* 
    Metodo para crear un nuevo Item o usuario. Obtiene la data del form.
    Retorna una promesa con el id del item
    */
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);
    headers.append("Content-Type", "application/json");

    const nivelIngles = NIVEL_INGLES[formData["Ingles"] as INivelIngles];
    const Estudios = ESTUDIOS[formData["Estudios"] as IEstudios];
    const referralId = PODIO_REFERENTES[formData["Referral"] as IReferrals];

    const raw = JSON.stringify({
      fields: [
        {
          field_id: 233431600,
          label: "Nombre y Apellido",
          values: [`${formData["First Name"]} ${formData["Last Name"]}`],
        },
        {
          type: "category",
          field_id: 233431604,
          label: "Home Entity",
          values: [formData["Podio Id"]],
        },
        {
          type: "phone",
          field_id: 233431602,
          label: "Teléfono",
          values: [{ type: "mobile", value: formData["Phone"] }],
        },
        {
          type: "email",
          field_id: 233431603,
          label: "Email",
          values: [{ type: "other", value: formData["Email"] }],
        },
        {
          type: "text",
          field_id: 233431609,
          label: "Carrera",
          values: [formData["Background"]],
        },
        {
          type: "text",
          field_id: 233431610,
          label: "Universidad",
          values: [formData["Universidad"]],
        },
        {
          type: "category",
          field_id: 233431628,
          label: "Status",
          values: [9], //SU
        },
        {
          type: "category",
          field_id: 233431617,
          label: "Como me enteré del programa?",
          values: [referralId], //Numero de podio
        },
        {
          type: "category",
          field_id: 237376300,
          label: "Nivel de Ingles",
          values: [nivelIngles],
        },
        {
          type: "text",
          field_id: 235124236,
          label: "Edad",
          values: formData["Edad"],
        },
        {
          type: "category",
          field_id: 233431608,
          label: "Estudios",
          values: [Estudios],
        },
      ],
    });

    const request = {
      method: "POST",
      headers: headers,
      body: raw,
    };

    try {
      const response = await fetch(
        `${this.API_URL}/item/app/${process.env.NEXT_PUBLIC_APP_ID as string}`,
        request
      );
      const result: PodioItemResponse = await response.json();
      return result.item_id;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
  async submitFile(file: IFile): Promise<number> {
    /* 
    Metodo para subir un nuevo archivo (CV). Retorna una promesa con el 
    id del archivo
    */
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);

    const formdata = new FormData();
    formdata.append("source", file, "[PROXY]");
    formdata.append("filename", file.name);

    const request = {
      method: "POST",
      headers: headers,
      body: formdata,
    };

    try {
      const response = await fetch(`${this.API_URL}/file`, request);
      const result: PodioFileResponse = await response.json();
      return result.file_id;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
  async attachFile(
    fileId: number,
    itemId: number
  ): Promise<string | undefined> {
    /* 
    Metodo para ligar un archivo a un item previamente creado.
    Sus parametros son el ID del archvio y el item. Retorna
    "Done!" asi nos aseguramos de que funciono todo correctamente
    */
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);
    headers.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      ref_type: "item",
      ref_id: itemId,
    });

    const request = {
      method: "POST",
      headers: headers,
      body: raw,
    };

    try {
      await fetch(`${this.API_URL}/file/${fileId}/attach`, request);
      return "Done!";
    } catch (error) {
      console.log("Error");
    }
  }
  async registerSU(formData: IFormData | IFormItem): Promise<void> {
    /* 
    Combina los 3 metodos previamente mencionados. Tomando en cuenta que js es asíncrono y que para hacer el attach es necesario tener un items y un archivo
    */
    this.token = await this.oAuth();
    const itemId = await this.createItem(formData);
    const fileId = await this.submitFile(formData["CV"] as IFile);

    if (itemId === -1 || fileId === -1) return;
    const resolve = await this.attachFile(fileId, itemId);
    console.log(resolve);
  }
}
