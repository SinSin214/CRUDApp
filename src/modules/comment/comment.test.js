const express = require("express");
const commentRoute = require("./comment.route");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/comments", commentRoute);
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        errorCode: error.status || 500,
        message: error.message || "Internal Server Error",
    });
});
const request = require("supertest")(app);

let datetime = Date.now().toString();

describe("GET /comment/getAllCommentOfArticle/:articleId", () => {
    test("should show all comments of article", async () => {
        const res = await request.get("/comments/getAllCommentOfArticle/1");

        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining("json"));
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    Content: expect.any(String),
                    UserId: expect.any(Number),
                    ArticleId: expect.any(Number),
                }),
            ])
        );
    });
});

describe("POST /comments", () => {
    it("should success", async () => {
        const res = await request.post("/comments").send({
            Content: "Comment",
            UserId: 1,
            ArticleId: 1,
        });

        expect(res.body.message).toEqual("Comment created");
        expect(res.status).toEqual(200);
    });
});

describe("PUT /comments/:id", () => {
    it("should update comment successfully", async () => {
        const res = await request.put("/comments/1").send({
            Content: "Comment_" + datetime,
            UserId: 1,
        });

        expect(res.body.message).toEqual("Comment updated");
        expect(res.status).toEqual(200);
    });

    it("should update comment successfully", async () => {
        const res = await request.put("/comments/1").send({
            Content: "Comment_" + datetime,
            UserId: 2,
        });
        expect(res.status).toEqual(500);
        expect(res.body.message).toEqual("You can only update your Comment");
    });
});

describe("DELETE /comments/:id", () => {
    it("should delete comment successfully", async () => {
        const res = await request.delete("/comments/2").send({
            UserId: 1,
        });

        expect(res.body.message).toEqual("Comment deleted");
        expect(res.status).toEqual(200);
    });

    it("should not delete", async () => {
        const res = await request.delete("/comments/1").send({
            UserId: 10,
        });

        expect(res.status).toEqual(500);
        expect(res.body.message).toEqual("You can only delete your Comment");
    });
});
