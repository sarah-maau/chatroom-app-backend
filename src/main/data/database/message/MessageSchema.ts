import { Document, Schema, PaginateModel, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

export interface MessageDocument extends Document {
  id: string
  content: string
  createdDate: Date
}

export const MessageSchema = new Schema<MessageDocument, DBMessageModelType<MessageDocument>>({
  content: { type: String, required: true },
  createdDate: { type: Date, default: new Date() }
}).plugin(mongoosePaginate)

type DBMessageModelType<T extends Document> = PaginateModel<T>

export const DBMessageModel = model<MessageDocument>('message', MessageSchema) as DBMessageModelType<MessageDocument>
