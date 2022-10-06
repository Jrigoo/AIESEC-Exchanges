import { Managers } from "../models/Manager";
import { IManager } from "../utils/Network";

export class ManagerDAO {
  static async getAllManagers() {
    try {
      const data = await Managers.find({});
      return data;
    } catch (err: any) {
      return Promise.reject({ error: "Something went wrong" });
    }
  }
  static async getManagersByLC(lc: string) {
    try {
      const data = await Managers.find({ lc: lc });
      return data;
    } catch (err: any) {
      return Promise.reject({ error: "Something went wrong" });
    }
  }
  static async addManager(manager: IManager) {
    try {
      await Managers.create(manager);
      return "Manager added!";
    } catch (err: any) {
      return Promise.reject({ error: "Something went wrong" });
    }
  }
  static async deleteManagersByLC(lc: string) {
    try {
      const deleted = await Managers.deleteMany({ lc: lc });
      return deleted;
    } catch (err: any) {
      return Promise.reject({ error: "Something went wrong" });
    }
  }
}
