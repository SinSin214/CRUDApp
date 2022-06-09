const app = require('../../app');
const request = require('supertest');

let datetime = Date.now().toString();

describe('GET /comment/getAllCommentOfArticle/:articleId', () => {
    test('should show all users', async () => {
        const res = await request(app).get('/comments/getAllCommentOfArticle/1');

        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                Content: expect.any(String),
                UserId: expect.any(Number),
                ArticleId: expect.any(Number)
            })
        ]));
    });

    test('should show all users', async () => {
        const res = await request(app).get('/comments/getAllCommentOfArticle/10');

        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body.length).toEqual(0);
    });
});

describe('POST /comments', () => {
    it('should success', async () => {
        const res = await request(app).post('/comments')
            .send({
                Content: "Comment",
                UserId: 1,
                ArticleId: 1
            });
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual("Comment created");
    });
});

describe('PUT /comments/:id', () => {
    it('should update comment successfully', async () => {
        const res = await request(app).put('/comments/1')
            .send({
                Content: "Comment_" + datetime,
                UserId: 1,
            });
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('Comment updated');
    });

    it('should update comment successfully', async () => {
        const res = await request(app).put('/comments/1')
            .send({
                Content: "Comment_" + datetime,
                UserId: 2,
            });
        expect(res.status).toEqual(500);
        expect(res.body.message).toEqual('You can only update your Comment');
    });
});

describe('DELETE /comments/:id', () => {
    it('should delete comment successfully', async () => {
        const res = await request(app).delete('/comments/2')
            .send({
                UserId: 1
            })

        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual("Comment deleted");
    });

    it('should not delete', async () => {
        const res = await request(app).delete('/comments/1')
            .send({
                UserId: 10
            })

        expect(res.status).toEqual(500);
        expect(res.body.message).toEqual("You can only update your Comment");
    })
});