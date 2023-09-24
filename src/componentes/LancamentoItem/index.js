import { useContext, useEffect, useState } from 'react';
import { LancamentoContext } from '../../contexts/LancamentoContext';
import './LancamentoItem.css'
import FormEditar from '../FormEditar/index.js';
import { Modal, Button } from 'react-bootstrap';

/* define estilo para o status de pagamento das despesas*/

function FormataStatus(status, data) {
  let vencimento = data;
  let pago = status
  let hoje = new Date();
  let botao_status = '';
  let estilo_pago = '';
  let texto = '';

  if (!pago) {
    if (vencimento < hoje) {
      botao_status = <span className="badge bg-atrasadas">Atrasada</span>;
      estilo_pago = 'tblDelBtn';
      texto = 'Pagar';
    }
    else {
      botao_status = <span className="badge bg-apagar">A pagar</span>;
      estilo_pago = 'tblDelBtn';
      texto = 'Pagar';
    }
  }
  else {
    botao_status = <span className="badge bg-pagas">Paga</span>;
    estilo_pago = 'tblDelBtnu';
    texto = 'Desfazer Pagamento';
  }
  let retorno = [botao_status, estilo_pago, texto]
  return (retorno);
}

function converteDate(dataNaoConvertida) {

  let data = dataNaoConvertida
  //console.log (`data não convertida ${data}`)
  let partes = data.split('/');
  let vencimento = new Date(partes[2], partes[1] - 1, partes[0]);
  return vencimento
}

const Lancamentoitem = ({ lancamento }) => {

  const { ExcluiLancamento } = useContext(LancamentoContext)

  const { PagaLancamento } = useContext(LancamentoContext)

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    handleClose()
  }, [lancamento])

  //console.log(lancamento)

  let corEscolhida = ''
  if (lancamento.tipo !== '') {
    if (lancamento.tipo === 'Despesa') {
      corEscolhida = '#FF0606';
    } else {
      corEscolhida = '#2CB462';
    }
  } else {
    corEscolhida = '#000000';
  }

  let estilopago = FormataStatus(lancamento.pago, converteDate(lancamento.data_vencimento));
  let botao_status = estilopago[0];


  return (
    <>
      <tr key={lancamento.id}>
        <td key="id">{lancamento.id}</td>
        <td key="tipo">{lancamento.tipo}</td>
        <td key="descricao">{lancamento.descricao}</td>
        <td key="categoria">{lancamento.categoria_nome}</td>
        <td key="valor" style={{ color: corEscolhida }}>{parseFloat(lancamento.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
        <td key="vencimento">{lancamento.data_vencimento}</td>
        <td key="status">{botao_status}</td>
        <td key="acao">
          <button onClick={handleShow} className="tblDelBtn" title="Editar Despesa" data-toggle="modal"><i className="material-icons">&#128393;</i></button>
          <button onClick={() => PagaLancamento(lancamento.id)} className="tblDelBtn" title="Pagar Despesa" data-toggle="modal"><i className="material-icons">&nbsp;&#36;&nbsp;</i></button>
          <button onClick={() => ExcluiLancamento(lancamento.id)} className="tblDelBtn" title="Excluir Despesa" data-toggle="modal"><i className="material-icons">&nbsp;X&nbsp;</i></button>


          <Modal show={show} onHide={handleClose}
            size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
              <Modal.Title>
                Editar Lançamento
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormEditar oLancamento={lancamento} />
            </Modal.Body>
            <Modal.Footer>
              <Button className='botao' variant="secondary" onClick={handleClose}>
                Fechar
              </Button>
            </Modal.Footer>
          </Modal>
        </td>


      </tr>

    </>
  );
}

export default Lancamentoitem