const Router = require('koa-router');
const PORT = process.env.PORT || 3000;

const utils = require('../utils/index')

const router = new Router();

let users = [];

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
    const isValid = utils.isUserValid(ctx.request.body);

    if (!isValid) {
        ctx.body = { msg: 'Invalid user (missing parameters)' };
        ctx.status = 400;
        return
    }

    const body = ctx.request.body;
    users.push(body);
    ctx.status = 201;
});

router.post('/users', async (ctx) => {
    const usersToAdd = ctx.request.body;
    const isAllUsersValid = usersToAdd.every(utils.isUserValid);

    if (!isAllUsersValid) {
        ctx.body = { msg: 'At least one user is invalid' };
        ctx.status = 400;
        return
    }

    users.push(...usersToAdd);
    ctx.status = 201;
});

router.get('/user/:user', async (ctx) => {
    const userParams = ctx.params.user;
    const user = users.find(user => user.nome === userParams)

    if (!user) {
        ctx.body = { msg: 'User not found' };
        ctx.status = 404;
        return
    }

    ctx.body = user;
});

router.delete('/user/:user', async (ctx) => {
    const userToDel = ctx.params.user;
    users = users.filter(user => user.nome !== userToDel);

    if (!userToDel) {
        ctx.body = { msg: 'User not found' };
        ctx.status = 404;
        return
    }
    ctx.status = 200;
});

module.exports = router;