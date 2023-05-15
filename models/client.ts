import mongoose, { Schema, Document } from "mongoose";

export interface ClientDoc extends Document {
  first_name: string;
  last_name: string;
  phone: string;
  pincode: string;
  email: string;
  salt: string;
  password: string;
  address: string;
}

const clientSchema = new Schema(
  {
    first_name: { type: String, require: true },
    last_name: { type: String, required: true },
    phone: { type: String, require: true },
    pincode: { type: String },
    email: { type: String, require: true },
    salt: { type: String },
    password: { type: String, required: true },
    address: { type: String },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password,
          delete ret.salt,
          delete ret.__v,
          delete ret.createdAt,
          delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const client = mongoose.model<ClientDoc>("client", clientSchema);

export { client };
