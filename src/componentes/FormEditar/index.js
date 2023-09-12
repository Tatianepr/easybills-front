import './Formulario.css'
import CampoTexto from '../CampoTexto';
import CampoNum from '../CampoNum';
import CampoData from '../CampoData';
import ListaSuspensa from '../ListaSuspensa';
import Botao from '../Botao';
import { useEffect, useState } from 'react';

const FormEditar = (props) => {

    function converterRealParaNumerico(valorEmReais) {
        // Remove o símbolo de moeda (R$) e os separadores de milhar (pontos)
        const valorSemSimbolo = valorEmReais.replace('R$', '').replace(/\./g, '');

        // Substitui a vírgula decimal por um ponto
        const valorNumerico = valorSemSimbolo.replace(',', '.');

        // Converte a string para um número de ponto flutuante
        return parseFloat(valorNumerico);
    }

    const data = new Date(props.aoLancamentoEditado.vencimento);

    const VencFormata =
        data.getFullYear() +
        '-' +
        String(data.getDate()).padStart(2, '0') +
        '-' +
        String(data.getMonth() + 1).padStart(2, '0');

    const [id, setId] = useState(props.aoLancamentoEditado.id)
    const [transacao, setTransacao] = useState(props.aoLancamentoEditado.transacao)
    const [categoria, setCategoria] = useState(props.aoLancamentoEditado.categoria_id)
    const [descricao, setDescricao] = useState(props.aoLancamentoEditado.descricao)
    const [valor, setValor] = useState(converterRealParaNumerico(props.aoLancamentoEditado.valor))
    const [vencimento, setVencimento] = useState(VencFormata)
    const [categorias, setCategorias] = useState([]);

    const transacoes = [
        {
            id: 'Despesa',
            nome: 'Despesa'
        },
        {
            id: 'Receita',
            nome: 'Receita'
        }
    ]

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

    const aoSalvar = (evento) => {
        evento.preventDefault()
        /*  chamada original do cadastro
        props.aoLancamentoEditado({
            transacao,
            categoria,
            descricao,
            valor,
            vencimento
        })*/

        console.log(`descricao: ${descricao}`);

        let url = `http://192.168.15.5:5001/lancamento?id=${id}&descricao=${descricao}&valor=${valor}&tipo=${transacao}&data_vencimento=${vencimento}&categoria_id=${categoria}`

        fetch(url, { method: 'put' })
            .then((response) => {
                if (response.status == 404) {
                    document.getElementById("alerta").innerHTML = "Lançamento não existe";
                } else {
                    response.json().then((data) => {
                        const novolance =
                        {
                            id: data.id,
                            descricao: data.descricao,
                            valor: data.valor,
                            pago: data.pago,
                            tipo: data.tipo,
                            data_vencimento: data.data_vencimento,
                            categoria_id: data.categoria_id
                        }
                        //setLancamentos([...lancamentos, novolance]);
                        window.location.reload();
                        console.log(novolance)
                        console.log("lista")
                        //console.log(lancamentos)
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setTransacao('')
        setCategoria('')
        setDescricao('')
        setValor('')
        setVencimento('')
    }

    return (
        <section className='formulario'>
            <form onSubmit={aoSalvar}>
                <input type='hidden' id='id' disabled value={id} />
                <ListaSuspensa
                    obrigatorio={true}
                    label="Transação"
                    id="transacao"
                    itens={transacoes}
                    valor={transacao}
                    aoAlterado={valor => setTransacao(valor)}
                />
                <ListaSuspensa
                    obrigatorio={true}
                    label="Categoria"
                    id="categoria"
                    itens={categorias}
                    valor={categoria}
                    aoAlterado={valor => setCategoria(valor)}
                />

                <CampoTexto
                    obrigatorio={true}
                    label="Descrição"
                    id="descricao"
                    placeholder="Digite a Descrição"
                    valor={descricao}
                    aoAlterado={valor => setDescricao(valor)}
                />
                <CampoNum
                    obrigatorio={true}
                    label="Valor"
                    id="valor"
                    placeholder="Digite o valor 00"
                    valor={valor}
                    aoAlterado={valor => setValor(valor)}
                />
                <CampoData
                    obrigatorio={true}
                    label="Vencimento"
                    id="vencimento"
                    placeholder="Digite a data"
                    valor={VencFormata}
                    aoAlterado={valor => setVencimento(valor)}
                />
                <Botao>
                    Editar
                </Botao>

            </form>
        </section>
    )

}

export default FormEditar