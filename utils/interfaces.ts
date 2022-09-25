export interface oAuthResponse {
  access_token: string;
  token_type: "bearer";
  expires_in: string;
  refresh_token: string;
  ref: {
    type: "app";
    id: string;
  };
}

export interface PodioFileResponse {
  mimetype: "application/pdf";
  perma_link: null;
  hosted_by: "podio";
  replaces: [];
  description: null;
  hosted_by_humanized_name: "Podio";
  presence: null;
  created_via: {
    url: null;
    auth_client_id: 46444;
    display: true;
    name: "Integracion podio";
    id: 46444;
  };
  created_by: {
    user_id: -1;
    name: "OGX";
    url: "https://podio.com/aiesec-in-panama/leaders-lab/apps/ogx";
    type: "app";
    image: null;
    avatar_type: "icon";
    avatar: -1;
    id: 26985385;
    avatar_id: 123;
    last_seen_on: null;
  };
  thumbnail_link: null;
  created_on: string;
  link: string;
  file_id: number;
  rights: ["delete", "view", "download", "update"];
  push: null;
  external_file_id: null;
  link_target: "_blank";
  size: number;
  name: string;
}

export interface IFile extends Blob {
  name: string;
  size: number;
  type: string;
}

export interface PodioItemResponse {
  item_id: number;
}

/* Form */
export interface IAtributos {
  titulo?: string;
  tipo: "button" | "email" | "file" | "password" | "text" | "number" | "submit";
  placeholder: string;
  className?: string;
  info?: string;
  name:
    | "First Name"
    | "Last Name"
    | "Podio Id"
    | "Email"
    | "Password"
    | "Phone"
    | "Universidad"
    | "Background"
    | "Referral"
    | "Edad"
    | "Ingles"
    | "Estudios"
    | "CV";
}

export interface IFormData {
  "First Name": string;
  "Last Name": string;
  "Podio Id": number;
  Email: string;
  Password: string;
  Phone: string;
  Universidad: IUniversidad;
  Background: string;
  Referral: IReferrals;
  Edad: number;
  Ingles: INivelIngles;
  Estudios: IEstudios;
  Program: "Pasantia" | "Voluntariado" | "Profesor";
  CV: IFile;
}

/* TYPES */
export type IReferrals =
  | "Amig@"
  | "Información en el campus"
  | "Presentación en aula de clases"
  | "Facebook"
  | "Twitter"
  | "Instagram"
  | "LinkedIn"
  | "Otra red social"
  | "Motor de busqueda"
  | "Evento"
  | "Emails"
  | "Telegram"
  | "Medios (Revista, TV, Periódico o radio)"
  | "Otro";

export type INivelIngles =
  | "A1 - Principiante"
  | "A2 - Elemental"
  | "B1 - Intermedio"
  | "B2 - Intermedio Alto"
  | "C1 - Avanzado"
  | "C2 - Nativo";

export type IUniversidad =
  | "Escuela de Arquitectura y Diseño de America Latina y el Caribe"
  | "ISAE - Metetí| Darién"
  | "UDI Universidad del Istmo - Chorrera"
  | "ISAE - La Chorrera| Pmá Oeste"
  | "Universidad de Panamá - San Miguelito"
  | "USMA - Colón"
  | "Universidad Santander"
  | "Universidad Tecnológica de Panamá - Colón"
  | "Universidad Americana - El Carmen"
  | "Universidad Abierta y a Distancia - Sede Ciudad de Panamá"
  | "UDELAS - Colón"
  | "Universidad Americana - Campus Ciudad de Panamá"
  | "Universidad Latina - Fac. Ciencias de la Salud"
  | "International University (INTERUNI)"
  | "Universidad Interamericana de Panamá (UIP)"
  | "Universidad del Arte Ganexa"
  | "UMECIT"
  | "Universidad Latina de Panamá - Ciudad Capital"
  | "ISAE - Campus Central - Ciudad de Panamá"
  | "Universidad Tecnológica de Panamá - Panamá Oeste"
  | "UDI Universidad del Istmo - Colón"
  | "INCAE - Business School"
  | "Universidad Hispoamericana de Panamá"
  | "Universidad de Alta Dirección"
  | "ADEN International Business School - Ciudad de Panamá"
  | "Universidad Panamericana (UPAM)"
  | "Universidad Marítima Internacional de Panamá"
  | "Universidad Cristiana de Panamá"
  | "Universidad Internacional de Ciencia y Tecnología UNICYT"
  | "ULACEX"
  | "No estudiando actualmente - USMA"
  | "USMA - Campus Ciudad de Panamá"
  | "No estudiando actualmente - UTP"
  | "Universidad Tecnológica de Panamá - Sede Ciudad de Panamá"
  | "Otro"
  | "QLU Panama - University of Louisville"
  | "Universidad de Panamá - Panamá Oeste"
  | "Universidad de Panamá - Colón"
  | "Universidad de San Francisco de Panamá"
  | "Universidad de Panamá - Panamá Este"
  | "UDI Universidad del Istmo - Campus Ciudad de Panamá"
  | "ISTHMUS"
  | "No estudiando actualmente - UDI"
  | "Universidad de Panamá - Sede Ciudad de Panamá"
  | "UDI Universidad del Istmo - Panamá"
  | "EAFIT"
  | "Universidad Americana - Pmá. Oeste"
  | "Universidad de Panamá - Darién"
  | "UDELAS - Campus Ciudad de Panamá"
  | "Florida State University"
  | "UDI Universidad del Istmo - Los Pueblos"
  | "Universidad Americana - Los Pueblos"
  | "Columbus University"
  | "No estudiando actualmente - Universidad de Panamá"
  | "UDI Universidad del Istmo - Sede Veraguas"
  | "Universidad de Panamá - Azuero"
  | "Universidad Tecnológica de Panamá - Sede Veraguas"
  | "Universidad Abierta y a Distancia - Sede Santiago"
  | "USMA - Sede Veraguas"
  | "UDELAS - Sede Veraguas"
  | "Universidad Latina de Panamá - Sede Veraguas"
  | "Universidad de Panamá | Centro Regional de Azuero"
  | "UDELAS - Azuero"
  | "Universidad Tecnológica de Panamá - Azuero"
  | "No estudiando actualmente - Veraguas"
  | "Universidad Tecnológica Oteima - Santiago"
  | "UDELAS - Veraguas"
  | "ISAE - Santiago| Veraguas"
  | "Universidad de Panamá - Veraguas"
  | "Universidad de Panamá - Los Santos"
  | "Universidad Latina - Chitré"
  | "Universidad Abierta y a Distancia - Sede Penonomé"
  | "No estudiando actualmente - Coclé"
  | "Universidad Latina de Panamá - Sede Chitré"
  | "UDI Universidad del Istmo - Chitré"
  | "ISAE - Chitré| Herrera"
  | "USMA - Chitré"
  | "UDI Universidad del Istmo - Las Tablas"
  | "UDELAS - Coclé"
  | "Universidad de Panamá - Coclé"
  | "Universidad Tecnológica de Panamá - Coclé"
  | "ISAE - Penonomé| Coclé"
  | "Universidad Latina - Penonomé"
  | "Universidad Tecnológica de Panamá - Chiriquí"
  | "No estudiando actualmente - Chiriqui"
  | "Universidad de Panamá - Bocas del Toro"
  | "Universidad Tecnológica de Panamá - Bocas del Toro"
  | "UDELAS - Chiriquí"
  | "UDI Universidad del Istmo - Changuinola"
  | "USMA - Chiriquí"
  | "Universidad Autonoma de Chiriquí (UNACHI)"
  | "Universidad de Cartago"
  | "UDI Universidad del Istmo - Chiriquí"
  | "ISAE - Changuinola| Bocas del Toro"
  | "ISAE - David| Chiriquí"
  | "Universidad Latina - Chiriquí"
  | "Universidad Tecnológica Oteima - Chiriquí";

export type ISegmentacion = "Santiago" | "UP" | "UTP" | "VE";

export type IEstudios =
  | "Bachiller"
  | "Técnico"
  | "Pregrado (cursando)"
  | "Pregrado (graduado)"
  | "Postgrado"
  | "Doctorado/Maestria";

export type IBackgrounds =
  | "Contabilidad"
  | "Ingeniería Aeroespacial"
  | "Agricultura"
  | "Antropología"
  | "Arqueología"
  | "Arquitectura"
  | "Arte"
  | "Seguros"
  | "Auditorías"
  | "Ingeniería automotriz"
  | "Banca"
  | "Bioingeniería"
  | "Biología"
  | "Ciencia Biomédica"
  | "Administración de Empresas"
  | "Ingeniería Química"
  | "Química"
  | "Ingeniería civil"
  | "Comunicación y periodismo"
  | "Ingeniería Informática"
  | "Ciencias de la Computación"
  | "Diseño"
  | "Ciencias de la Tierra"
  | "Ecología"
  | "Ciencias económicas"
  | "Educación"
  | "Ingeniería eléctrica"
  | "Ingeniería electrónica"
  | "Emprendimiento"
  | "Ingeniería Ambiental"
  | "Finanzas"
  | "Geografía"
  | "Diseño gráfico"
  | "Ciencia de la salud"
  | "Historia"
  | "Recursos humanos"
  | "Diseño industrial"
  | "Ingeniería Industrial"
  | "Relaciones Internacionales"
  | "Comercio internacional"
  | "Idiomas"
  | "Ley"
  | "Lingüística"
  | "Literatura"
  | "Logística"
  | "Marketing"
  | "Ingeniería de materiales"
  | "Matemáticas"
  | "Ingeniería Mecánica"
  | "Artes de los medios"
  | "Medicina"
  | "Ciencias militares"
  | "Música"
  | "Nanotecnología"
  | "Enfermería"
  | "Nutrición"
  | "Ingeniería del Petróleo"
  | "Filosofía"
  | "Física"
  | "Ciencias Políticas"
  | "Psicología"
  | "Administración Pública"
  | "Relaciones públicas"
  | "Religión"
  | "Trabajo Social"
  | "Sociología"
  | "Ingeniería o Desarrollo de software"
  | "Deportes"
  | "Estadísticas"
  | "Ingeniería en Sistemas y Computación"
  | "Ingeniería en Telecomunicaciones"
  | "Teatro"
  | "Turismo y gestión hotelera"
  | "Veterinaria"
  | "Otro";
