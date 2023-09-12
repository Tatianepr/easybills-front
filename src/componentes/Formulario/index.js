import './Formulario.css'
import CampoTexto from '../CampoTexto';
import CampoNum from '../CampoNum';
import CampoData from '../CampoData';
import ListaSuspensa from '../ListaSuspensa';
import Botao from '../Botao';
import { useEffect, useState } from 'react';

const Formulario = (props) => {

    const [transacao, setTransacao] = useState('')
    const [categoria, setCategoria] = useState('')
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')
    const [vencimento, setVencimento] = useState('')
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
        //console.log('form submetido =>', transacao, categoria, descricao, valor, vencimento)
        props.aoLancamentoCadastrado({
            transacao,
            categoria,
            descricao,
            valor,
            vencimento
        })

        setTransacao('')
        setCategoria('')
        setDescricao('')
        setValor('')
        setVencimento('')
    }
/*
    const handleTransacaoChange = (valor) => {
        setTransacao(valor);
    }
*/
    return (
        <section className='formulario'>
            <form onSubmit={aoSalvar}>
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
                    valor={vencimento}
                    aoAlterado={valor => setVencimento(valor)}
                />
                <Botao>
                    Cadastrar
                </Botao>  
      
                
                
            </form>
        </section>
    )

}

export default Formulario