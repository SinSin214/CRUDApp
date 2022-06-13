const app = require("../../../app");
const request = require("supertest")(app);

// let datetime = Date.now().toString();

describe("GET /articles", () => {
    it("should show article by id", async () => {
        const res = await request.get("/articles/1");

        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining("json"));
        expect(res.body).toEqual(
            expect.objectContaining({
                Title: expect.any(String),
                UserId: expect.any(Number),
            })
        );
    });

    it("should not found article", async () => {
        const res = await request.get("/articles/1000");

        expect(res.status).toEqual(500);
        expect(res.body.message).toEqual("Article not found");
    });
});

// describe("POST /articles", () => {
//     it("should return that existed Title", async () => {
//         const res = await request.post("/articles").send({
//             Title: "Title_1",
//             Summary: "Summary",
//             Content: "Content",
//             UserId: 22,
//         });
//         expect(res.status).toEqual(500);
//         expect(res.body.message).toEqual("Article already existed this title");
//     });

//     it("should create article successfully", async () => {
//         const res = await request
//             .post("/articles")
//             .send({
//                 Title: "Title_" + datetime,
//                 Summary: "Summary",
//                 Content: "Content",
//                 UserId: 22,
//             });

//         expect(res.status).toEqual(200);
//         expect(res.body.message).toEqual("Article created");
//     });
// });

// describe("PUT /articles/:id", () => {
//     it("should update article successfully", async () => {
//         const res = await request
//             .put("/articles/5")
//             .send({
//                 Title: "Title_" + datetime,
//                 Summary: "Summary",
//                 Content: "Content",
//                 UserId: 22,
//             });
//         expect(res.status).toEqual(200);
//         expect(res.body.message).toEqual("Article updated");
//     });

//     it("should return that Title existed", async () => {
//         const res = await request.put("/articles/6").send({
//             Title: "Title_1",
//             Summary: "Summary",
//             Content: "Content",
//             UserId: 1,
//         });

//         expect(res.status).toEqual(500);
//         expect(res.body.message).toEqual("Article already existed this title");
//     });

//     it("should return that not Article of User", async () => {
//         const res = await request.put("/articles/1").send({
//             Title: "Title_134",
//             Summary: "Summary",
//             Content: "Content",
//             UserId: 22,
//         });

//         expect(res.status).toEqual(500);
//         expect(res.body.message).toEqual(
//             "Cannot update Article of another User"
//         );
//     });
// });

// describe("DELETE /articles/:id", () => {
//     it("should delete article successfully", async () => {
//         const res = await request.delete("/articles/7").send({
//             UserId: 22,
//         });

//         expect(res.status).toEqual(200);
//         expect(res.body.message).toEqual("Article deleted");
//     });

//     it("should not found article", async () => {
//         const res = await request.delete("/articles/1000").send({
//             UserId: 10,
//         });

//         expect(res.status).toEqual(500);
//         expect(res.body.message).toEqual("Article not found");
//     });

//     it("should return cannot delete article of another user", async () => {
//         const res = await request.delete("/articles/6").send({
//             UserId: 1,
//         });

//         expect(res.status).toEqual(500);
//         expect(res.body.message).toEqual(
//             "Cannot delete Article of another User"
//         );
//     });
// });

// describe("POST /articles/getAllArticleOfUser", () => {
//     it("should return array of articles belong user", async () => {
//         const res = await request
//             .post("/articles/getAllArticleOfUser")
//             .send({
//                 UserId: 22,
//             });
//         expect(res.status).toEqual(200);
//         expect(res.type).toEqual(expect.stringContaining("json"));
//         expect(res.body).toEqual(
//             expect.arrayContaining([expect.objectContaining({ UserId: 22 })])
//         );
//     });

//     it("should return no articles belong user", async () => {
//         const res = await request
//             .post("/articles/getAllArticleOfUser")
//             .send({
//                 UserId: 10,
//             });
//         expect(res.status).toEqual(200);
//         expect(res.type).toEqual(expect.stringContaining("json"));
//         expect(res.body.length).toEqual(0);
//     });
// });
