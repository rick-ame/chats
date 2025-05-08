import { model, Schema } from 'mongoose'

import { Message, MessageType } from '~'

const messageSchema = new Schema<
  Omit<Message, 'sender' | 'recipient'> & {
    sender: Schema.Types.ObjectId
    recipient?: Schema.Types.ObjectId
  }
>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: false,
    },
    messageType: {
      type: String,
      enum: MessageType.options,
      required: true,
    },
    content: {
      type: String,
      required: function () {
        return this.messageType === MessageType.enum.text
      },
    },
    fileUrl: {
      type: String,
      required: function () {
        return this.messageType === MessageType.enum.file
      },
    },
  },
  { timestamps: true },
)

export const MessageModel = model('messages', messageSchema)
