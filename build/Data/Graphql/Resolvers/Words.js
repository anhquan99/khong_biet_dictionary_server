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
exports.Words = void 0;
const Word_1 = require("../../Schema/Word");
exports.Words = {
    Query: {
        findWord(_, { keyword }) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield Word_1.WordModel.find({ Characters: keyword });
                console.log(result);
                var resultArr = result.map(x => x.Characters);
                console.log(resultArr);
                return resultArr;
            });
        }
    },
    Mutation: {
        createWord(_, { newWord }) {
            return __awaiter(this, void 0, void 0, function* () {
                const word = new Word_1.WordModel({
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
