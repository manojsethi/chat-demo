import mongoose from "mongoose";

export interface IGroupModelDocument {
  name: string;
  createdBy: mongoose.Types.ObjectId;
  userDetails: [{ joined_at: any; id: mongoose.Types.ObjectId }];
  createdAt: any;
  about: string;
}
export interface IAddGroupParticipant {
  participant: string;
  group_id: mongoose.Types.ObjectId;
}
export interface IGetGroupDetails {
  group_id: string;
}
