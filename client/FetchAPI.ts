import { IManager } from "../utils/Network";

export class FetchAPI {
  static async getAllManagers() {
    try {
      const response = await fetch("/api", {
        method: "GET",
      });
      if (response.ok) {
        const result = await response.json();
        return result;
      }
      return Promise.reject({ error: "Response 5xx or 4xx" });
    } catch (err) {
      return Promise.reject(err);
    }
  }
  static async getManagersByLC(lc: string) {
    try {
      const response = await fetch(`/api/${lc}`, {
        method: "GET",
      });
      if (response.ok) {
        const result = await response.json();
        return result;
      }
      return Promise.reject({ error: "Response 5xx or 4xx" });
    } catch (err) {
      return Promise.reject(err);
    }
  }
  static async addManager(manager: IManager) {
    try {
      const response = await fetch("/api", {
        method: "POST",
        body: JSON.stringify(manager),
      });
      if (response.ok) {
        return "Manager Created!";
      }
      return Promise.reject({ error: "Response 5xx or 4xx" });
    } catch (err) {
      return Promise.reject(err);
    }
  }
  static async deleteManagersByLC(lc: string) {
    try {
      const response = await fetch(`/api/${lc}`, {
        method: "DELETE",
      });
      if (response.ok) {
        return "Managers by LC Deleted!";
      }
      return Promise.reject({ error: "Response 5xx or 4xx" });
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
