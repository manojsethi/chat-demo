import { IBaseResponse } from "./baseRespo.interface";

export interface IChatResponse extends IBaseResponse {
  data: IChatData[];
}

export interface IChatData {
  _id: string;
  sent_to: string;
  sent_from: string;
  message: string;
  isReaded: boolean;
  chatType?: "Group" | "Personal";
  date: string;
  __v: number;
}
