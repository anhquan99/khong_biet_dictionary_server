import { describe, expect, jest, test } from "@jest/globals";
import { Register } from "../Implement/Users.Business";

import * as WordBusiness from '../Implement/Words.Bussiness'
import * as UserBusiness from '../Implement/Users.Business' 
import * as SpeechTypeBusiness from '../Implement/SpeechTypes.Business'
import WordModel from "../../Graphql/Schema/Word";
import * as AdminBusiness from '../Implement/Users.Admin.Business'
import { roleEnumTs } from "../../Enums/SchemaEnum";

const mockCreator = {
    id : "0",
    username : "WordCreator",
    password : "P@assword123",
    emai : "wordcreator@test.com",
    role : ""
}
const mockAdmin = {
    id : "0",
    username : "WordAdmin",
    password : "P@assword123",
    emai : "wordadmin@test.com",
    role : ""
}
const mockWord = {
    id : "0",
    characters : "Red"
}
const mockSpeechType = {
    id : "0",
    name : "Speech Type mock",
    description : "An adjective is a word that describes a noun or noun phrase. Its semantic role is to change information given by the noun"
}
const mockCreatedWords = [
    {
        id : "0",
        characters : "Blue"
    },
    {
        id : "0",
        characters : "Yellow"
    }
]
describe("Word test", () => {
    beforeAll(async () => {
        const creator = await Register(mockCreator.username, mockCreator.emai, mockCreator.password);
        mockCreator.id = creator.Id as string;
        mockCreator.role = creator.Role as string;
        mockSpeechType.id = (await SpeechTypeBusiness.createSpeechType(mockSpeechType.name, mockSpeechType.description, mockCreator.id)).Id as string;
        mockCreatedWords.forEach(async (item) => {
            item.id = (await WordBusiness.createWord(item.characters, mockSpeechType.id, mockCreator.id, mockCreator.role)).Id as string;
        });
        const admin = await AdminBusiness.RegisterAdmin(mockAdmin.username, mockAdmin.emai, mockAdmin.password);
        mockAdmin.id = admin.Id as string;
        mockAdmin.role = admin.Role as string;
    })
    test("Create word", async () => {
        const word = await WordBusiness.createWord(mockWord.characters, mockSpeechType.id, mockCreator.id, mockCreator.role);
        expect(word.Characters).toBe(mockWord.characters);
        expect(isNaN(Date.parse(word.CreatedAt?.toString() as string))).toBeFalsy();
        expect(word.Creator).toBe(mockCreator.id);
        expect(word.IsDictionary).toBeFalsy();
        expect(word.NumberOfSearch).toBe(0);
        expect(word.Votes.length).toBe(0);
    })
    test("Find word", async () => {
        let tempWord = mockCreatedWords[0];
        const word = await WordBusiness.findWord(tempWord.id);
        expect(word.Characters).toBe(tempWord.characters);
        expect(isNaN(Date.parse(word.CreatedAt?.toString() as string))).toBeFalsy();
        expect(word.IsDictionary).toBeFalsy();
        expect(word.Votes.length).toBe(0);
        expect(word.NumberOfSearch).toBe(1);
    })
    test("Update word", async () => {
        const newWord = await WordBusiness.createWord("White", mockSpeechType.id, mockCreator.id, mockCreator.role);
        const update = {
            characters : "Black",
            date : new Date(),
            search : 10,
            isDic : true
        } as any;
       
        const updatedWord = await WordBusiness.updateWord(newWord.Id as string, mockCreator.id, update.characters, update.date, update.search, update.isDic);
        expect(updatedWord.Characters).toBe(update.characters);
        expect(updatedWord.CreatedAt).toStrictEqual(update.date);
        expect(updatedWord.NumberOfSearch).toBe(update.search);
        expect(updatedWord.IsDictionary).toBe(update.isDic);
    })
    test("Find words", async () => {
        const char = "e";
        const words = await WordBusiness.findWords(char);
        words.forEach((item) => {
            expect(item.Characters).toMatch(/e/i);
            expect(item.Creator).toBe(mockCreator.id);
        })
    })
    test("Delete word", async () => {
        const wordSpy = jest.spyOn(WordModel, "findOneAndDelete");
        await WordBusiness.deleteWord(mockCreatedWords[0].id, mockCreator.id);
        expect(wordSpy).toHaveBeenCalledTimes(1);
    })
    test("Create word with admin", async () => {
        const word = await WordBusiness.createWord("White", mockSpeechType.id, mockAdmin.id, mockAdmin.role);
        expect(word.IsDictionary).toBeTruthy();
    })
})