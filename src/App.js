
import Banner from './componentes/Banner/Banner.js';
import LancamentoList from './componentes/LancamentoList/index.js';
import Rodape from './componentes/Rodape/index.js';
import BarraIndice from './componentes/BarraIndice/index.js';
import Consolidado from './componentes/Consolidado/index.js';
import BarraMes from './componentes/BarraMes/index.js';
import LancamentoContextProvider from './contexts/LancamentoContext';

function App() {
 
  return (
   
      
        <div className="App">
          <LancamentoContextProvider>
            <Banner />
            <BarraIndice />
            <BarraMes />
            <Consolidado />
            <LancamentoList />
          </LancamentoContextProvider>
          <Rodape />
        </div>

  );
};

export default App;

