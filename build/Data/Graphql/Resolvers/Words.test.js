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
const globals_1 = require("@jest/globals");
const Word_1 = __importDefault(require("../../Schema/Word"));
// describe('Query words', () => {
//     test('Query find word', async () => {
//         jest.spyOn(WordModel, "find").mockReturnValue([
//             new WordModel{
//                 Characters: 'anhquan',
//                 CreatedAt: '2023-03-21T13:33:19.117Z',
//                 NumberOfSearch: 0,
//                 IsDictionary: true,
//             }
//         ]);
//         var data = await Words.Query.findWord({context: "context"}, {keyword: "hello"});
//         expect(data).toBe("hello");
//     });
// });
(0, globals_1.describe)("Mutation words", () => {
    (0, globals_1.test)("Create a word", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockWord = new Word_1.default({
            Characters: "anhquan",
            CreatedAt: new Date().toISOString(),
            NumberOfSearch: 0,
            IsDictionary: true
        });
        const spy = globals_1.jest.spyOn(mockWord, "save").mockReturnValue(mockWord);
        yield mockWord.save();
        const spyCreateWord = spy.mock.results[0].value;
        (0, globals_1.expect)(spy).toHaveBeenCalledTimes(1);
        (0, globals_1.expect)(spyCreateWord.Characters).toEqual(mockWord.Characters);
        spy.mockReset;
    }));
});
