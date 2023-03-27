// import {describe, expect, jest, test} from '@jest/globals';
// import WordModel from '../../Graphql/Schema/Word';
// import Words  from "../Words";

// const mockWord = {
//     Characters: "anhquan",
//     CreatedAt: new Date().toISOString(),
//     NumberOfSearch: 0,
//     IsDictionary: true
// }

// beforeAll(() => {
//     jest.spyOn(WordModel.prototype, 'save').mockReturnValue(mockWord as any);
//     jest.spyOn(WordModel, "find").mockReturnValue([mockWord] as any);
// });
// afterAll(() => {
//     jest.restoreAllMocks();
// })

// describe('Query words', () => {
//     test('Query find word', async () => {
//         const result = await Words.Query.findWord({context: "context"}, {keyword: "anhquan"});
//         expect(result[0]).toBe(mockWord.Characters);
//     });
// });

// describe("Mutation words", () => {
//     test("Create a word", async() => {
//         const result = await Words.Mutation.createWord({context: "context"}, {newWord: "anhquan"});
//         expect(result).toBe(mockWord.Characters);
//     })
// })
