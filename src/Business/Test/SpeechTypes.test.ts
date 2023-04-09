import { describe, expect, jest, test } from "@jest/globals";
import validator from "validator";
import SpeechTypeModel from "../../Graphql/Schema/SpeechType";
import WordModel from "../../Graphql/Schema/Word";

import { createSpeechType, deleteSpeechType, findSpeechType, findSpeechTypes, updateSpeechType } from "../Implement/SpeechTypes.Business";
import { Login, Register } from "../Implement/Users.Business";
import { TokenInfo } from "../../Middlewares/Token";

const mockST = {
    name : "Noun",
    description : "A noun is a word that generally functions as the name of a specific object or set of objects, such as living creatures, places, actions, qualities, states of existence, or ideas."
};
const mockSecondSt = {
    id : "0",
    name : "Adjective",
    description : "An adjective is a word that describes a noun or noun phrase. Its semantic role is to change information given by the noun"
}
const mockThirdSt = {
    name : "Adverb",
    description : "An adverb is a word or an expression that generally modifies a verb, adjective, another adverb, determiner, clause, preposition, or sentence."
}
const mockCreator = {
    username : "STCreator",
    password : "P@assword123",
    email : "stcreator@test.com",
    id : "0"
};
const mockToken : TokenInfo = {
    Id : "",
    Username : "",
    Role : "",
    CreatedDate : new Date()
}

describe("Speech type test", () => {
    beforeAll(async () => {
        const creator = await Register(mockCreator.username, mockCreator.email, mockCreator.password);

        mockCreator.id = creator.Id as string;

        mockToken.Id = creator.Id as string;
        mockToken.Username =creator.Username as string;
        mockToken.Role = creator.Role as string;
        mockToken.CreatedDate = new Date();

        const secondSt = await createSpeechType(mockSecondSt.name, mockSecondSt.description, mockToken);
        mockSecondSt.id = secondSt.Id as string;
        await createSpeechType(mockThirdSt.name, mockThirdSt.description, mockToken);
    });
    describe("Speech type", () => {
        test("Create speech type", async () => {
            const st = await createSpeechType(mockST.name, mockST.description, mockToken);
            expect(st.Name as string).toBe(mockST.name);
            expect(st.Description as string).toBe(mockST.description);
            expect(st.Creator as string).toBe(mockCreator.id as string);
            expect(isNaN(Date.parse(st.CreatedAt?.toString() as string))).toBeFalsy();
        });
        test("find speech type", async () => {
            const st = await findSpeechType(mockST.name);
            expect(st.Name).toBe(mockST.name);
            expect(st.Description).toBe(mockST.description);
        });
        test("find speech types", async () => {
            const stName = "ad";
            const sts = await findSpeechTypes(stName);
            sts.forEach((item) => {
                expect(item.Name as string).toMatch(/ad/i);
            });
        })
        test("Update speech type", async () => {
            const newDescription = "Updated description";
            const newName = "Updated name";
            const newDate = new Date();
            const st = await updateSpeechType(mockSecondSt.id, mockToken , newName, newDescription, newDate);
            expect(st.Name).toBe(newName);
            expect(st.Description).toBe(newDescription);
            expect(st.CreatedAt).toStrictEqual(newDate);
        })
        test("Delete speech type", async () => {
            const speechTypeSpy = jest.spyOn(SpeechTypeModel, "findOneAndDelete")
            const wordSpy = jest.spyOn(WordModel, "remove");
            await deleteSpeechType(mockSecondSt.id, mockToken);
            expect(speechTypeSpy).toBeCalledTimes(1);
            expect(wordSpy).toBeCalledTimes(1);
        })
    })
});
