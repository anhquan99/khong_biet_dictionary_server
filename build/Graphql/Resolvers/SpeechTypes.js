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
const SpeechType_1 = __importDefault(require("../Schema/SpeechType"));
function findSpeechType(speechTypeName) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield SpeechType_1.default.find({
            Name: name
        });
        return result;
    });
}
function createSpeechType(speechTypeName, creatorId) {
    return __awaiter(this, void 0, void 0, function* () {
        const newSpeechType = new SpeechType_1.default({
            Name: speechTypeName,
            // Creator : mongoose.Schema.Types.ObjectId(creatorId),
            CreatedAt: new Date().toISOString()
        });
        yield newSpeechType.save();
        return newSpeechType;
    });
}
const SpeechTypes = {
    Query: {
        findSpeechType(_, { speechTypeName }) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield findSpeechType(speechTypeName);
                return result;
            });
        }
    },
    Mutation: {
        createSpeechType(_, { speechTypeName }) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield createSpeechType(speechTypeName, "001");
                return result;
            });
        }
    }
};
