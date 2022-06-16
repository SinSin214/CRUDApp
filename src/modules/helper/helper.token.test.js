const {
    generateToken,
    generateRefreshToken,
    verifyToken,
} = require("./helper.token");
const constant = require("../../static/constant");
let userId = 1;
let token = constant.TOKEN;

describe("test function generateToken", () => {
    it("should delete user successfully", async () => {
        const res = generateToken(userId);

        expect(typeof res).toBe("string");
    });
});

describe("test function generateToken", () => {
    it("should delete user successfully", async () => {
        const res = generateRefreshToken(userId);

        expect(typeof res).toBe("string");
    });
});

describe("test function generateToken", () => {
    it("should delete user successfully", async () => {
        const res = verifyToken(token);

        expect(typeof res).toBe("object");
        expect(res).toEqual(
            expect.objectContaining({
                UserId: expect.any(Number),
            })
        );
    });
});
