import { useEffect, useState } from 'react';
import Banner from './componentes/Banner/Banner.js';
import Formulario from './componentes/Formulario/index.js';
import Lancamento from './componentes/Lancamento/index.js';
import Rodape from './componentes/Rodape/index.js';
import BarraStatus from './componentes/BarraStatus/index.js';
import Consolidado from './componentes/Consolidado/index.js';
import Indices from './componentes/Indices/index.js';

function App() {

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const dataAtual = new Date()
  const mesCorrente = `${meses[dataAtual.getMonth()]} de ${dataAtual.getFullYear()}`

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // O mês começa em 0, então somamos 1
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Formate a data no formato YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }

  const mesLancamento = getCurrentDate()

  const [lancamentos, setLancamentos] = useState([])

  useEffect(() => {
    fetch(`http://192.168.15.5:5001/mensal?data_vencimento=${mesLancamento}`, { method: 'get', })
      .then((res) => res.json())
      .then(
        (resultado) => { setLancamentos(resultado.despesas) }
      )
  }, []);  // O segundo argumento [] garante que o efeito só seja executado uma vez, sem dependências



  const aoNovoLancamentoAdicionado = (lancamento) => {
    const formData = new FormData();
    formData.append('tipo', lancamento.transacao);
    formData.append('descricao', lancamento.descricao);
    formData.append('categoria_id', lancamento.categoria);
    formData.append('valor', lancamento.valor);
    formData.append('data_vencimento', lancamento.vencimento);
    formData.append('pago', false);

    fetch('http://192.168.15.5:5001/lancamento', { method: 'post', body: formData })
      .then((response) => {
        if (response.status == 409) {
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
              valor: data.valor
            }
            setLancamentos([...lancamentos, novolance]);

            console.log("lista")
            console.log(lancamentos)
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const aoLancamentoExcluido = (id) => {
    fetch(`http://192.168.15.5:5001/lancamento?id=${id}`, { method: 'delete' })
      .then((res) => res.json())
      .then(() => {
        // Atualiza o estado "lancamentos" após a exclusão bem-sucedida
        setLancamentos((prevLancamentos) =>
          prevLancamentos.filter((lancamento) => lancamento.id !== id)
        );
      })
      .catch((error) => {
        console.error('Error:', error);
      })

  };

  const aoLancamentoPago = (id) => {

    const index = lancamentos.findIndex(lancamento => lancamento.id === id);

    if (index !== -1) {
      fetch(`http://192.168.15.5:5001/paga?id=${id}`, { method: 'put' })
        .then((res) => res.json())
        .then(() => {
          // Alterna o estado do booleano valor 
          const updatedLancamentos = [...lancamentos]; // Crie uma cópia do array original
          updatedLancamentos[index].pago = !updatedLancamentos[index].pago;
          setLancamentos(updatedLancamentos);
        })
        .catch((error) => {
          console.error('Error:', error);
        })
    } else {
      console.error(`Lançamento com ID ${id} não encontrado.`);
    }
  };

  const aoLancamentoeEditado = (id) => {
    alert(`Editar clicado para ${id}`);
  }

  return (
    <div className="App">
      <Banner
        mes={mesCorrente} />
        <BarraStatus/>
        <Consolidado/>
       
      <Formulario
        aoLancamentoCadastrado={lancamento => aoNovoLancamentoAdicionado(lancamento)} />
      <Lancamento
        
        lancamentos={lancamentos}
        aoLancamentoExcluido={aoLancamentoExcluido}
        aoLancamentoPago={aoLancamentoPago}
        aoLancamentoeEditado={aoLancamentoeEditado}
      />
      <Rodape />
    </div>
  );
}

export default App;
