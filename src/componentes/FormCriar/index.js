import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { LancamentoContext } from '../../contexts/LancamentoContext';
import { useContext } from 'react';
import './FormCriar.css'

export const FormCriar = () => {

    const { CriaLancamento } = useContext(LancamentoContext);

    const [NovoLancamento, setNovoLancamento] = useState({
        transacao: "",
        categoria: "",
        descricao: "",
        valor: "",
        vencimento: ""
    });

    const onInputChange = (e) => {
        setNovoLancamento({ ...NovoLancamento, [e.target.name]: e.target.value });
    };

    const { transacao, categoria, descricao, valor, vencimento } = NovoLancamento;

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(descricao);
        CriaLancamento(transacao, categoria, descricao, valor, vencimento );
    };


    return (
        <section className='formCriar'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='Lista-Suspesa'>
                    <label>Transação</label>
                    <Form.Control
                        as="select"
                        required
                        name="transacao"
                        value={transacao}
                        onChange={(e) => onInputChange(e)}
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
                        onChange={(e) => onInputChange(e)}
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
                        onChange={(e) => onInputChange(e)} />
                </Form.Group>
                <Form.Group className="campo-texto">
                    <label>Valor</label>
                    <Form.Control
                        type="number"
                        required
                        name="valor"
                        placeholder="Digite o valor"
                        value={valor}
                        onChange={(e) => onInputChange(e)} />
                </Form.Group>
                <Form.Group className="campo-texto">
                    <label>Vencimento</label>
                    <Form.Control
                        type="date"
                        required
                        name="vencimento"
                        placeholder="Digite a data"
                        value={vencimento}
                        onChange={(e) => onInputChange(e)} />
                </Form.Group>
                <p></p>
                <Button className='botao' variant="success" type="submit" > 
                    Cadastrar
                </Button>

            </Form>
        </section>
    );

};


export default FormCriar;

/*

retirei o atributo block do Button pois estava gerando erros

*/