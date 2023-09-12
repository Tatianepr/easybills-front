import { useEffect, useState } from 'react'
import './indices.css'

const Indices = () => {

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
        <section className='indices'>
            <div>
                <table>
                    <thead>

                        <tr>
                            <td><h4>Dólar: {dolar}</h4></td>
                            <td></td>
                        <td><img src="/imagens/dolar.svg" /> </td>
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
                            <td><h4>Euro: {euro}</h4></td>
                        <td></td>
                        <td><img src="/imagens/euro.svg" /> </td>
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
                            <td><h4>Bitcoin: {bit}</h4>
                                
                            </td>
                            <td></td>
                            <td><img src="/imagens/bitcoin.svg" /> </td>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div >

        </section>
    )

}

export default Indices