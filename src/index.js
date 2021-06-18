//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
const router = require('./controllers/userController')
const PORT = process.env.PORT || 3000;
const bodyParser = require('koa-body-parser');

const Koa = require('koa');
const koa = new Koa();

koa
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

const server = koa.listen(PORT, () => { console.log(`Listening on ${PORT}`) });

module.exports = server;