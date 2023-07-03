import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface BookInput {
  title: string;
  description: string;
  price: number;
  image: string;
  discount: number
}

export interface BookDocument extends BookInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      required: true,
      unique: true,
      default: () => `book_${nanoid()}`,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true, default: 10 },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const BookEntity = mongoose.model<BookDocument>("Book", bookSchema);

export default BookEntity;