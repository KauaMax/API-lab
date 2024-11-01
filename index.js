import express from "express"; 
import {Produto} from "./banco_de_dados/conexao_com_sequelize.js" 
import path from "path";

const __dirname = path.resolve();
const server = express();

server.get("/produto/:nome/:tipo/:quantidade/:descricao", (req, res) => {
    res.send({
      nome: req.params.nome,
      preco: req.params.tipo,
      quantidade: req.params.quantidade,
      descricao: req.params.descricao
    })
});


server.get("/produto", (req, res) => {
    Produto.findAll()
      .then(dados => {
        res.json(dados);
      })
      .catch(erro => {
        console.log("erro ao pegar produtos: ", erro)
      })
});


server.get("/consulta/:id", (req, res) => {
    let idDigitado = req.params.id;
    Produto.findOne({ where: {id: idDigitado}})
      .then(dados => {
        res.json(dados);
      })
      .catch(erro => {
        console.log("erro ao achar o produto com id")
      })
});


server.get("/html", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "index.html")); // Usa path.join para construir o caminho
});

server.listen(3333, () => {
    console.log("------------------------")
    console.log("PORTA: 3333");
    console.log("------------------------")
    console.log("Conexão com o server: ok");
    console.log("------------------------")
});

//EXEMPLO DE INSERT:
// Usuario.create({
//     nome: 'João',
//     email: 'joao@example.com',
//     idade: 25
//   }).then(usuario => {
//     console.log('Usuário criado:', usuario);
//   }).catch(error => {
//     console.log('Erro ao criar usuário:', error);
//   });

//EXEMPLO DE UPDATE:
// Usuario.update(
//     { idade: 26 }, // Dados a serem atualizados
//     { where: { id: 1 } } // Condição para encontrar o registro
//   ).then(result => {
//     console.log('Registros atualizados:', result);
//   }).catch(error => {
//     console.log('Erro ao atualizar:', error);
//   });

//EXEMPLO DE DELETE:
// Usuario.destroy({
//     where: { id: 1 } // Condição para encontrar o registro a ser deletado
//   }).then(() => {
//     console.log('Usuário deletado');
//   }).catch(error => {
//     console.log('Erro ao deletar:', error);
//   });
