import { IFormData } from "./interfaces";
import {
  UNIVERSIDADES,
  ESTUDIOS,
  NIVEL_INGLES,
  BACKGROUNDS,
  PODIO_REFERENTES,
  EXPA_PROGRAMAS,
} from "./data";

export class Validators {
  static validatePassword(password: string): Array<string> {
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
  static validateEmail(email: string): Array<string> {
    /* Método para validar el email */
    if (!email) return ["El email no puede estar vacío"];
    if (!email.match("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Z|a-z]{2,}")) {
      return ["Email no valido"];
    }
    return [];
  }
  static validatePhone(phone: string): Array<string> {
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
  static validateDropdown(formData: IFormData): Array<string> {
    /* Metodo para validar el password */
    const errors = [];
    if (!UNIVERSIDADES.includes(formData["Universidad"])) {
      errors.push("- Universidad no valida");
    }
    if (!Object.keys(ESTUDIOS).includes(formData["Estudios"])) {
      errors.push("- Estudios no validos");
    }
    if (!Object.keys(NIVEL_INGLES).includes(formData["Ingles"])) {
      errors.push("- Nivel de ingles no valido");
    }
    if (!Object.keys(PODIO_REFERENTES).includes(formData["Referral"])) {
      errors.push("- Medio por el cual te enteraste no valido");
    }
    if (!BACKGROUNDS.includes(formData["Background"])) {
      errors.push("- Background/Carrera no valido");
    }
    if (!Object.keys(EXPA_PROGRAMAS).includes(formData["Program"])) {
      errors.push(
        "- Programa no valido. Por favor seleccionar el programa de interes"
      );
    }
    return errors;
  }
  static empty(formData: IFormData): Array<string> {
    //Metodo para validar campos vacios e los otros anteriormente mencionados
    for (const value of Object.values(formData)) {
      if (!value) return ["Por favor llenar los campos solicitados"];
      break;
    }

    //Por si no suben el CV aplica para GV y GTa
    if (
      formData["Program"] === "Pasantia" ||
      formData["Program"] === "Profesor"
    ) {
      if (typeof formData["CV"] !== "string" && formData["CV"].size === 0) {
        return ["- Por favor subir la hoja de vida o CV"];
      }
    }

    //Por si ponen otra cosa en el dropdown
    const dropdownError = this.validateDropdown(formData);
    if (dropdownError.length > 0) {
      return dropdownError;
    }

    //Revisar errores previamente mencionados
    if (
      this.validatePassword(formData["Password"] as string).length > 0 ||
      this.validateEmail(formData["Email"] as string).length > 0 ||
      this.validatePhone(formData["Phone"] as string).length > 0
    ) {
      return ["- Por favor corregir los errores mencionados"];
    }
    return [];
  }
}
