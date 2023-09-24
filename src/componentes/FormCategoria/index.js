import { Form, Button } from "react-bootstrap";
import { useState } from 'react';
import { LancamentoContext } from '../../contexts/LancamentoContext';
import { useContext } from 'react';
import './FormCategoria.css'

export const FormCategoria = () => {

    const { categorias } = useContext(LancamentoContext);

    const { CriaCategoria } = useContext(LancamentoContext);

    const [NovaCategoria, setNovaCategoria] = useState({
        transacao: "",
        categoria: ""
    });

    const onInputChange = (e) => {
        setNovaCategoria({ ...NovaCategoria, [e.target.name]: e.target.value });
    };

    const { transacao, categoria } = NovaCategoria;



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




    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(categoria);
        CriaCategoria(transacao, categoria);
    };


    return (
        <section className='formCategoria'>
            <Form onSubmit={handleSubmit}>
                <Form.Group >
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
                <Form.Group >
                    <label>Categoria</label>
                    <Form.Control
                        type="text"
                        required
                        name="categoria"
                        placeholder="Digite a Categoria"
                        value={categoria}
                        onChange={(e) => onInputChange(e)} />
                </Form.Group>
                <p></p>
                <label>Categorias Cadastradas</label>
                <table border={'0'} className='lancamento'>
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
                            <p></p>
                <Button className='botao' variant="success" type="submit" >
                    Cadastrar
                </Button>

            </Form>
        </section>
    );

};


export default FormCategoria;

/*

retirei o atributo block do Button pois estava gerando erros

*/