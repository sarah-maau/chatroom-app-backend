import { Document, Schema, PaginateModel, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

export interface RoomDocument extends Document {
  id: string
  name: string
  profileIds: string[]
  createdDate: Date
  updatedDate: Date
}

export const RoomSchema = new Schema<RoomDocument, DBRoomModelType<RoomDocument>>({
  name: { type: String, required: true },
  profileIds: { type: [String] },
  createdDate: { type: Date, default: new Date() },
  updatedDate: { type: Date, default: new Date() }
}).plugin(mongoosePaginate)

type DBRoomModelType<T extends Document> = PaginateModel<T>

export const DBRoomModel = model<RoomDocument>('room', RoomSchema) as DBRoomModelType<RoomDocument>
