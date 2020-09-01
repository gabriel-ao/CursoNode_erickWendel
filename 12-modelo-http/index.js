const http = require('http')

http
  .createServer((request, response) => {
    response.end('hello world')
  })
  .listen(5000, () => console.log('o servidos esta rodando!!'))
