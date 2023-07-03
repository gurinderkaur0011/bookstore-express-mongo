"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookHandler = exports.getBookHandler = exports.updateBookHandler = exports.listBooksHandler = exports.createBookHandler = void 0;
const book_service_1 = require("../service/book.service");
function createBookHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const book = yield (0, book_service_1.createBook)(body);
        return res.send(book);
    });
}
exports.createBookHandler = createBookHandler;
function listBooksHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { limit, offset } = req.query;
            // Convert limit and offset to numbers
            const limitValue = Number(limit) || 10;
            const offsetValue = Number(offset) || 0;
            // Calculate skip value for pagination
            const skip = offsetValue * limitValue;
            // Query books with pagination
            const books = yield (0, book_service_1.fetchBooks)({ limit: limitValue, skip });
            res.json(books);
        }
        catch (error) {
            console.error("Error fetching books", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.listBooksHandler = listBooksHandler;
function updateBookHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookId = req.params.bookId;
        const update = req.body;
        const book = yield (0, book_service_1.findBook)({ bookId });
        if (!book) {
            return res.sendStatus(404);
        }
        const updatedBook = yield (0, book_service_1.findAndUpdateBook)({ bookId }, update, {
            new: true,
        });
        return res.send(updatedBook);
    });
}
exports.updateBookHandler = updateBookHandler;
function getBookHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookId = req.params.bookId;
        const book = yield (0, book_service_1.findBook)({ bookId });
        if (!book) {
            return res.sendStatus(404);
        }
        return res.send(book);
    });
}
exports.getBookHandler = getBookHandler;
function deleteBookHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookId = req.params.bookId;
        const book = yield (0, book_service_1.findBook)({ bookId });
        if (!book) {
            return res.sendStatus(404);
        }
        yield (0, book_service_1.deleteBook)({ bookId });
        return res.sendStatus(200);
    });
}
exports.deleteBookHandler = deleteBookHandler;
