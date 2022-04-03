import { Document, Schema, PaginateModel, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

export interface ProfileDocument extends Document {
  id: string
  username: string
  createdDate: Date
  updatedDate: Date
}

export const ProfileSchema = new Schema<ProfileDocument, DBProfileModelType<ProfileDocument>>({
  username: { type: String, required: true },
  createdDate: { type: Date, default: new Date() },
  updatedDate: { type: Date, default: new Date() }
}).plugin(mongoosePaginate)

type DBProfileModelType<T extends Document> = PaginateModel<T>

export const DBProfileModel = model<ProfileDocument>('profile', ProfileSchema) as DBProfileModelType<ProfileDocument>
