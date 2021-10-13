<h1 align="center">
    Desafio Técnico Trinca
    <h6 align="center">Tecnologias usadas: NodeJS, TypeScript, JavaScript, React e MongoDB</h6>
</h1>

### Notas

O desafio foi dividido em duas pastas com o objetivo de separar as atribuições do *Backend* e do *Frontend*.

### Executanto o Backend

Entre na pasta ```backend``` e instale as dependências com o comando ```npm install```, no arquivo ```.env``` estão as configurações padrão do servidor e banco de dados, que são:

```
    PORT=3333
    DATABASE_URL='mongodb://127.0.0.1:27017/churras'
    TOKEN_SECRET='desafio trinca'
```

Para executar o servidor execute o comando ```npm run dev:server``` para iniciar o servidor de desenvolvimento ou execute o comando ```npm start``` para fazer o building do TypeScript e iniciar o servidor.

### Executando o Frontend

Entre na pasta ```frontend``` e instale as dependências com o comando ```npm install```, caso tenha alterado o endereço/porta do servidor backend altere o arquivo no caminho ```./src/services/api.js``` e execute o comando ```npm start``` e pronto o desafio estará rodando!