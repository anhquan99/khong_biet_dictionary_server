
import {describe, expect, test} from '@jest/globals';
import { Words } from "./Words";

describe('Query words', () => {
    test('Query find word', async () => {
        var data = await Words.Query.findWord();
        expect(data).toBe("Hello");
    });
});

describe("Mutation words", () => {
    test("Create a word", async() => {
        var data = await Words.Mutation.createWord({context: "context"}, {newWord: "anhquan"});
        expect(data).toBe("anhquan");
    })
})