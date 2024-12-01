import { ai } from "./partials/ai";

export type SERVER_RESPONSE = {
  status: number;
  message: string;
  data: any;
};

export const SERVER_ACTIONS = {
  ai,
};
