import './Banner.css'
import { LancamentoContext } from '../../contexts/LancamentoContext';
import { useContext } from 'react';

function Banner() {

    const { NomeUsuario } = useContext(LancamentoContext);
    
    return (
        <>
            <header className="banner">
                <section>
                    <ul><li>
                        <img src="/imagens/logo.svg" alt="O banner principal da página do EasyBills" />

                    </li></ul>
                </section>
                <section>
                    <ul><li>
                        <h3>EasyBill!</h3>
                    </li></ul>
                </section>
                <section>
                    <ul><li>
                        
                        <a href='' ><img src="/imagens/user.svg" width="50px" alt="fogo" /></a>
                        Olá! {NomeUsuario}!
                        

                    </li></ul>
                </section>

            </header>


        </>
    )

}

export default Banner