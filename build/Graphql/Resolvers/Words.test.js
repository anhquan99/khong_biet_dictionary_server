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
const Word_1 = __importDefault(require("../Schema/Word"));
const Words_1 = require("./Words");
const mockWord = {
    Characters: "anhquan",
    CreatedAt: new Date().toISOString(),
    NumberOfSearch: 0,
    IsDictionary: true
};
beforeAll(() => {
    globals_1.jest.spyOn(Word_1.default.prototype, 'save').mockReturnValue(mockWord);
    globals_1.jest.spyOn(Word_1.default, "find").mockReturnValue([mockWord]);
});
afterAll(() => {
    globals_1.jest.restoreAllMocks();
});
(0, globals_1.describe)('Query words', () => {
    (0, globals_1.test)('Query find word', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield Words_1.Words.Query.findWord({ context: "context" }, { keyword: "anhquan" });
        (0, globals_1.expect)(result[0]).toBe(mockWord.Characters);
    }));
});
(0, globals_1.describe)("Mutation words", () => {
    (0, globals_1.test)("Create a word", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield Words_1.Words.Mutation.createWord({ context: "context" }, { newWord: "anhquan" });
        (0, globals_1.expect)(result).toBe(mockWord.Characters);
    }));
});
