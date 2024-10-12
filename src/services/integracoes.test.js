import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { buscaTransacoes } from './transacoes'
import App from '../paginas/Principal/App'

describe('Requisições para API', () => {
    test('Deve retornar uma lista de transações', async () => {
        const transacoes = await buscaTransacoes()

        expect(transacoes).toHaveLength(3)

        render(<App />, { wrapper: BrowserRouter })

        const transacao = await screen.findAllByText('Novembro')

        transacao.forEach((transacao) => expect(transacao).toBeInTheDocument())
    })
})
