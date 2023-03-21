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
const globals_1 = require("@jest/globals");
const Word_1 = require("../../Schema/Word");
const Words_1 = require("./Words");
(0, globals_1.describe)('Query words', () => {
    (0, globals_1.test)('Query find word', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(Word_1.WordModel, "find").mockReturnValue([{
                Characters: 'anhquan',
                CreatedAt: '2023-03-21T13:33:19.117Z',
                NumberOfSearch: 0,
                IsDictionary: true,
            }]);
        var data = yield Words_1.Words.Query.findWord({ context: "context" }, { keyword: "hello" });
        (0, globals_1.expect)(data).toBe("Hello");
    }));
});
// describe("Mutation words", () => {
//     test("Create a word", async() => {
//         var data = await Words.Mutation.createWord({context: "context"}, {newWord: "anhquan"});
//         expect(data).toBe("anhquan");
//     })
// })
