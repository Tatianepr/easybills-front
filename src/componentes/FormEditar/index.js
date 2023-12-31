import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { LancamentoContext } from '../../contexts/LancamentoContext';
import { useContext } from 'react';
import './FormEditar.css'

function converteDataFormatoBrasileiroParaISO(dataBrasileira) {
    const partesData = dataBrasileira.split('/');
    if (partesData.length === 3) {
        const dia = partesData[0];
        const mes = partesData[1];
        const ano = partesData[2];
        return `${ano}-${mes}-${dia}`;
    }
    return null; // Retorno nulo em caso de formato de data inválido
}

const FormEditar = ({ oLancamento }) => {

    const id = oLancamento.id;

    const [transacao, setTransacao] = useState(oLancamento.tipo)
    const [categoria, setCategoria] = useState(oLancamento.categoria_id)
    const [descricao, setDescricao] = useState(oLancamento.descricao)
    const [valor, setValor] = useState(oLancamento.valor)
    const [vencimento, setVencimento] = useState(converteDataFormatoBrasileiroParaISO(oLancamento.data_vencimento))

    const { EditaLancamento } = useContext(LancamentoContext);

    const EditadoLancamento = { id, transacao, categoria, descricao, valor, vencimento }

    const handleSubmit = (e) => {
        e.preventDefault();
        EditaLancamento(id, EditadoLancamento)
    }

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
    ];

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


    return (
        <section className='formEditar'>
            <Form onSubmit={handleSubmit} >
                <Form.Group className='Lista-Suspesa'>
                    <label>Transação</label>
                    <Form.Control
                        as="select"
                        required
                        name="transacao"
                        value={transacao}
                        onChange={(e) => setTransacao(e.target.value)}
                    >
                        <option value=""></option>
                        {transacoes.map(item => {
                            return <option key={item.id} value={item.id}>{item.nome}</option>;
                        })}

                    </Form.Control>
                </Form.Group>
                <Form.Group className='Lista-Suspesa'>
                    <label>Categoria</label>
                    <Form.Control
                        as="select"
                        required
                        name="categoria"
                        itens={categorias}
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option value=""></option>
                        {categorias.map(item => {
                            return <option key={item.id} value={item.id}>{item.nome}</option>;
                        })}
                    </Form.Control>
                </Form.Group>
                <Form.Group className="campo-texto">
                    <label>Descrição</label>
                    <Form.Control
                        type="text"
                        required
                        name="descricao"
                        placeholder="Digite a Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="campo-texto">
                    <label>Valor</label>
                    <Form.Control
                        type="number"
                        required
                        name="valor"
                        placeholder="Digite o valor"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="campo-texto">
                    <label>Vencimento</label>
                    <Form.Control
                        type="date"
                        required
                        name="vencimento"
                        placeholder="Digite a data"
                        value={vencimento}
                        onChange={(e) => setVencimento(e.target.value)}
                    />
                </Form.Group>
                <p></p>
                <Button className='botao' variant="success" type="submit" block>
                    Editar
                </Button>

            </Form>

        </section>
    );

};


export default FormEditar;

/*

retirei o atributo block do Button pois estava gerando erros

*/