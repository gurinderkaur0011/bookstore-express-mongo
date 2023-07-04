import { Express, Request, Response } from "express";
import {
    createBookHandler,
    getBookHandler,
    updateBookHandler,
    deleteBookHandler,
    listBooksHandler,
  } from "./controller/book.controller";

  import validateResource from "./middleware/validateResource";
  import {
    createBookSchema,
    deleteBookSchema,
    getBookSchema,
    updateBookSchema,
  } from "./schema/book.schema";

function routes(app: Express){

  app.get('/', (req: Request, res: Response) => res.sendStatus(200));

  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  /**
   * @openapi
   * '/api/books':
   *  post:
   *     tags:
   *     - Books
   *     summary: Insert a list of books
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/BookListInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/BookListResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
    app.post(
        "/api/books",
        [validateResource(createBookSchema)],
        createBookHandler
      );
    
  /**
   * @openapi
   * '/api/books/{bookId}':
   *  get:
   *     tags:
   *     - Books
   *     summary: Get a single book by the bookId
   *     parameters:
   *      - name: bookId
   *        in: path
   *        description: The id of the book
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schemas/BookInput'
   *       404:
   *         description: Book not found
   */
  app.get(
    "/api/books/:bookId",
    validateResource(getBookSchema),
    getBookHandler
  );

  /**
   * @openapi
   * '/api/books/{bookId}':
   *  put:
   *     tags:
   *     - Books
   *     summary: Update a single book by the bookId
   *     parameters:
   *      - name: bookId
   *        in: path
   *        description: The id of the book
   *        required: true
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/BookInput'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schemas/BookResponse'
   *       404:
   *         description: Book not found
   */
  app.put(
    "/api/books/:bookId",
    [validateResource(updateBookSchema)],
    updateBookHandler
  );

  /**
   * @openapi
   * '/api/books/{bookId}':
   *  delete:
   *     tags:
   *     - Books
   *     summary: Delete a single book by the bookId
   *     parameters:
   *      - name: bookId
   *        in: path
   *        description: The id of the book
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schemas/BookResponse'
   *       404:
   *         description: Book not found
   */
  app.delete(
    "/api/books/:bookId",
    [validateResource(deleteBookSchema)],
    deleteBookHandler
  );

  /**
   * @openapi
   * '/api/books':
   *  get:
   *     tags:
   *     - Books
   *     summary: Get a list of books with pagination
   *     parameters:
   *      - name: limit
   *        in: query
   *        description: The number of books to fetch 
   *        schema:
   *          type: integer
   *          minimum: 1
   *          default: 10
   *      - name: offset
   *        in: query
   *        description: The number of books to skip 
   *        schema:
   *          type: integer
   *          minimum: 0
   *          default: 0
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *             $ref: '#/components/schemas/BookListResponse'
   *       500:
   *         description: Internal Server Error
   */
    app.get(
      "/api/books",
      listBooksHandler
    );

}

export default routes;