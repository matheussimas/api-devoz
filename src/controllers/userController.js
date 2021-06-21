const Router = require('koa-router');
const PORT = process.env.PORT || 3000;

const router = new Router();

users = [];

//rota simples pra testar se o servidor está online
router.get('/', async (ctx) => {
    ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
});

//Uma rota de exemplo simples aqui.
//As rotas devem ficar em arquivos separados, /src/controllers/userController.js por exemplo
router.get('/users', async (ctx) => {
    ctx.status = 200;
    ctx.body = { total: users.length, rows: users }
});

//cria o usuario raupp
router.post('/user', async (ctx) => {
    const { nome, email, idade } = ctx.request.body;
    const isValidUser = nome && email && idade;

    if (!isValidUser) {
        ctx.body = { msg: 'Invalid user (missing parameters)' };
        ctx.status = 400;
        return
    }

    const body = ctx.request.body;
    users.push(body);
    ctx.status = 201;
});

router.get('/user/:user', async (ctx) => {
    const userParams = ctx.params.user;
    const user = users.find(user => user.nome === userParams)

    if (user === undefined) {
        ctx.body = { msg: 'User not found' };
        ctx.status = 404;
        return
    }

    ctx.body = user;
});

router.delete('/user/:user', async (ctx) => {
    const userToDel = ctx.params.user;
    users = users.filter(user => user.nome !== userToDel);

    if (userToDel === undefined) {
        ctx.body = { msg: 'User not found' };
        ctx.status = 404;
        return
    }
    ctx.status = 200;
});

for (i = 1; i < 6; i++) {
    users.push({ nome: `nome${i}`, email: `email${i}@email.com`, idade: 20 })
};

module.exports = router;