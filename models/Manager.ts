import { Schema, model, models } from "mongoose";

const managerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  lc: {
    type: String,
    required: true,
  },
});

export const Managers = models.Managers || model("Managers", managerSchema);
