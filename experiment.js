import {listTarItems} from './src/index.js'

let result = await listTarItems('./test/mock/mock.tar')
console.log("?")
console.log(result)

result = await listTarItems('./test/mock/mock.tar.br')
console.log("?")
console.log(result)
