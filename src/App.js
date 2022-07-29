import {useState} from 'react';
import {FiSearch} from 'react-icons/fi';
import './styles.css';
import api from './services/api';

function App() {
    const [input, setinput] = useState('');
    const [cep, setCep] = useState({});

    async function handleSearch() {
        if (input == '') {
            alert("CEP Inválido!")
            return;
        }
        try {
            const response = await api.get(`${input}/json`);
            setCep(response.data)
            setinput('');
        } catch  {
            alert("Ops, CEP não encontrado!")
            setinput("")
        }

    }

    return (
        <div className="container">
            <h1 className="title">Buscador CEP</h1>

            <div className="containerInput">
                <input
                    type="text"
                    placeholder="Digite o CEP aqui..."
                    value={input}
                    onChange={(e) => setinput(e.target.value)}/>
                <button className="buttonSearch" onClick={handleSearch}>
                    <FiSearch size={25} color="#FFF"/>
                </button>
            </div>

            {
                Object
                    .keys(cep)
                    .length > 0 && (
                        <main className="main">
                            <h2>CEP: {cep.cep}</h2>
                            <span>{cep.logradouro}</span>
                            <span>
                                Complemento: {cep.complemento}</span>
                            <span>{cep.bairro}</span>
                            <span>{cep.localidade}
                                - {cep.uf}</span>
                            <span>DDD:{cep.ddd}</span>
                        </main>
                    )
            }

        </div>
    );
}

export default App;
