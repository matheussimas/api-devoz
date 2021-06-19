const Router = require('koa-router');
const PORT = process.env.PORT || 3000;

var router = new Router();

const userSchema = {
    title: "Schema do Usuario, define como é o usuario, linha 24 do teste",
    type: "object",
    // required: ['nome', 'email', 'idade'],
    properties: {
        nome: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        idade: {
            type: 'number',
            minimum: 18
        }
    }
}

users = [];

//rota simples pra testar se o servidor está online
router.get('/', async (ctx) => {
    ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
});

//Uma rota de exemplo simples aqui.
//As rotas devem ficar em arquivos separados, /src/controllers/userController.js por exemplo
router.get('/users', async (ctx) => {
    ctx.status = 200;
    ctx.body = { total: 0, count: 0, rows: [] }
});

//cria o usuario raupp
router.post('/user', async (ctx) => {
    ctx.status = 201;
    const body = ctx.request.body;
    users.push(body);
});

router.get('/user/naoExiste', async (ctx) => {
    ctx.status = 404;
    ctx.body = userSchema;
    ctx.body = { msg: "User not found", userSchema };
    // const error = Error("User not found")
    // ctx.app.emit("error", error, ctx);
    // ctx.throw(404, 'User not found');
});




module.exports = router;