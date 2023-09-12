import './consolidado.css'
import { useEffect, useState } from 'react'

const Consolidado = () => {

    const [receitas, setReceitas] = useState([])
    const [gastos, setGastos] = useState([])
    const [saldo, setSaldo] = useState([])


    //const [euro, setEuro] = useState([])

    useEffect(() => {
        const apiUrl = `http://192.168.15.5:5001/saldo`;
        fetch(apiUrl, { method: 'get' })
            .then((res) => res.json())
            .then(resultado => {
                // Atualiza o estado "lancamentos" após a exclusão bem-sucedida
                /*setReceitas(resultado.total_receitas);
                setGastos(resultado.saldo_pago);
                setSaldo(resultado.saldo_mes);*/
                //console.log(resultado);
                setReceitas(parseFloat(resultado.total_receitas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
                setGastos(parseFloat(resultado.saldo_pago).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
                setSaldo(parseFloat(resultado.saldo_mes).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, []);  // O segundo argumento [] garante que o efeito só seja executado uma vez, sem dependências


    return (
        <section className='Consolidado'>  
            <div >
                <table>
                    <thead>
                        <tr>
                            <td>
                                Saldo atual
                                <h3>{saldo}</h3>
                            </td>
                            <td></td>
                            <td><img src="/imagens/saldo.svg" width="50px" /> </td>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <div >
                <table>
                    <thead>
                        <tr>
                            <td>
                                Receitas: <h3>{receitas}</h3>
                                
                            </td>
                            <td></td>
                            <td><img src="/imagens/receita.svg" width="50px" /> </td>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <div >
                <table>
                    <thead>
                        <tr>
                            <td>
                                Despesas
                                <h3>{gastos}</h3>
                            </td>
                            <td></td>
                            <td><img src="/imagens/despesa.svg" width="50px" /> </td>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        
        </section>
    )

}

export default Consolidado