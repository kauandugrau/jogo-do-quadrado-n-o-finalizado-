// class Pessoa{
// constructor(n, s, i, c,){
//     this.nome = n;
//     this.sobrenome = s;
//     this.idade = i;
//     this.cpf = c

// }

// }

// let pessoa1 = new Pessoa('kauan','alysson',17, 'cpf')
// console.log(pessoa1)
// let pessoa2 = new Pessoa('liandro','pessoal',89, 'cpf')
// console.log(pessoa2)

// class Aluno extends Pessoa{
//     constructor(nome, sobrenome,idade,cpf, turma){
//     super(nome,sobrenome,idade,cpf)
//     this.turma = turma
// }
// }
// let aluno = new Aluno ('roberto', 'alves',78,'cpf')

// class Veiculo{
//     constructor (tipo, marca, cor, velocidade, passageiros){
//         this.tipo = tipo;
//         this.marca = marca;
//         this.cor = cor;
//         this.velocidade = velocidade;
//         this.passageiros = passageiros
//     }
//     acelerar (){
//         this.velocidade += 10,
//         console.log('vrum, vrummmm')
// }
// freiar (){
//     this.velocidade -= 5,
//     console.log('niiiiiiiiiiiiiiiiii')
// }
// apresentar() {
//     console.log(`O ${this.tipo} de marca ${this.marca} esta a ${this.velocidade} km/h`)
// }


// }
// let carro1 = new Veiculo('carro','renault', 'preto', 0,0)
// let carro2 = new Veiculo('carro','bmw', 'vermelho', 0,0)
// carro1.apresentar()
// carro2.apresentar()
// carro1.freiar()
// carro1.apresentar()
// carro1.acelerar()
// carro1.apresentar()
// carro2.apresentar()



class Veiculo {
    #velocidade
    constructor(nome, velocidade) {
        
        this.nome = nome;
        this.#velocidade = velocidade;
    }

    exibirInfo() {
        console.log(`${this.nome} esta andando a ${this.#velocidade} mangos por hora`);
    }
    get velocidade(){
        return this.#velocidade
    
    }
    set velocidade(valor){
this.#velocidade += valor
    }
}

class Carro extends Veiculo {
    constructor(nome, velocidade, portas) {
        super(nome, velocidade);
        this.portas = portas;
    }

    exibirInfo() {
        console.log(`${this.nome} (Carro) tem ${this.portas} portas e está a ${this.velocidade} km/h.`);
    }
}

class Barco extends Veiculo {
    constructor(nome, velocidade, tipo) {
        super(nome, velocidade);
        this.tipo = tipo;
    }

    exibirInfo() {
        console.log(`${this.nome} (Barco) do tipo ${this.tipo} está navegando a ${this.velocidade} km/h.`);
    }
  
    }


class Aviao extends Veiculo {
    constructor(nome, velocidade, capacidade) {
        super(nome, velocidade);
        this.capacidade = capacidade;
    }

    exibirInfo() {
        console.log(`${this.nome} (Avião) tem capacidade para ${this.capacidade} passageiros e está voando a ${this.velocidade} km/h.`);
    }
}


const carro1 = new Carro("lambasguino", 80, 4);
const barco2 = new Barco("lancha Rápida", 50, "lancha");
const aviao3 = new Aviao("boeing 747", 900, 416);


carro1.exibirInfo()
barco2.exibirInfo()
aviao3.exibirInfo()
