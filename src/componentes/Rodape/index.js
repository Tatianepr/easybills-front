import './rodape.css'

const Rodape = () => {
    return (
    <footer className="footer">
        <section>
            <ul>
                <li>
                    <a href="instagram.com" target="_blank">
                        <img src="/imagens/instagram.svg" alt="" />
                    </a>
                </li>
                <li>
                    <a href="linkedin.com" target="_blank">
                        <img src="/imagens/linkedin.svg" alt="" />
                    </a>
                </li>
            </ul>
        </section>

        <section>
            <p>
                © 2023 - Tatiane Rodrigues - Todos os Direitos reservados
            </p>
        </section>
        <section>
            <ul><li><img src="/imagens/logo.svg" width="25px" alt="" /></li></ul>
        </section>
    </footer>
    
    )
}

export default Rodape