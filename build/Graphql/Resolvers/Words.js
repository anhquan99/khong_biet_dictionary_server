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
const Word_1 = __importDefault(require("../Schema/Word"));
const Words = {
    Query: {
        findWord(_, { keyword }) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield Word_1.default.find({ Characters: keyword });
                var resultArr = result.map(x => x.Characters);
                return resultArr;
            });
        }
    },
    Mutation: {
        createWord(_, { newWord }) {
            return __awaiter(this, void 0, void 0, function* () {
                const word = new Word_1.default({
                    Characters: newWord,
                    CreatedAt: new Date().toISOString(),
                    NumberOfSearch: 0,
                    IsDictionary: true
                });
                const result = yield word.save();
                return result.Characters;
            });
        }
    }
};
exports.default = Words;
