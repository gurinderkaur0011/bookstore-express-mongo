import { Request, Response } from "express";
import {
  CreateBookInput,
  UpdateBookInput,
} from "../schema/book.schema";
import {
  createBook,
  deleteBook,
  findAndUpdateBook,
  findBook,
  fetchBooks
} from "../service/book.service";

export async function createBookHandler(
  req: Request<{}, {}, CreateBookInput["body"]>,
  res: Response
) {

  const body = req.body ;
  const book = await createBook(body);

  return res.send(book);
}

export async function listBooksHandler(req: Request, res: Response) {
  try {
    const { limit, offset } = req.query;

    // Convert limit and offset to numbers
    const limitValue = Number(limit) || 10;
    const offsetValue = Number(offset) || 0;

    // Calculate skip value for pagination
    const skip = offsetValue * limitValue;

    // Query books with pagination
    const books = await fetchBooks({ limit: limitValue, skip });

    res.json(books);
  } catch (error) {
    console.error("Error fetching books", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updateBookHandler(
  req: Request<UpdateBookInput["params"]>,
  res: Response
) {

  const bookId = req.params.bookId;
  const update = req.body;

  const book = await findBook({ bookId });

  if (!book) {
    return res.sendStatus(404);
  }


  const updatedBook = await findAndUpdateBook({ bookId }, update, {
    new: true,
  });

  return res.send(updatedBook);
}

export async function getBookHandler(
  req: Request<UpdateBookInput["params"]>,
  res: Response
) {
  const bookId = req.params.bookId;
  const book = await findBook({ bookId });

  if (!book) {
    return res.sendStatus(404);
  }

  return res.send(book);
}

export async function deleteBookHandler(
  req: Request<UpdateBookInput["params"]>,
  res: Response
) {
  const bookId = req.params.bookId;

  const book = await findBook({ bookId });

  if (!book) {
    return res.sendStatus(404);
  }

  await deleteBook({ bookId });

  return res.sendStatus(200);
}