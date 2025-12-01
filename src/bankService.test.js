const {users ,bankService} = require('./bankService.js')


describe("Realizando testes com a função transfer", () => {

    beforeEach(() => {
        users[0].balance = 1000; 
        users[1].balance = 500;  
    });

    test("Deve realizar uma tranferência válida (saldo suficiente)", () => {
        const result = bankService.transfer(1, 2, 200);

        expect(result.success).toBe(true);
        expect(users[0].balance).toBe(800); 
        expect(users[1].balance).toBe(700); 
        expect(result.message).toBe("Transferência realizada");
    });

    test("Deve lançar um erro ao tentar transferir com saldo insuficiente", () => {
        expect(() => {
            bankService.transfer(1, 2, 1200);
            }).toThrow("Saldo insuficiente");
    
        expect(users[0].balance).toBe(1000);
        expect(users[1].balance).toBe(500);
    });

    test("Deve lançar um erro ao tentar transferir um valor zerado", () => {
        expect(() => {
            bankService.transfer(1, 2, 0);
            }).toThrow("Valor inválido");
    
        expect(users[0].balance).toBe(1000);
        expect(users[1].balance).toBe(500);
    });

     test("Deve lançar um erro ao tentar transferir um valor negativo", () => {
        expect(() => {
            bankService.transfer(1, 2, -100);
            }).toThrow("Valor inválido");
    
        expect(users[0].balance).toBe(1000);
        expect(users[1].balance).toBe(500);
    });

    test("Deve lançar erro se o remetente não existir", () => {
        expect(() => {
            bankService.transfer(999, 2, 100);
        }).toThrow("Usuário não encontrado");
    });

    test("Deve lançar erro se o destinatário não existir", () => {
        expect(() => {
            bankService.transfer(1, 999, 100);
        }).toThrow("Usuário não encontrado");
    });
});