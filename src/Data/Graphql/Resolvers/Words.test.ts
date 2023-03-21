import {describe, expect, jest, test} from '@jest/globals';
import { WordModel } from '../../Schema/Word';
import { Words } from "./Words";

describe('Query words', () => {
    test('Query find word', async () => {
        jest.spyOn(WordModel, "find").mockReturnValue(
        [{
            Characters: 'anhquan',
            CreatedAt: '2023-03-21T13:33:19.117Z',
            NumberOfSearch: 0,
            IsDictionary: true,
        }]
            );
        var data = await Words.Query.findWord({context: "context"}, {keyword: "hello"});
        expect(data).toBe("Hello");
    });
});

// describe("Mutation words", () => {
//     test("Create a word", async() => {
//         var data = await Words.Mutation.createWord({context: "context"}, {newWord: "anhquan"});
//         expect(data).toBe("anhquan");
//     })
// })