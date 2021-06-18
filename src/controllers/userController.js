const Router = require('koa-router');
const PORT = process.env.PORT || 3000;

var router = new Router();

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

router.post('/user', async (ctx) => {
    ctx.status = 201;
    const body = ctx.request.body;
    ctx.body = body;
});

module.exports = router;