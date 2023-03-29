import { describe, expect, test } from "@jest/globals";
import validator from "validator";

import { createSpeechType } from "../Implement/SpeechTypes.Business";
import { Register } from "../Implement/User.Business";

const mockST = {
    name : "Noun",
    description : "A noun is a word that generally functions as the name of a specific object or set of objects, such as living creatures, places, actions, qualities, states of existence, or ideas."
};

const mockCreator = {
    username : "STCreator",
    password : "P@assword123",
    email : "stcreator@test.com"
};

describe("Mutation speech type", () => {
    test("Create speech type", async () => {
        const creator = await Register(mockCreator.username, mockCreator.email, mockCreator.password);
        const st = await createSpeechType(mockST.name, mockST.description, creator.Id as string);
        expect(st.Name as string).toBe(mockST.name);
        expect(st.Description as string).toBe(mockST.description);
        expect(st.Creator as string).toBe(creator.Id as string);
        console.debug(st.CreatedAt);
        expect(isNaN(Date.parse(st.CreatedAt?.toString() as string))).toBeFalsy();
    })
})