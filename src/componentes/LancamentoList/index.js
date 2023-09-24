import './LancamentoList.css'
import { Modal, Button } from 'react-bootstrap';
import LancamentoItem2 from '../LancamentoItem/index.js';
import { useContext, useEffect, useState } from 'react';
import { LancamentoContext } from '../../contexts/LancamentoContext';
import FormCriar from '../FormCriar/index.js';
import FormCategoria from '../FormCategoria';


const LancamentoList = () => {

    const { lancamentos } = useContext(LancamentoContext);

    // botão de novo lançamento


    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        handleClose();

        return () => {
            //handleShowAlert();
        }
    }, [lancamentos])

    // Fim do botão de novo lançamento

    // botao de categoria

    const [showC, setShowC] = useState(false);
    const AbreCategoria = () => setShowC(true);
    const handleCloseC = () => setShowC(false);

    useEffect(() => {
        handleCloseC();

        return () => {
            // handleShowAlert();
        }
    }, [])

    //*********** */

    return (

        <section className='lancamento'>
            <div className="title-and-buttons">
                <h3>Lançamentos</h3>

                <div className="buttons">
                    <Button
                        onClick={handleShow} // botão de novo lancamento
                        className='botao'
                        data-toggle="modal">
                        + Lançamento
                    </Button>
                    <Button
                        onClick={AbreCategoria} // botão de novo lancamento
                        className='botao'
                        data-toggle="modal">
                        + Categoria
                    </Button>
                </div>
            </div>
            <p></p>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th># ID</th>
                            <th>Tipo</th>
                            <th>Descrição</th>
                            <th>Categoria</th>
                            <th>Valor</th>
                            <th>Vencimento</th>
                            <th>Status</th>
                            <th>Ações </th>
                        </tr>
                    </thead>
                    <tbody>
                        {lancamentos.map(lancamento =>
                            <LancamentoItem2
                                key={lancamento.id}
                                lancamento={lancamento}

                            />)}
                    </tbody>
                </table>
            </div>

            <div>
                <Modal show={show} onHide={handleClose}
                    size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Adicionar Lançamento
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormCriar />
                    </Modal.Body>
                </Modal>
            </div>

            <div>
                <Modal show={showC} onHide={handleCloseC}
                    size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Adicionar Categoria
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormCategoria />
                    </Modal.Body>
                </Modal>
            </div>

        </section >



    )
}


export default LancamentoList

