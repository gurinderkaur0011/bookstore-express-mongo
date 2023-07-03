import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import BookEntity, {
  BookDocument,
  BookInput,
} from "../entities/book.entity";

export async function createBook(input: BookInput[]) {

  try {
    const result = await BookEntity.insertMany(input);
    return result;
  } catch (e) {
    throw e;
  }
}

export async function findBook(
  query: FilterQuery<BookDocument>,
  options: QueryOptions = { lean: true }
) {

  try {
    const result = await BookEntity.findOne(query, {}, options);
    return result;
  } catch (e) {
    throw e;
  }
}

export async function fetchBooks(
  query: FilterQuery<BookDocument>,
  options: QueryOptions = { lean: true }
) {
  try {
    const { limit, skip } = query;
    const books = await BookEntity.find({}, {}, options)
      .skip(skip || 0)
      .limit(limit || 10);
    return books;
  } catch (e) {
    throw e;
  }
}

export async function findAndUpdateBook(
  query: FilterQuery<BookDocument>,
  update: UpdateQuery<BookDocument>,
  options: QueryOptions
) {
  return BookEntity.findOneAndUpdate(query, update, options);
}

export async function deleteBook(query: FilterQuery<BookDocument>) {
  return BookEntity.deleteOne(query);
}