import React, { useState, useEffect, useCallback } from 'react';
import './home.css';

const apiUrl = 'https://api.mercadolibre.com/sites/MLB/search';

function Homepage() {
    const [itens, setItens] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);
    const [termoDeBusca, setTermoDeBusca] = useState('');
    const [buscaDisparada, setBuscaDisparada] = useState(false);

    const buscaItens = useCallback(async () => {
        if (!termoDeBusca) return;
        setCarregando(true);
        setErro(null);
        
        try {
            const resposta = await fetch(`${apiUrl}?q=${encodeURIComponent(termoDeBusca)}`);
            const dados = await resposta.json();
            setItens(dados.results);
        } catch (erro) {
            setErro(erro.message);
        } finally {
            setCarregando(false);
            setBuscaDisparada(false);
        }
    },[termoDeBusca]);

    useEffect(() => {
        if (buscaDisparada) {
    buscaItens();
    }
    }, [buscaDisparada, buscaItens]);

    return (
    <div className='container'>   
        <header>
            <img className='logo' src='./logoeco.png' alt='logo daniecommerce' />
            <img className='favoritos' src='./wish.png' alt='icone lista de favoritos' />
            <p>Entre ou cadastre-se</p>

            <input
            type="text"
            placeholder="Buscar produtos, marcas e muito mais..."
            value={termoDeBusca}
            onChange={(onClick) => setTermoDeBusca(onClick.target.value)}
            />
            <button className="botaoBusca" 
            onClick={() => setBuscaDisparada(true)}
            disabled={carregando}>
            {carregando ? 'Carregando...' : 'Buscar'}
            </button>
        </header>
    <div className='seletores'>
        <select name="categorias" id="categorias" class="filter">
            <option value="" default>Categorias</option>
            <option value="roupas">Roupas</option>
            <option value="calcados">Calçados</option>
            <option value="eletronicos">Eletrônicos</option>
            <option value="eletrodomesticos">Eletrodomésticos</option>
            <option value="alimentos">Alimentos</option>
            <option value="moveis">Móveis e decoração</option>
        </select>
        <select name="lojas" id="lojas" class="filter">
            <option value="" default>Outros Parceiros</option>
            <option value="amazon">Amazon</option>
            <option value="magazineluiza">Magazine Luiza</option>
            <option value="shopee">Shopee</option>
            <option value="amerizanas">Lojas Americanas</option>
            <option value="shein">Shein</option>
        </select>

    </div>
        <container className='cardsProdutos'>
            <div>
            {carregando}
            {erro && <p>Erro: {erro}</p>}
            <ul>
            {itens.map((produto) => (
            <li key={produto.id}>
                <img src={produto.thumbnail} alt={produto.title} />
                <h1>{produto.title}</h1>
                <p>Preço: R$ {produto.price}</p>
                <a href={produto.permalink} target='_blank' rel="noopener noreferrer">
                Ver item
                </a>
            </li>
            ))}
            </ul>
            </div>
        </container>
    </div>
);
}

export default Homepage;