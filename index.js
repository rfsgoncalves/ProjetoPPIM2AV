import express from 'express';
import path from 'path';

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios = [];

function processarCadastroUsuario(requisicao, resposta) {
    // processar os parâmetros da url em http://localhost:3000/cadastraUsuario.html?nome=Renato&sobronome=Gonçalves&nomeUsuario=rgoncalves&cidade=PRESIDENTE+PRUDENTE&uf=SP&cep=19015000
    const usuario = {
        nome: requisicao.query.nome,
        sobrenome: requisicao.query.sobronome,
        nomeUsuario: requisicao.query.nomeUsuario,
        cidade: requisicao.query.cidade,
        uf: requisicao.query.uf,
        cep: requisicao.query.cep
    }
    //adiciona um novo usuário na lista de usuários já cadastrados
    listaUsuarios.push(usuario);
    //retornar a lista de usuários
    let conteudoResposta = `
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>Menu do sistema</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    </head>
    <body>
        <h1>Lista de usuário cadastrados</h1>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Sobronome</th>
                    <th>Nome de usuário</th>
                    <th>Cidade/UF</th>
                    <th>CEP</th>
                </tr>
            </thead>
            <tbody> `;

    for (const usuario of listaUsuarios) {
        conteudoResposta += `
                    <tr>
                        <td>${usuario.nome}</td>
                        <td>${usuario.sobrenome}</td>
                        <td>${usuario.nomeUsuario}</td>
                        <td>${usuario.cidade}/${usuario.uf}</td>
                        <td>${usuario.cep}</td>
                    <tr>
                `;
    }

    conteudoResposta+=`
            </tbody>
        </table>
        <a class="btn btn-primary" href="/" role="button">Voltar ao menu</a>
        <a class="btn btn-primary" href="/cadastraUsuario.html" role="button">Continuar cadastrando</a>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>

    </html>`;
    resposta.end(conteudoResposta);
}

const app = express();

//indicando para a aplicação como servir arquivos estáticos localizados na pasta 'paginas'
app.use(express.static(path.join(process.cwd(),'public')));

app.get('/', (requisicao, resposta) => {
    resposta.end(`
        <!DOCTYPE html>
            <head>
                <meta charset="UTF-8">
                <title>Menu do sistema</title>
            </head>
            <body>
                <h1>MENU</h1>
                <ul>
                    <li><a href="/cadastraUsuario.html">Cadastrar Usuário</a></li>
                </ul>
            </body>
        </html>
    `);
})

//rota para processar o cadastro de usuários endpoint = '/cadastrarUsuario'
app.get('/cadastrarUsuario', processarCadastroUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
});


