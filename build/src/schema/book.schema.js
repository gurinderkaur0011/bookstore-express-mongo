"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookSchema = exports.deleteBookSchema = exports.updateBookSchema = exports.createBookSchema = void 0;
const zod_1 = require("zod");
/**
 * @openapi
 * components:
 *   schemas:
 *     BookInput:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - price
 *        - image
 *       properties:
 *         title:
 *           type: string
 *           default: 신비한 세계의 여정
 *         description:
 *           type: string
 *           default: 《신비한 세계의 여정》은 환상적인 판타지 소설로, 마법과 모험이 얽힌 흥미진진한 이야기를 펼칩니다. 이 소설은 어린이들과 성인 독자들을 모두 매료시킬 멋진 세계를 그려냅니다. 주인공들은 위험을 감수하며 신비로운 대륙을 탐험하고, 마법의 힘을 이용하여 강력한 적들과 맞서 싸우게 됩니다. 이 소설은 현실과 상상력이 어우러진 재미있는 이야기를 제공하며, 독자들을 몰입시키는 환상적인 세계로 초대합니다. 마법사, 용사, 요정 등 다양한 캐릭터들과 함께 신비한 여정을 떠나 보세요. 이 책은 여러분에게 흥미로운 시간과 재미있는 경험을 선사할 것입니다
 *         price:
 *           type: number
 *           default: 57600
 *         discount:
 *           type: number
 *           default: 10
 *         image:
 *           type: string
 *           default: https://6.soompi.io/wp-content/uploads/image/4e5699e0b62449c48e53fca1ed91dcc7/dummy.jpeg?s=900x600&e=t
 *     BookResponse:
 *       type: object
 *       properties:
 *         bookId:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
 *         discount:
 *           type: number
 *     BookListInput:
 *       type: array
 *       items:
 *             $ref: '#/components/schemas/BookInput'
 *     BookListResponse:
 *       type: array
 *       items:
 *             $ref: '#/components/schemas/BookResponse'
 */
const booksInput = (0, zod_1.object)({
    title: (0, zod_1.string)({
        required_error: "Title is required",
    }),
    description: (0, zod_1.string)({
        required_error: "Description is required",
    }).min(10, "Description should be at least 10 characters long"),
    price: (0, zod_1.number)({
        required_error: "Price is required",
    }),
    image: (0, zod_1.string)({
        required_error: "Image is required",
    }),
    discount: (0, zod_1.number)().max(99, "Discount cannot exceed 99")
});
const payload = {
    body: booksInput,
};
const params = {
    params: (0, zod_1.object)({
        bookId: (0, zod_1.string)({
            required_error: "bookId is required",
        }),
    }),
};
exports.createBookSchema = (0, zod_1.object)({
    body: booksInput.array(),
});
exports.updateBookSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteBookSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getBookSchema = (0, zod_1.object)(Object.assign({}, params));
