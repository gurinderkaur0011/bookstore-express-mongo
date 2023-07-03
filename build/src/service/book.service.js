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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.findAndUpdateBook = exports.fetchBooks = exports.findBook = exports.createBook = void 0;
const book_entity_1 = __importDefault(require("../entities/book.entity"));
function createBook(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield book_entity_1.default.insertMany(input);
            return result;
        }
        catch (e) {
            throw e;
        }
    });
}
exports.createBook = createBook;
function findBook(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield book_entity_1.default.findOne(query, {}, options);
            return result;
        }
        catch (e) {
            throw e;
        }
    });
}
exports.findBook = findBook;
function fetchBooks(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { limit, skip } = query;
            const books = yield book_entity_1.default.find({}, {}, options)
                .skip(skip || 0)
                .limit(limit || 10);
            return books;
        }
        catch (e) {
            throw e;
        }
    });
}
exports.fetchBooks = fetchBooks;
function findAndUpdateBook(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return book_entity_1.default.findOneAndUpdate(query, update, options);
    });
}
exports.findAndUpdateBook = findAndUpdateBook;
function deleteBook(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return book_entity_1.default.deleteOne(query);
    });
}
exports.deleteBook = deleteBook;
