import { describe, expect, jest, test } from "@jest/globals";
import Words from "../../Graphql/Resolvers/Implement/Words";
import { Register } from "../Implement/User.Business";

import * as WordBusiness from '../Implement/Words.Bussiness'
import * as UserBusiness from '../Implement/User.Business' 
import * as SpeechTypeBusiness from '../Implement/SpeechTypes.Business'

const mockCreator = {
    id : "0",
    username : "WordCreator",
    password : "P@assword123",
    emai : "wordcreator@test.com",
    role : ""
}

const mockWord = {
    id : "0",
    characters : "Red"
}
const mockSpeechType = {
    id : "0",
    name : "Adjective",
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
})