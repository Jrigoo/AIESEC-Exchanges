import { ISegmentacion } from "../utils/interfaces";

export class FetchAPI {
  static async getAllManagers() {
    const res = await fetch("/api/managers", {
      method: "GET",
    });
    const result = await res.json();
    return result;
  }
  static async addManagers(name: string, lc: ISegmentacion) {
    const res = await fetch("/api/managers", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        lc: lc,
      }),
    });

    return res;
  }
  static async getManagersByLC(lc: ISegmentacion) {
    const res = await fetch(`/api/managers/${lc}`, {
      method: "GET",
    });
    const result = await res.json();
    return result;
  }
  static async deleteManagersByLC(lc: ISegmentacion) {
    const res = await fetch(`/api/managers/${lc}`, {
      method: "DELETE",
    });
    return res;
  }
  static async deleteManagers() {
    const res = await fetch("/api/managers", {
      method: "DELETE",
    });
    return res;
  }
}
