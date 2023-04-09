import { describe, expect, jest ,test } from "@jest/globals";

import Pharses from "../../Graphql/Resolvers/Implement/Pharses";
import * as PharseBusiness from '../Implement/Pharses.Business'
import * as UserBusiness from '../Implement/Users.Business'
import * as WordBusiness from '../Implement/Words.Bussiness'
import * as SpeechTypeBusiness from '../Implement/SpeechTypes.Business'
import PharseModel from "../../Graphql/Schema/Pharse";
import { TokenInfo } from "../../Middlewares/Token";

const mockCreator = {
    id : "0",
    username : "PharseCreator",
    password : "P@assword123",
    emai : "pharsecreator@test.com",
    role : ""
}
const mockToken : TokenInfo = {
    Id : "",
    Username : "",
    Role : "",
    CreatedDate : new Date()
}
const mockWord = {
    id : "0",
    characters : "Black",
    isDictionary : true
}
const mockSpeechType = {
    id : "0",
    name : "SpeechTypeMockForPharse",
    description : "A noun is a word that generally functions as the name of a specific object or set of objects, such as living creatures, places, actions, qualities, states of existence, or ideas."
}
const mockCreatedWords = [
    {
        id : "0",
        characters : "Gray",
        isDictionary : true
    },
    {
        id : "0",
        characters : "Aqua",
        isDictionary : true
    },
    
]
const mockPharse = {
    id : "0",
    pharse : "The gray clouds above the aqua sea made for a beautiful view."
}
const mockCreatedPharse = [
    {
        id : "0",
        pharse : "The gray sky was a sign of the coming storm.",
        words : [] as any
    },
    {
        id : "0",
        pharse : "The aqua water was so clear that you could see the fish swimming below.",
        words : [] as any
    }
]

describe("Pharse test", () => {
    beforeAll(async () => {
        const creator  = await UserBusiness.Register(mockCreator.username, mockCreator.emai, mockCreator.password);

        mockToken.Id = creator.Id as string;
        mockToken.Username = creator.Username as string;
        mockToken.Role = creator.Role as string;
        mockToken.CreatedDate = new Date();

        mockCreator.id = creator.Id as string;
        mockCreator.role = creator.Role as string;

        mockSpeechType.id = (await SpeechTypeBusiness.createSpeechType(mockSpeechType.name, mockSpeechType.description, mockToken)).Id as string;

        for(let item of mockCreatedWords){
            item.id = (await WordBusiness.createWord(item.characters, mockSpeechType.id, item.isDictionary, mockToken)).Id as string;
        }
        let i = 0;
        for(let item of mockCreatedPharse){
            const newPharse = await PharseBusiness.createPharse(item.pharse, mockToken, [mockCreatedWords[i].id]);
            item.id = newPharse.Id as string;
            item.words = newPharse.Words;
            i++;
        }
    })
    test("Create pharse", async () => {
        let words = [] as any;
        words.push(mockCreatedWords[0].id);
        words.push(mockCreatedWords[1].id);
        const pharse = await PharseBusiness.createPharse(mockPharse.pharse, mockToken, words);
        mockPharse.id = pharse.Id as string;
        expect(pharse.Pharse).toBe(mockPharse.pharse);
        expect(pharse.Creator).toBe(mockCreator.id);
        words.forEach( (i : string) => {
            expect(pharse.Words.includes(i)).toBeTruthy();
        });
    })
    test("Find pharse", async() => {
        const createdPharse = mockCreatedPharse[0];
        const pharse = await PharseBusiness.findPharse(createdPharse.id);
        expect(pharse.Pharse).toBe(createdPharse.pharse);
        expect(pharse.Words).toStrictEqual(createdPharse.words);
        expect(isNaN(Date.parse(pharse.CreatedAt?.toString() as string))).toBeFalsy();
    })
    test("Find pharses", async () =>{
        const pharseChar = "was";
        const words = [mockCreatedWords[0].id, mockCreatedWords[1].id];
        const pharses = await PharseBusiness.findPharses(pharseChar);
        pharses.forEach(item => {
            expect(item.Pharse).toMatch(/was/i);
            expect(item.Creator).toBe(mockCreator.id);
            expect(item.Words.some(x => words.includes(x))).toBeTruthy();
        })
    })
    test("Update pharse", async () => {
        const update = {
            pharse : "The aqua sky was a beautiful backdrop to the gray buildings.",
            createdAt : new Date()
        }
        const updatedPharse = await PharseBusiness.updatePharse(mockPharse.id, mockToken, update.pharse, update.createdAt);
        expect(updatedPharse.Pharse).toBe(update.pharse);
        expect(updatedPharse.CreatedAt).toStrictEqual(update.createdAt);
    })
    test("Delete pharse", async () => {
        const pharseSpy = jest.spyOn(PharseModel, "findOneAndDelete");
        await PharseBusiness.deletePharse(mockPharse.id, mockToken);
        expect(pharseSpy).toHaveBeenCalledTimes(1);
    })
})