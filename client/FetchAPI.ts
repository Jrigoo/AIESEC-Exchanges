import { IManager } from "../utils/Network";

export class FetchAPI {
  static async getAllManagers() {
    try {
      const data = await fetch("/api", {
        method: "GET",
      });
      const result = await data.json();
      return result;
    } catch (err: any) {
      return Promise.reject(err);
    }
  }
  static async getManagersByLC(lc: string) {
    try {
      const data = await fetch(`/api/${lc}`, {
        method: "GET",
      });
      const result = await data.json();
      return result;
    } catch (err: any) {
      return Promise.reject(err);
    }
  }
  static async addManager(manager: IManager) {
    try {
      await fetch("/api", {
        method: "POST",
        body: JSON.stringify(manager),
      });
      return "Manager Created!";
    } catch (err: any) {
      return Promise.reject(err);
    }
  }
  static async deleteManagersByLC(lc: string) {
    try {
      await fetch(`/api/${lc}`, {
        method: "DELETE",
      });

      return "Managers Deleted!";
    } catch (err: any) {
      return Promise.reject(err);
    }
  }
}
