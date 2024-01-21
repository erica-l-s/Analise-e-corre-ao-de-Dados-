const fs = require('fs')

// Este código lê o arquivo corrompido, realiza as correções necessárias nos nomes dos veículos e marcas,
// converte os valores de vendas para o tipo number, e exporta os dados corrigidos para um novo arquivo JSON.

function lerArquivo(nomeArquvivo){
    try{
        const dados = fs.readFileSync(nomeArquvivo, 'utf8')
        return JSON.parse(dados)
    }catch(error){
        console.error(`Erro ao ler o arquivo ${nomeArquvivo} : ${error.message}`)
        return null
    }
}

function corrigirNomes(dados) {
    //  Essa função corrige os nomes dos veiculos e marca que estão corrompidas trocando o /æ/ por 'a' e /ø/ por 'o'
    return dados.map(registro => {
        if (registro.nome) {
            registro.nome = registro.nome.replace(/æ/g, 'a').replace(/ø/g, 'o')
        }
        if (registro.marca) {
            registro.marca = registro.marca.replace(/æ/g, 'a').replace(/ø/g, 'o')
        }
        return registro
    })

}

function corrigirValoresVenda(dados) {
    // essa função mudará os valores que estao em forma de string para os valores tipo number
    return dados.map(registro => {
        if (typeof registro.vendas === "string") {
            registro.vendas = parseFloat(registro.vendas.replace(',', '.')) //esse codigo é pra corrigir possiveis espaços indesejados 
        }
        return registro
    })

}

function exportarArquivo(arquivoSaida, dados) {
    try {
       fs.writeFileSync(arquivoSaida, JSON.stringify(dados, null, 2))
        console.log(`Os dados foram exportados com sucesso ${arquivoSaida}`)
    } catch (error) {
        console.log(`Erro ao exportar o arquivo${arquivoSaida}: ${error.message}`)
    }
}

function corrigirBD(nomeArquivoEntrada, nomeArquivoSaida){
 const dadosCorrompidos = lerArquivo(nomeArquivoEntrada)

 if(!dadosCorrompidos){
    return;
 }
 const dadosCorrigidoNomes = corrigirNomes(dadosCorrompidos)
 const dadosCorrigidoValores = corrigirValoresVenda(dadosCorrigidoNomes)

 exportarArquivo(nomeArquivoSaida, dadosCorrigidoValores)
}

const nomeArquivoEntrada1 = 'broken_database_1.json'
const nomeArquivoSaida1 = 'fixed_database_1.json'
corrigirBD(nomeArquivoEntrada1, nomeArquivoSaida1)

const nomeArquivoEntrada2 = 'broken_database_2.json'
const nomeArquivoSaida2 = 'fixed_database_2.json'

corrigirBD(nomeArquivoEntrada2, nomeArquivoSaida2)