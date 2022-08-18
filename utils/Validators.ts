import { IFormItem } from "./interfaces";
import {
  UNIVERSIDADES,
  ESTUDIOS,
  NIVEL_INGLES,
  BACKGROUNDS,
  PODIO_REFERENTES,
} from "./data";

export class Validators {
  static password(password: string) {
    /* Metodo para validar el password */
    const regex = /\d/;
    const errors = [];
    if (!password) return ["La contraseña no puede estar vacía"];
    if (password.length < 8) {
      errors.push("- La contraseña es de minimo 8 caracteres");
    }
    if (password == password.toLocaleLowerCase()) {
      errors.push("- La contraseña debe tener almenos una mayuscula");
    }
    if (password == password.toLocaleUpperCase()) {
      errors.push("- La contraseña debe tener almenos una minúscula");
    }
    if (!regex.test(password)) {
      errors.push("- La contraseña debe tener almenos un número");
    }
    return errors;
  }
  static email(email: string) {
    /* Método para validar el email */
    if (!email) return ["El email no puede estar vacío"];
    if (!email.match("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Z|a-z]{2,}")) {
      return ["Email no valido"];
    }
    return [];
  }
  static phone(phone: string) {
    const regex = /^[+]*[0-9][-\s/0-9]*$/g;
    if (!phone) return ["El número no puede estar vacío"];
    if (phone.length < 8) {
      return ["Numero de telefono no valido"];
    }
    if (!regex.test(phone)) {
      return ["Numero de telefono no valido"];
    }
    return [];
  }
  static dropdowns(formData: IFormItem) {
    /* Metodo para validar el password */
    const errors = [];
    if (!UNIVERSIDADES.includes(formData["Universidad"] as string)) {
      errors.push("- Universidad no valida");
    }
    if (!Object.keys(ESTUDIOS).includes(formData["Estudios"] as string)) {
      errors.push("- Estudios no validos");
    }
    if (!Object.keys(NIVEL_INGLES).includes(formData["Ingles"] as string)) {
      errors.push("- Nivel de ingles no valido");
    }
    if (
      !Object.keys(PODIO_REFERENTES).includes(formData["Referral"] as string)
    ) {
      errors.push("- Medio por el cual te enteraste no valido");
    }
    if (!BACKGROUNDS.includes(formData["Background"] as string)) {
      errors.push("- Background/Carrera no valido");
    }
    return errors;
  }
  static empty(formData: IFormItem) {
    /* Metodo para validar campos vacios e los otros anteriormente mencionados */
    for (const value of Object.values(formData)) {
      if (!value) return "Por favor llenar los campos solicitados";
      break;
    }

    /* Por si no suben el CV 
      - Esto e ssolo en los casos que elijan profesor o Pasantia
    */
    if (
      formData["Programs"].includes("Pasantia") ||
      formData["Programs"].includes("Profesor")
    ) {
      if (typeof formData["CV"] !== "string" && formData["CV"].size === 0) {
        return "- Por favor subir la hoja de vida o CV";
      }
    }

    /* Por si no seleccionan el programa de interes */
    if (formData["Programs"].length === 0) {
      return "- Por favor seleccionar el programa de interes";
    }

    /* Por si ponen otra cosa en el dropdown */
    const dropdownError = this.dropdowns(formData);
    if (dropdownError.length > 0) {
      return dropdownError;
    }

    /* Otros errores ya mencionados */
    if (
      this.password(formData["Password"] as string).length > 0 ||
      this.email(formData["Email"] as string) ||
      this.phone(formData["Phone"] as string)
    ) {
      return "- Por favor corregir los errores mencionados";
    }
  }
}
