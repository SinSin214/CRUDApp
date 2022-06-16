const express = require("express");
const userRoute = require("./user.route");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoute);
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        errorCode: error.status || 500,
        message: error.message || "Internal Server Error",
    });
});
const request = require("supertest")(app);
const constant = require("../../static/constant");

let datetime = Date.now().toString();
let token = constant.TOKEN;

describe("GET /user", () => {
    it("should show all users", async () => {
        const res = await request.get("/users");
        expect(res.type).toEqual(expect.stringContaining("json"));
    });
});

describe("GET /user/:id", () => {
    it("should show user info based on Id", async () => {
        const res = await request.get("/users/4");

        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining("json"));
        expect(res.body.UserName).toEqual("User_3");
    });

    it("should not found user", async () => {
        const res = await request.get("/users/1000");

        expect(res.status).toEqual(500);
        expect(res.body.message).toEqual("User not found");
    });
});

describe("PUT /user/:id", () => {
    it("should update user successfully", async () => {
        const res = await request.put("/users/4").send({
            password: "" + datetime,
        });

        expect(res.body.message).toEqual("User updated");
        expect(res.status).toEqual(200);
    });

    it("should return that Old and New password is the same", async () => {
        const res = await request.put("/users/6").send({
            password: "abcd",
        });

        expect(res.body.message).toEqual("New and Old password cannot be same");
        expect(res.status).toEqual(500);
    });
});

describe("DELETE /user", () => {
    it("should delete user successfully", async () => {
        const res = await request
            .delete("/users/7")
            .set("Authorization", "Bearer " + token);

        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual("User deleted");
    });

    it("should not found user", async () => {
        const res = await request
            .delete("/users/1000")
            .set("Authorization", "Bearer " + token);

        expect(res.body.message).toEqual("User not found");
        expect(res.status).toEqual(500);
    });
});
