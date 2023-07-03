"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const nanoid_1 = require("nanoid");
const nanoid = (0, nanoid_1.customAlphabet)("abcdefghijklmnopqrstuvwxyz0123456789", 10);
const bookSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
const BookEntity = mongoose_1.default.model("Book", bookSchema);
exports.default = BookEntity;
