import { describe, expect, jest, test } from "@jest/globals";
import validator from "validator";

import MeaningModel from "../../Graphql/Schema/Meaning";
import * as MeaningBusiness from '../../Business/Implement/Meaning.Business'
import * as WordBusiness from '../../Business/Implement/Words.Bussiness'
import * as SpeechTypeBusiness from '../Implement/SpeechTypes.Business'
import * as UserBusiness from '../Implement/Users.Business'

const mockCreator = {
    id : "0",
    username : "MeaningCreator",
    password : "P@assword123",
    emai : "meaningcreator@test.com",
    role : ""
}

const mockWord = {
    id : "0",
    characters : "Purple" 
}
const mockSpeechType = {
    id : "0",
    name : "MockAdjective",
    description : "A noun is a word that generally functions as the name of a specific object or set of objects, such as living creatures, places, actions, qualities, states of existence, or ideas."
}
const mockMeaning = {
    id : "0",
    meaning : "Purple refers to any of a variety of colors with hue between red and blue. Purple is closely associated with violet."
}
const mockCreatedMeanings = [
    {
        id : "0",
        meaning : "In optics, purple and violet refer to colors that look similar, but purples are mixtures of red light and blue or violet light, whereas violets are spectral colors (of single wavelengths of light)."
    },
    {
        id : "0",
        characters : " The color purple is associated with a variety of meanings, including wisdom, creativity, royalty, power, ambition, luxury, magic, extravagance, peace, pride, independence, and wealth."
    }
]

describe("Meaning test", () => {
    beforeAll(async () => {
        const creator  = await UserBusiness.Register(mockCreator.username, mockCreator.emai, mockCreator.password);
        mockCreator.id = creator.Id as string;
        mockCreator.role = creator.Role as string;
        mockSpeechType.id = (await SpeechTypeBusiness.createSpeechType(mockSpeechType.name, mockSpeechType.description, mockCreator.id)).Id as string;
        mockWord.id = ((await WordBusiness.createWord(mockWord.characters, mockSpeechType.id, mockCreator.id, mockCreator.role)).Id) as string;
        let i = 0;
        for(let item of mockCreatedMeanings){
            const newMeaning = await MeaningBusiness.createMeaning(item.meaning as string, mockWord.id, false, mockSpeechType.id, mockCreator.id, mockCreator.role);
            item.id = newMeaning.Id as string;
            i++;
        }
    })
    test("Create meaning", async () => {
        const newMeaning = await MeaningBusiness.createMeaning(mockMeaning.meaning, mockWord.id, false, mockSpeechType.id, mockCreator.id, mockCreator.role);
        mockMeaning.id = newMeaning.Id as string;
        expect(newMeaning.Meaning).toBe(mockMeaning.meaning);
    })
    test("Find meaning", async () => {
        const existedMeaning = await MeaningBusiness.findMeaning(mockMeaning.id);
        expect(existedMeaning.Meaning).toBe(mockMeaning.meaning);
    })
    test("Find meanings", async () => {
        const existedMeaning = await MeaningBusiness.findMeanings("black");
        existedMeaning.forEach(item => {
            expect(item.Meaning).toMatch(/purple/i);
        })
    })
    test("Update meaning", async () => {
        const updateMeaning = "Purple evokes power, mystery, extravaganza, and wisdom.";
        const updatedMeaning = await MeaningBusiness.updateMeaning(mockMeaning.id, mockCreator.id, updateMeaning);
        expect(updatedMeaning.Meaning).toBe(updateMeaning);
    })
    test("Delete meaning", async () => {
        const meaningSpy = jest.spyOn(MeaningModel, "findOneAndDelete");
        await MeaningBusiness.deleteMeaning(mockMeaning.id, mockCreator.id);
        expect(meaningSpy).toHaveBeenCalledTimes(1);
    })
})