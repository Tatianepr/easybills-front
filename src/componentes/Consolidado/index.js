import './consolidado.css'

import { LancamentoContext } from '../../contexts/LancamentoContext';
import { useContext } from 'react';

const Consolidado = () => {

    const { dadosConsolidados } = useContext(LancamentoContext);
 
    //console.log(dadosConsolidados);


    return (
        <section className='Consolidado'>
            <>
                <div >
                    <table>
                        <thead>
                            <tr>
                                <td >
                                    <div >
                                        Saldo atual:
                                    </div>
                                    <div className='Consolidado-fonte'>
                                    {dadosConsolidados.SaldoM}
                                    </div>

                                </td>
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
                                    <div>Receitas</div>
                                    <div className='Consolidado-fonte'>
                                    {dadosConsolidados.receita}
                                    </div>
                                </td>
                                <td><img src="/imagens/receita.svg" width="50px" /> 
                                </td>
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
                                    <div>Despesas</div>
                                    <div className='Consolidado-fonte'>
                                    {dadosConsolidados.gasto}
                                    </div>
                                </td>
                                <td><img src="/imagens/despesa.svg" width="50px" /> </td>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>

                </div>
            </>
        </section >
    )

}

export default Consolidado