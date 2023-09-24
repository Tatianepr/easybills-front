import './BarraMes.css'
import { LancamentoContext } from '../../contexts/LancamentoContext';
import { useContext } from 'react';

const BarraMes = () => {

    const { mesConsulta } = useContext(LancamentoContext);
    
    return (
        <section className='BarraMes'>
            <div>
            {mesConsulta}
            </div >

        </section>
    )

}

export default BarraMes