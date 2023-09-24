import { createContext } from "react";
import { useEffect, useState } from 'react';

export const LancamentoContext = createContext()

const LancamentoContextProvider = (props) => {

    // LOGIN - será usado no futuro
    const logado = 'tatianepr';
    const NomeUsuario = 'Tatiane';

    // ************

    // VARIÁVEIS GERAIS - será melhorado no futuro

    function mesCorrente () {
        let meses = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
          ];
          let dataAtual = new Date();
          let mesCorrente = `${meses[dataAtual.getMonth()]} de ${dataAtual.getFullYear()}`;

          return mesCorrente;
    }

    const [mesConsulta, setMesConsulta] = useState(mesCorrente());
    //console.log(mesConsulta);

    function getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // O mês começa em 0, então somamos 1
        const day = String(currentDate.getDate()).padStart(2, '0');

        // Formate a data no formato YYYY-MM-DD
        return `${year}-${month}-${day}`;
    }

    const mesLancamento = getCurrentDate()

    //******************** *

    // ********** lista de categorias

    const [categorias, setCategorias] = useState([]);

    const BuscaCategoria = (transacao) => {
        useEffect(() => {
            // Aqui você pode fazer a requisição para obter as categorias com base na transação selecionada (transacao)
            if (transacao) {
                fetch(`http://192.168.15.5:5000/categoriastipo?tipo=${transacao}`, { method: 'get' })
                    .then((res) => res.json())
                    .then((resultado) => {
                        setCategorias(resultado.categorias);
                    });
            } else {
                fetch(`http://192.168.15.5:5000/categorias`, { method: 'get' })
                    .then((res) => res.json())
                    .then((resultado) => {
                        setCategorias(resultado.categorias);
                    });
            }
        }, [transacao]);

    }
    BuscaCategoria();


    const CriaCategoria = (tipo, categoria) => {
        const formData = new FormData();

        formData.append('tipo', tipo);
        formData.append('nome', categoria);

        fetch('http://192.168.15.5:5000/categoria', { method: 'post', body: formData })
            .then((response) => {
                if (response.status === 409) {
                    document.getElementById("alerta").innerHTML = "Categoria já existe";
                } else {
                    response.json().then((data) => {
                        const novolance =
                        {
                            id: data.id,
                            tipo: data.tipo,
                            nome: data.nome
                        }
                        setCategorias([...categorias, novolance]);

                        console.log("lista")
                        console.log(categorias)
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    // ****************************************

    // lista os lançamentos do mês 

    const [lancamentos, setLancamentos] = useState([])
    useEffect(() => {
        if ((logado !== null) && !lancamentos.length) {
            fetch(`http://192.168.15.5:5001/mensal?data_vencimento=${mesLancamento}&login=${logado}`, { method: 'get', })
                .then((res) => res.json())
                .then(
                    (resultado) => { setLancamentos(resultado.despesas) }
                )
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
    }, [logado, mesLancamento, lancamentos]);

    // ******************************

    //***********SALDO CONSOLIDADO 

    const [dadosConsolidados, setDadosConsolidados] = useState([]);
    const [atualizarConsolidado, setAtualizarConsolidado] = useState(true);

    useEffect(() => {
        if (atualizarConsolidado && (logado !== null)) {
            //if ( logado !== "") {
            //buscar dados consolidados

            const apiUrl = `http://192.168.15.5:5001/saldo?data_vencimento=${mesLancamento}&login=${logado}`;
            fetch(apiUrl, { method: 'get' })
                .then((res) => res.json())
                .then(resultado => {
                    setDadosConsolidados({
                        receita: parseFloat(resultado.total_receitas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                        gasto: parseFloat(resultado.saldo_pago).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                        SaldoM: parseFloat(resultado.saldo_mes).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                    });
                    setAtualizarConsolidado(false);
                    //console.log(dadosConsolidados);

                })
                .catch((error) => {
                    console.error('Error:', error);
                })

        }
    }, [atualizarConsolidado, logado, mesLancamento, lancamentos])

    //******************* 


    const CriaLancamento = (tipo, categoria, descricao, valor, vencimento) => {
        const formData = new FormData();
        formData.append('tipo', tipo);
        formData.append('descricao', descricao);
        formData.append('categoria_id', categoria);
        formData.append('valor', valor);
        formData.append('data_vencimento', vencimento);
        formData.append('pago', false);
        formData.append('login', logado);

        fetch('http://192.168.15.5:5001/lancamento', { method: 'post', body: formData })
            .then((response) => {
                if (response.status === 409) {
                    document.getElementById("alerta").innerHTML = "Lançamento já existe";
                } else {
                    response.json().then((data) => {
                        const novolance =
                        {
                            categoria_id: data.categoria_id,
                            categoria_nome: data.categoria_nome,
                            data_vencimento: data.data_vencimento,
                            descricao: data.descricao,
                            id: data.id,
                            pago: data.pago,
                            tipo: data.tipo,
                            valor: data.valor,
                            login: data.login
                        }
                        setLancamentos([...lancamentos, novolance]);
                        setAtualizarConsolidado(true);

                        console.log("lista")
                        console.log(lancamentos)
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const ExcluiLancamento = (id) => {
        fetch(`http://192.168.15.5:5001/lancamento?id=${id}`, { method: 'delete' })
            .then((res) => res.json())
            .then(() => {
                // Atualiza o estado "lancamentos" após a exclusão bem-sucedida
                setLancamentos((prevLancamentos) => prevLancamentos.filter((lancamento) => lancamento.id !== id));
                setAtualizarConsolidado(true);
            })
            .catch((error) => {
                console.error('Error:', error);
            })

    }

    const PagaLancamento = (id) => {
        const index = lancamentos.findIndex(lancamento => lancamento.id === id);

        if (index !== -1) {
            fetch(`http://192.168.15.5:5001/paga?id=${id}`, { method: 'put' })
                .then((res) => res.json())
                .then(() => {
                    // Alterna o estado do booleano valor 
                    const updatedLancamentos = [...lancamentos]; // Crie uma cópia do array original
                    updatedLancamentos[index].pago = !updatedLancamentos[index].pago;
                    setLancamentos(updatedLancamentos);
                    setAtualizarConsolidado(true);
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        } else {
            console.error(`Lançamento com ID ${id} não encontrado.`);
        }

    }

    const EditaLancamento = (id, EditadoLancamento) => {
        let url = `http://192.168.15.5:5001/lancamento?id=${id}&descricao=${EditadoLancamento.descricao}&valor=${EditadoLancamento.valor}&tipo=${EditadoLancamento.transacao}&data_vencimento=${EditadoLancamento.vencimento}&categoria_id=${EditadoLancamento.categoria}`

        fetch(url, { method: 'put' })
            .then((response) => {
                if (response.status === 404) {
                    document.getElementById("alerta").innerHTML = "Lançamento não existe";
                } else {
                    response.json().then((data) => {
                        const novolance =
                        {
                            categoria_id: data.lancamento.categoria_id,
                            categoria_nome: data.lancamento.categoria_nome,
                            data_vencimento: data.lancamento.data_vencimento,
                            descricao: data.lancamento.descricao,
                            id: data.lancamento.id,
                            pago: data.lancamento.pago,
                            tipo: data.lancamento.tipo,
                            valor: data.lancamento.valor,
                            login: data.lancamento.login
                        }


                        const novoArrayLancamentos = lancamentos.map((lancamento) => {
                            if (lancamento.id === novolance.id) {
                                console.log(`Atualizando lançamento com ID ${lancamento.id}`);
                                console.log('Novo valor do campo "descricao":', novolance.descricao);
                                return novolance; // Atualiza o lançamento
                            } else {
                                return lancamento; // Mantém o lançamento inalterado
                            }
                        });
                        //console.log('Novo array de lançamentos:', novoArrayLancamentos);
                        setLancamentos(novoArrayLancamentos);
                        setAtualizarConsolidado(true);
                        //console.log('Novo array de lançamentos:', lancamentos);

                        /*
                         setLancamentos((prevLancamentos) => prevLancamentos.filter((lancamento) => lancamento.id !== id));
                         console.log('Exclui array de lançamentos:', lancamentos);
                         setLancamentos([...lancamentos, novolance]);
                         console.log('Inclui array de lançamentos:', lancamentos);*/

                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    return (
        <LancamentoContext.Provider value={{ categorias, CriaCategoria, BuscaCategoria, lancamentos, dadosConsolidados, atualizarConsolidado, mesConsulta, setMesConsulta, logado, NomeUsuario, CriaLancamento, ExcluiLancamento, EditaLancamento, PagaLancamento }}>
            {props.children}
        </LancamentoContext.Provider>
    )
}

export default LancamentoContextProvider;