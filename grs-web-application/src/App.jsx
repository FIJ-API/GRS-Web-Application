import { useEffect, useState } from "react";
import Tabela from "./Tabela/Tabela"
import Modal from "./Modal/Modal"
import './App.css'

function App() {

  const [dados, setDados] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/bodycams")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDados(data)
      })
      .catch((error) => console.error("Erro ao buscar dados: ", error));
  }, []);

  const adicionarLinha = () => {
    setShowModal(true);
  };

  const fecharModal = () => {
    setShowModal(false);
  };

  const enviarDados = (modelo, numeroDeSerie, isOn, estado, vendedor, revenda, diasAVencer) => {
    const bodycam = { modelo, numeroDeSerie, isOn, estado, vendedor, revenda, diasAVencer }
    const formattedBodycam = JSON.stringify(bodycam);
    fetch("http://localhost:8080/bodycams", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: formattedBodycam,
    })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => console.error(error)
      )

    fecharModal();
  }

  return (
    <div>
      <center>
        <h1>BodyCam</h1>
      </center>
      <Tabela dados={dados} adicionarLinha={adicionarLinha} />
      <Modal
        showModal={showModal}
        fechar={fecharModal}
        enviarDados={enviarDados}
      />
    </div>
  )
}

export default App