import { useEffect, useState } from 'react';
import './LancamentoItem.css'
import FormEditar from '../FormEditar/index.js';

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

const Lancamentoitem = (props) => {

  let corEscolhida = ''
  if (props.transacao != '') {
    if (props.transacao == 'Despesa') {
      corEscolhida = '#FF0606';
    } else {
      corEscolhida = '#2CB462';
    }
  } else {
    corEscolhida = '#000000';
  }

  //const corEscolhida2 = props.cores.find(transacao => transacao.nome === props.transacao)?.corPrimaria || '#000000';

  let data = props.vencimento
  let partes = data.split('/');
  let vencimento = new Date(partes[2], partes[1] - 1, partes[0]);

  let estilopago = FormataStatus(props.pago, vencimento);
  let botao_status = estilopago[0];


  //const EditarClick = () => {
  // Função para lidar com o clique no link "Editar"
  //alert('Editar clicado para ' + props.descricao);
  //};

  const PagarrClick = () => {
    // Função para lidar com o clique no link "Pagar"
    alert('Pagar clicado para ' + props.descricao);
    props.aoLancamentoPago(props.id);

  };

  const ExcluirClick = () => {
    // Função para lidar com o clique no link "Excluir"
    alert('Excluir clicado para ' + props.descricao);
    //setExcluirClicked(true); 
    props.aoLancamentoExcluido(props.id);

  };

  // Modal de teste
  const [modal, setModal] = useState(false);
  const EditarClick = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  // Fim do Modal de teste



  return (
    <>
      <tr key={props.id}>
        <td key="id">{props.id}</td>
        <td key="tipo">{props.transacao}</td>
        <td key="descricao">{props.descricao}</td>
        <td key="categoria">{props.categoria}</td>
        <td key="valor" style={{ color: corEscolhida }}>{props.valor}</td>
        <td key="vencimento">{props.vencimento}</td>
        <td key="status">{botao_status}</td>
        <td key="acao">
          <a href="#" className="tblDelBtn" onClick={EditarClick} title="Editar"><i id="edit">&#128393;</i></a>
          <a href="#" className="tblDelBtn" onClick={PagarrClick} title="Pagar">&nbsp; <i id="pagar" >&nbsp;&#36;&nbsp;</i></a>
          <a href="#" className="tblDelBtn" onClick={ExcluirClick} title="Excluir Despesa">&nbsp; <i id="exclur">&nbsp;X&nbsp;</i></a>
    
      {
        modal && (
          
          <div className="modal">
            <div onClick={EditarClick} className="overlay"></div>
            <div className="modal-content">
              <h2>Edição de Lançamento</h2>
                <FormEditar
                  aoLancamentoEditado={props} 
                  />
              
              <button className="close-modal" key={props.id} onClick={EditarClick}>
                CLOSE
              </button>
            </div>
          </div>
        )
      }
          </td>
      </tr>

    </>
  );
}

export default Lancamentoitem