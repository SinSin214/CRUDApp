const app = require('../../app');
const request = require('supertest');

let datetime = Date.now().toString();

describe('GET /user', () => {
    test('should show all users', async () => {
        const res = await request(app).get('/users');
        expect(res.type).toEqual(expect.stringContaining('json'));
    });
});

describe('GET /user/:id', () => {
    it('should show user info based on Id', async () => {
        const res = await request(app).get('/users/22');

        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body.UserName).toEqual('User_1654745415352');
    });

    it('should not found user', async () => {
        const res = await request(app).get('/users/1000');

        expect(res.status).toEqual(500);
        expect(res.body.message).toEqual('User not found');
    });
});

describe('POST /user', () => {
    it('should return that existed username', async () => {
        const res = await request(app).post('/users')
            .send({
                username: "User_1654745415352",
                password: "1234"
            });
        expect(res.status).toEqual(500);
        expect(res.body.message).toEqual("Username is already registered");
    });

    it('should create user successfully', async () => {
        const res = await request(app).post('/users')
            .send({
                username: "User_" + datetime,
                password: "1234"
            });
            
        
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('User created');
    })
});

describe('PUT /user/:id', () => {
    it('should update user successfully', async () => {
        const res = await request(app).put('/users/22')
            .send({
                password: datetime
            });
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('User updated');
    });

    it('should return that Old and New password is the same', async () => {
        const res = await request(app).put('/users/23')
            .send({
                password: "1234"
            });

        expect(res.status).toEqual(500);
        expect(res.body.message).toEqual('New and Old password cannot be same');
    });
});

describe('DELETE /user', () => {
    it('should delete user successfully', async () => {
        const res = await request(app).delete('/users/26')

        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual("User deleted");
    });

    it('should not found user', async () => {
        const res = await request(app).delete('/users/1000')

        expect(res.status).toEqual(500);
        expect(res.body.message).toEqual("User not found");
    })
});