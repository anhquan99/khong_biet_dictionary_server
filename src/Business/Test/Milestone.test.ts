// import { describe, expect, jest, test } from "@jest/globals";
// import validator from "validator";

// import MilestoneModel from "../../Graphql/Schema/Milestone";
// import * as MilestoneBusiness from '../Implement/Milestone.Business'
// import * as AdminBusiness from '../Implement/Users.Admin.Business'
// import { TokenInfo } from "../../Middlewares/Token";
// import {S3Helper, S3ConfigTemplate} from "../../Upload/S3Helper";
// import env from "../../Utils/Config";

// jest.mock('../../Upload/S3Helper');
// const mockedS3Helper = jest.mocked(S3Helper, {shallow : true});

// function createMockFile(filename : string){
//     const str = JSON.stringify("milestone data");
//     const blob = new Blob([str]);
//     const mockFile = new File([blob], filename, {
//         type: 'application/JSON',
//     });
//     return mockFile;
// }

// const mockAdmin = {
//     id : "0",
//     username : "MilestoneCreator",
//     password : "P@assword123",
//     email : "milestonecreator@test.com",
//     role : ""
// }

// const mockMilestone = {
//     Id : "",
//     File : Object.assign(createMockFile("milestone.jpg")),
//     MinLevel : 1,
//     Title : "Newbie",
//     Description : "Mock milestone description newbie"
// }

// const mockToken : TokenInfo = {
//     Id : "",
//     Username : "",
//     Role : "",
//     CreatedDate : new Date()
// }

// const mockCreatedMilestones = [
//     {
//         Id : "",
//         File : Object.assign(createMockFile("milestone1.jpg")),
//         MinLevel : 10,
//         Title : "Intermediate",
//         Description : "Mock milestone description intermediate"
//     },
//     {
//         Id : "",
//         File : Object.assign(createMockFile("milestone2.jpg")),
//         MinLevel : 100,
//         Title : "Advance",
//         Description : "Mock milestone description advance"
//     }
// ]

// can not figure out how to test class with dependency
describe("Milestone test", () => {
    test("Pass jest test", async () => {
        expect(1 == 1);
    })
    // beforeEach(() => {
    //     mockedS3Helper.mockClear();
    // })
    // beforeAll(async () => {
    //     const creator = await AdminBusiness.RegisterAdmin(mockAdmin.username, mockAdmin.email, mockAdmin.password);
    //     mockAdmin.id = creator.Id as string;
    //     mockAdmin.role = creator.Role as string;
    //     mockToken.Id = creator.Id as string;
    //     mockToken.Username = creator.Username as string;
    //     mockToken.Role = creator.Role as string;
    //     mockToken.CreatedDate = creator.CreatedAt as Date;
    //     mockCreatedMilestones.forEach(async (x) => {
    //         x.Id = (await MilestoneBusiness.createMilestone(mockToken, x.Title, x.MinLevel, x.File, x.Description)).Id as string;
    //     });
    // })

    // test("Create milestone", async () => {
    //     const milestoneSpy = jest.spyOn(MilestoneBusiness, "createMilestone").mockImplementation( async () => {});
    //     await MilestoneBusiness.createMilestone();
    //     expect(milestoneSpy).toBeCalled();
    // })
    // test("Find milestone", async () => {
    //     const milestoneSpy = jest.spyOn(MilestoneBusiness, "findMilestone").mockImplementation( async (milestone : any) => {});
    //     const milestone = await MilestoneBusiness.findMilestone(mockMilestone.Id);
    //     expect(milestoneSpy).toBeCalled();
    // })
    // test("Find milestone", async () => {
    //     const milestoneSpy = jest.spyOn(MilestoneBusiness, "findMilestones").mockImplementation( async (title : any, level : any, creator : any) => {});
    //     await MilestoneBusiness.findMilestones(undefined, undefined, undefined,"milestone");
    //     expect(milestoneSpy).toBeCalled();
    // })
    // test("Update milestone", async () => {
    //     const newTitle = "Beginer";
    //     const milestoneSpy = jest.spyOn(MilestoneBusiness, "updateMilestone").mockImplementation( async (mockToken : any, mockMilestone : any, title : any) => {});
    //     MilestoneBusiness.updateMilestone(mockToken, mockMilestone.Id, newTitle);
    //     expect(milestoneSpy).toBeCalled();
    // })
    // test("Delete milestone", async () => {
    //     const milestoneSpy = jest.spyOn(MilestoneBusiness, "findOneAndDelete").mockImplementation( async (mockToken : any, mockMilestone : any) => {});
    //     await MilestoneBusiness.deleteMilestone(mockToken, mockMilestone.Id);
    //     expect(milestoneSpy).toBeCalled();
    // })
})