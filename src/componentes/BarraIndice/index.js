import { useEffect, useState } from 'react'
import './BarraIndice.css'

const BarraIndice = () => {

    const [dolar, setDolar] = useState([])
    const [euro, setEuro] = useState([])
    const [bit, setBit] = useState([])

    useEffect(() => {
        const apiUrl = `https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL`;
        fetch(apiUrl, { method: 'get' })
            .then((res) => res.json())
            .then((resultado) => {
                // Resgata os índices para serem exibidos
                setDolar(parseFloat(resultado.USDBRL.bid).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
                setEuro(parseFloat(resultado.EURBRL.bid).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
                setBit(parseFloat(resultado.BTCBRL.bid).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, []);  // O segundo argumento [] garante que o efeito só seja executado uma vez, sem dependências



    return (
        <section className='BarraStatus'>
            <div>
                <table>
                    <thead>
                        <tr>
                            <td><img src="/imagens/dolar.svg" /> </td>
                            <td></td>
                            <td>Dólar: {dolar}</td>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div >
            <div >
                <table>
                    <thead>
                        <tr>
                            <td><img src="/imagens/euro.svg" /> </td>
                            <td></td>
                            <td>Euro: {euro}</td>

                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>

            </div >
            <div>
                <table>
                    <thead>
                        <tr>
                            <td><img src="/imagens/bitcoin.svg" /> </td>
                            <td></td>
                            <td>Bitcoin: {bit}</td>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div >

        </section>
    )

}

export default BarraIndice