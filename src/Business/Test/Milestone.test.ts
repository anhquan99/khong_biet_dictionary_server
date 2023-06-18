import { describe, expect, jest, test } from "@jest/globals";
import validator from "validator";

import MilestoneModel from "../../Graphql/Schema/Milestone";
import * as MilestoneBusiness from '../Implement/Milestone.Business'
import * as AdminBusiness from '../Implement/Users.Admin.Business'
import { TokenInfo } from "../../Middlewares/Token";

const mockAdmin = {
    id : "0",
    username : "MilestoneCreator",
    password : "P@assword123",
    email : "milestonecreator@test.com",
    role : ""
}

const mockMilestone = {
    Id : "",
    FileName : "milestone.jpg",
    MinLevel : 1,
    Title : "Newbie",
    Description : "Mock milestone description newbie"
}

const mockToken : TokenInfo = {
    Id : "",
    Username : "",
    Role : "",
    CreatedDate : new Date()
}

const mockCreatedMilestones = [
    {
        Id : "",
        FileName : "milestone1.jpg",
        MinLevel : 10,
        Title : "Intermediate",
        Description : "Mock milestone description intermediate"
    },
    {
        Id : "",
        FileName : "milestone2.jpg",
        MinLevel : 100,
        Title : "Advance",
        Description : "Mock milestone description advance"
    }
]

describe("Milestone test", () => {
    beforeAll(async () => {
        const creator = await AdminBusiness.RegisterAdmin(mockAdmin.username, mockAdmin.email, mockAdmin.password);
        
        mockAdmin.id = creator.Id as string;
        mockAdmin.role = creator.Role as string;

        mockToken.Id = creator.Id as string;
        mockToken.Username = creator.Username as string;
        mockToken.Role = creator.Role as string;
        mockToken.CreatedDate = creator.CreatedAt as Date;

        mockCreatedMilestones.forEach(async (x) => {
            x.Id = (await MilestoneBusiness.createMilestone(mockToken, x.Title, x.MinLevel, x.FileName, x.Description)).Id as string;
        })
    })

    test("Create milestone", async () => {
        const newMilestone = await MilestoneBusiness.createMilestone(mockToken, mockMilestone.Title, mockMilestone.MinLevel, mockMilestone.FileName, mockMilestone.Description);
        mockMilestone.Id = newMilestone.Id as string;
        expect(newMilestone.Title).toBe(mockMilestone.Title);
        expect(newMilestone.FileName).toBe(mockMilestone.FileName);
        expect(newMilestone.MinLevel).toBe(mockMilestone.MinLevel);
        expect(newMilestone.Description).toBe(mockMilestone.Description);
        expect(newMilestone.Creator).toBe(mockAdmin.id);  
    })
    test("Find milestone", async () => {
        const milestone = await MilestoneBusiness.findMilestone(mockMilestone.Id);
        expect(milestone.Title).toBe(mockMilestone.Title);
        expect(milestone.FileName).toBe(mockMilestone.FileName);
        expect(milestone.MinLevel).toBe(mockMilestone.MinLevel);
        expect(milestone.Description).toBe(mockMilestone.Description);
        expect(milestone.Creator).toBe(mockAdmin.id);
    })
    test("Find milestone", async () => {
        const ids = [mockMilestone.Id, mockCreatedMilestones[0].Id, mockCreatedMilestones[1].Id];
        const milestones = await MilestoneBusiness.findMilestones(undefined, undefined, undefined,"milestone");
        milestones.forEach(x => {
            expect(x.Creator).toBe(mockAdmin.id);
            expect(ids.includes(x.Id as string)).toBeTruthy();
        })
    })
    test("Update milestone", async () => {
        const newTitle = "Beginer";
        const updatedMilestone = await MilestoneBusiness.updateMilestone(mockToken, mockMilestone.Id, newTitle);
        expect(updatedMilestone.Title).toBe(newTitle);
    })
    test("Delete milestone", async () => {
        const milestoneSpy = jest.spyOn(MilestoneModel, "findOneAndDelete");
        await MilestoneBusiness.deleteMilestone(mockToken, mockMilestone.Id);
        expect(milestoneSpy).toBeCalledTimes(1);
    })
})