const app = require("../../../app");
const request = require("supertest")(app);

// let datetime = Date.now().toString();

// describe("GET /user", () => {
//     it("should show all users", async () => {
//         const res = await request.get("/users");
//         expect(res.type).toEqual(expect.stringContaining("json"));
//     });
// });

describe("GET /user/:id", () => {
    it("should show user info based on Id", async () => {
        const res = await request
            .get("/users/4")
            .set(
                "Authorization",
                "Bearer " +
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjQsImlhdCI6MTY1NTA4ODA1OCwiZXhwIjoxNjU1MTc0NDU4fQ.I-1G4z2YyLD-lzW6KSSIDvpbPTOkzY5Vv61Ct0vLua8"
            );

        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining("json"));
        expect(res.body.UserName).toEqual("User_3");
    });

    it("should not found user", async () => {
        const res = await request
            .get("/users/1000")
            .set(
                "Authorization",
                "Bearer " +
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjQsImlhdCI6MTY1NTA4ODA1OCwiZXhwIjoxNjU1MTc0NDU4fQ.I-1G4z2YyLD-lzW6KSSIDvpbPTOkzY5Vv61Ct0vLua8"
            );
        expect(res.body.ErrorCode).toEqual(500);
        expect(res.body.Message).toEqual("User not found");
    });

    it("wrong token", async () => {
        const res = await request
            .get("/users/4")
            .set(
                "Authorization",
                "Bearer " +
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjQsImlhdCI6MTY1NTA4ODA1OCwiZXhwIjoxNjU1MTc0NDU4fQ.I-1G4z2YyLD-lzW6KSSIDvpbPTOkzY5Vv61Ct0vLua"
            );

        expect(res.body.ErrorCode).toEqual(500);
    });
});

// describe("POST /user", () => {
//     it("should return that existed username", async () => {
//         const res = await request.post("/users").send({
//             username: "User_1654745415352",
//             password: "1234",
//         });
//         expect(res.status).toEqual(500);
//         expect(res.body.message).toEqual("Username is already registered");
//     });

//     it("should create user successfully", async () => {
//         const res = await request
//             .post("/users")
//             .send({
//                 username: "User_" + datetime,
//                 password: "1234",
//             });

//         expect(res.status).toEqual(200);
//         expect(res.body.message).toEqual("User created");
//     });
// });

// describe("PUT /user/:id", () => {
//     it("should update user successfully", async () => {
//         const res = await request.put("/users/22").send({
//             password: datetime,
//         });
//         expect(res.status).toEqual(200);
//         expect(res.body.message).toEqual("User updated");
//     });

//     it("should return that Old and New password is the same", async () => {
//         const res = await request.put("/users/23").send({
//             password: "1234",
//         });

//         expect(res.status).toEqual(500);
//         expect(res.body.message).toEqual("New and Old password cannot be same");
//     });
// });

// describe("DELETE /user", () => {
//     it("should delete user successfully", async () => {
//         const res = await request.delete("/users/26");

//         expect(res.status).toEqual(200);
//         expect(res.body.message).toEqual("User deleted");
//     });

//     it("should not found user", async () => {
//         const res = await request.delete("/users/1000");

//         expect(res.status).toEqual(500);
//         expect(res.body.message).toEqual("User not found");
//     });
// });
