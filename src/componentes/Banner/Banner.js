import { useState, useEffect } from 'react';
import './Banner.css'
import ListaSuspensa from '../ListaSuspensa';
import CampoTexto from '../CampoTexto';
import Botao from '../Botao';

function Banner(props) {


    // Modal de teste
    const [modal, setModal] = useState(false);

    const Categorias = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    // Fim do Modal de teste

    // ############### listar tipos de categorias
    const [transacao, setTransacao] = useState([])
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

    // ###############

    // ############### busca todas as categrias da base

    const [categorias, setCategorias] = useState('')
    useEffect(() => {
        // Aqui você pode fazer a requisição para obter as categorias com base na transação selecionada (transacao)
        fetch(`http://192.168.15.5:5000/categorias`, { method: 'get' })
            .then((res) => res.json())
            .then((resultado) => {
                setCategorias(resultado.categorias);
            });

    }, []);

    // ################

    // ################ cadastro de nova categoria
    const [categoria, setCategoria] = useState('')
    const aoSalvarC = (evento) => {
        evento.preventDefault()
        alert('Editar clicado para ' + categoria);

        const formData = new FormData();
        formData.append('tipo', transacao);
        formData.append('nome', categoria);

        fetch('http://192.168.15.5:5000/categoria', { method: 'post', body: formData })
            .then((response) => {
                if (response.status == 409) {
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

        setTransacao('')
        setCategoria('')




    }

    // #################
    return (
        <>
            <header className="banner">
                <section>
                    <ul><li>
                        <img src="/imagens/logo-banner.svg" width="120px" alt="O banner principal da página do EasyBills" />
                    </li></ul>
                </section>
                <section>
                    <h3>{props.mes}</h3>
                </section>
                <section>
                    <ul><li>
                        <img src="/imagens/foto.svg" width="50px" alt="fogo" />
                        <a title="Categorias" onClick={Categorias}> <img src="/imagens/gear.svg" width="50px" alt="fogo" /></a>
                    </li></ul>

                </section>

            </header>
            {
                modal && (

                    <div className="modal">
                        <div onClick={Categorias} className="overlay"></div>
                        <div className="modal-content">
                            <h2>Edição de categorias</h2>
                            <form onSubmit={aoSalvarC}>
                                <ListaSuspensa
                                    obrigatorio={true}
                                    label="Transação"
                                    id="transacao"
                                    itens={transacoes}
                                    valor={transacao}
                                    aoAlterado={valor => setTransacao(valor)}
                                />
                                <CampoTexto
                                    obrigatorio={true}
                                    label="Categoria"
                                    id="categoria"
                                    placeholder="Digite a Categoria"
                                    valor={categoria}
                                    aoAlterado={valor => setCategoria(valor)}
                                />
                                <Botao>
                                    Cadastrar
                                </Botao>
                            </form>
                            <table border={'1'} >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tipo</th>
                                        <th>Categoria</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categorias.map(
                                        categoria =>
                                            <tr key={categoria.id}>
                                                <td>{categoria.id}</td>
                                                <td>{categoria.tipo}</td>
                                                <td>{categoria.nome}</td>
                                            </tr>
                                    )}
                                </tbody>
                            </table>

                            <button className="close-modal" onClick={Categorias}>
                                CLOSE
                            </button>
                        </div>

                    </div>
                )}

        </>
    )

}

export default Banner