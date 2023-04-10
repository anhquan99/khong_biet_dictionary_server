import { describe, expect, jest, test } from "@jest/globals";
import validator from "validator";

import BookmarkModel from "../../Graphql/Schema/Bookmark";
import * as MeaningBusiness from '../../Business/Implement/Meaning.Business'
import * as WordBusiness from '../../Business/Implement/Words.Bussiness'
import * as SpeechTypeBusiness from '../Implement/SpeechTypes.Business'
import * as UserBusiness from '../Implement/Users.Business'
import * as BookmarkBusiness from '../Implement/Bookmark.Business'
import * as PharseBusiness from '../Implement/Pharses.Business'
import { TokenInfo } from "../../Middlewares/Token";
import { BookmarkTypeEnumTs } from "../../Enums/SchemaEnum";

const mockCreator = {
    id : "0",
    username : "BookmarkCreator",
    password : "P@assword123",
    email : "bookmarkcreator@test.com",
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
    characters : "Mock word bookmark",
    isDictionary : true
}
const mockSpeechType = {
    id : "0",
    name : "Mock speech type bookmark",
    description : "Mock speech type bookmark description"
}
const mockMeaning = {
    id : "0",
    meaning : "Mock meaning bookmark",
    isSlang : true
}
const mockPharse = {
    id : "0",
    pharse : "Mock pharse"
}

var bookmarkWordId : string;
var bookmarkMeaningId : string;
var bookmarkPharseId : string;
var bookmarkSpeechTypeId : string;

describe("Bookmark test", () => {
    beforeAll(async () => {
        const creator = await UserBusiness.Register(mockCreator.username, mockCreator.email, mockCreator.password);

        mockCreator.id = creator.Id as string;
        mockCreator.role = creator.Role as string;

        mockToken.Id = creator.Id as string;
        mockToken.Username = creator.Username as string;
        mockToken.Role = creator.Role as string;
        mockToken.CreatedDate = new Date();

        mockSpeechType.id = (await SpeechTypeBusiness.createSpeechType(mockSpeechType.name, mockSpeechType.description, mockToken)).Id as string;
        
        mockWord.id = (await WordBusiness.createWord(mockWord.characters, mockSpeechType.id, mockWord.isDictionary, mockToken)).Id as string;

        mockMeaning.id = (await MeaningBusiness.createMeaning(mockMeaning.meaning, mockWord.id, mockMeaning.isSlang, mockSpeechType.id, mockToken)).Id as string;

        mockPharse.id = (await PharseBusiness.createPharse(mockPharse.pharse, mockToken, [mockWord.id])).Id as string;
    })
    test("Create bookmark for word", async () => {
        const newBookmarkWord = await BookmarkBusiness.createBookmark(mockWord.id, BookmarkTypeEnumTs.Word, mockToken);
        bookmarkWordId = newBookmarkWord.Id as string;
        expect(newBookmarkWord.Bookmarker).toBe(mockCreator.id);
        expect(newBookmarkWord.Type).toBe(BookmarkTypeEnumTs.Word);
        expect(newBookmarkWord.Bookmark).toBe(mockWord.id);
    })
    test("Create bookmark for meaning", async () => {
        const newBookmarkMeaning = await BookmarkBusiness.createBookmark(mockMeaning.id, BookmarkTypeEnumTs.Meaning, mockToken);
        bookmarkMeaningId = newBookmarkMeaning.Id as string;
        expect(newBookmarkMeaning.Bookmarker).toBe(mockCreator.id);
        expect(newBookmarkMeaning.Type).toBe(BookmarkTypeEnumTs.Meaning);
        expect(newBookmarkMeaning.Bookmark).toBe(mockMeaning.id);
    })
    test("Create bookmark for pharse", async () => {
        const newBookmarkPharse = await BookmarkBusiness.createBookmark(mockPharse.id, BookmarkTypeEnumTs.Pharse, mockToken);
        bookmarkPharseId = newBookmarkPharse.Id as string;
        expect(newBookmarkPharse.Bookmarker).toBe(mockCreator.id);
        expect(newBookmarkPharse.Type).toBe(BookmarkTypeEnumTs.Pharse);
        expect(newBookmarkPharse.Bookmark).toBe(mockPharse.id);
    })
    test("Create bookmark for speech type", async () => {
        const newBookmarkSpeechType = await BookmarkBusiness.createBookmark(mockSpeechType.id, BookmarkTypeEnumTs.SpeechType, mockToken);
        bookmarkSpeechTypeId = newBookmarkSpeechType.Id as string;
        expect(newBookmarkSpeechType.Bookmarker).toBe(mockCreator.id);
        expect(newBookmarkSpeechType.Type).toBe(BookmarkTypeEnumTs.SpeechType);
        expect(newBookmarkSpeechType.Bookmark).toBe(mockSpeechType.id);
    })
    test("Find bookmark for word", async () => {
        const bookmarkWord = await BookmarkBusiness.findBookmark(bookmarkWordId);
        expect(bookmarkWord.Bookmarker).toBe(mockCreator.id);
        expect(bookmarkWord.Type).toBe(BookmarkTypeEnumTs.Word);
        expect(bookmarkWord.Bookmark).toBe(mockWord.id);
    })
    test("Find bookmark for meaning", async () => {
        const bookmarkMeaning = await BookmarkBusiness.findBookmark(bookmarkMeaningId);
        expect(bookmarkMeaning.Bookmarker).toBe(mockCreator.id);
        expect(bookmarkMeaning.Type).toBe(BookmarkTypeEnumTs.Meaning);
        expect(bookmarkMeaning.Bookmark).toBe(mockMeaning.id);
    })
    test("Find bookmark for pharse", async () => {
        const bookmarkPharse = await BookmarkBusiness.findBookmark(bookmarkPharseId);
        expect(bookmarkPharse.Bookmarker).toBe(mockCreator.id);
        expect(bookmarkPharse.Type).toBe(BookmarkTypeEnumTs.Pharse);
        expect(bookmarkPharse.Bookmark).toBe(mockPharse.id);
    })
    test("Find bookmark for speech type", async () => {
        const bookmarkSpeechType = await BookmarkBusiness.findBookmark(bookmarkSpeechTypeId);
        expect(bookmarkSpeechType.Bookmarker).toBe(mockCreator.id);
        expect(bookmarkSpeechType.Type).toBe(BookmarkTypeEnumTs.SpeechType);
        expect(bookmarkSpeechType.Bookmark).toBe(mockSpeechType.id);
    })
    test("Find bookmarks", async () => {
        const bookmarkedObject = [mockWord.id, mockMeaning.id, mockPharse.id, mockSpeechType.id];
        const bookmarks = await BookmarkBusiness.findBookmarks(undefined, mockCreator.id);
        bookmarks.forEach(x => {
            expect(bookmarkedObject.includes(x.Bookmark as string)).toBeTruthy();
        });
    })
    test("Delete bookmarks", async () => {
        const bookmarkSpy = jest.spyOn(BookmarkModel, "findOneAndDelete");
        await BookmarkBusiness.deleteBookmark(bookmarkMeaningId, mockToken);
        expect(bookmarkSpy).toHaveBeenCalledTimes(1);
    })
})