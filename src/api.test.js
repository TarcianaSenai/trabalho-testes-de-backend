const request = require("supertest");
const app = require("./api.js")
const {users} = require('./bankService.js')

describe("Testes da API POST /transfer", () => {

    beforeEach(() => {
        users[0].balance = 1000;
        users[1].balance = 500;
    });

    test("Deve retornar 200 em uma transferência válida", async () => {
        const response = await request(app)
            .post("/transfer")
            .send({ senderId: 1, receiverId: 2, amount: 200 });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);

        expect(users[0].balance).toBe(800);
        expect(users[1].balance).toBe(700);
    });

    test("Deve retornar 400 quando faltar algum campo (ou o body vazio)", async () => {
        const response = await request(app)
            .post("/transfer")
            .send({ senderId: 1, receiverId:2 }); 

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Dados incompletos");
    });


    test("Deve retornar 404 quando o usuário não existir", async () => {
        const response = await request(app)
            .post("/transfer")
            .send({ senderId: 999, receiverId: 2, amount: 50 });

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe("Usuário não encontrado");
    });

     test("Deve retornar 400 em saldo insuficiente", async () => {
        const response = await request(app)
            .post("/transfer")
            .send({ senderId: 1, receiverId: 2, amount: 5000 });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Saldo insuficiente");
    });

    test("Deve retornar 400 em valor inválido (zero ou negativo)", async () => {
        const response = await request(app)
            .post("/transfer")
            .send({ senderId: 1, receiverId: 2, amount: 0 });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Valor inválido");
    });
})