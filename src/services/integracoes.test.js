import api from './api'
import { buscaTransacoes, salvaTransacao } from './transacoes'

jest.mock('./api')

const mockTransacao = [
    {
        id: 1,
        transacao: 'Depósito',
        valor: '100',
        data: '22/11/2022',
        mes: 'Novembro',
    },
]

const mockRequisicao = (retorno) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: retorno,
            })
        }, 200)
    })
}

const mockRequisicaoErro = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject()
        }, 200)
    })
}

const mockRequisicaoPost = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 201,
            })
        }, 200)
    })
}

const mockRequisicaoPostErro = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject()
        }, 200)
    })
}

describe('Requisições para API', () => {
    test('Deve retornar uma lista de transações', async () => {
        api.get.mockImplementation(() => mockRequisicao(mockTransacao))

        const transacoes = await buscaTransacoes()

        expect(transacoes).toEqual(mockTransacao)
        expect(api.get).toHaveBeenCalledWith('/transacoes')
    })

    test('Deve retornar uma lista vazia quando a requisição falhar', async () => {
        api.get.mockImplementation(() => mockRequisicaoErro())

        const transacoes = await buscaTransacoes()

        expect(transacoes).toEqual([])
        expect(api.get).toHaveBeenCalledWith('/transacoes')
    })

    test('Deve retornar um status 201 - (Created) após uma requisição POST', async () => {
        api.post.mockImplementation(() => mockRequisicaoPost())

        const status = await salvaTransacao(mockTransacao[0])

        expect(status).toBe(201)
        expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransacao[0])
    })

    test('Deve retornar uma mensagem de erro ao falhar uma requisição POST', async () => {
        api.post.mockImplementation(() => mockRequisicaoPostErro())

        const status = await salvaTransacao(mockTransacao[0])

        expect(status).toBe('Erro na requisição')
        expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransacao[0])
    })
})
