import { Document, Schema, PaginateModel, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

export interface MessageProfileRoomRelationshipDocument extends Document {
  id: string
  messageId: string
  profileId: string
  roomId: string
  createdDate: Date
  updatedDate: Date
}

export const MessageProfileRoomRelationshipSchema = new Schema<
  MessageProfileRoomRelationshipDocument,
  DBMessageProfileRoomRelationshipModelType<MessageProfileRoomRelationshipDocument>
>({
  messageId: { type: String, required: true },
  profileId: { type: String, required: true },
  roomId: { type: String, required: true },
  createdDate: { type: Date, default: new Date() },
  updatedDate: { type: Date, default: new Date() }
}).plugin(mongoosePaginate)

type DBMessageProfileRoomRelationshipModelType<T extends Document> = PaginateModel<T>

export const DBMessageProfileRelationshipModel = model<MessageProfileRoomRelationshipDocument>(
  'MessageProfileRelationship',
  MessageProfileRoomRelationshipSchema
) as DBMessageProfileRoomRelationshipModelType<MessageProfileRoomRelationshipDocument>
