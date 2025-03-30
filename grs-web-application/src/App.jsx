import { useEffect, useState } from "react";
import Tabela from "./Tabela/Tabela"
import Modal from "./Modal/Modal"
import './App.css'

function App() {

  const [dados, setDados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bodycam, setBodycam] = useState(false);

  const getBodyCams = () => {
    fetch("http://localhost:8080/bodycams")
      .then((res) => res.json())
      .then((data) => {
        setDados(data)
        console.log(data);
      })
      .catch((error) => console.error("Erro ao buscar dados: ", error));
  }

  const postBodyCam = (newBodyCam) => {
    const formattedBodycam = JSON.stringify(newBodyCam);

    fetch("http://localhost:8080/bodycams", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: formattedBodycam,
    })
      .then((res) => {
        console.log(res)
        toogleModal();
        getBodyCams();
      })
      .catch((error) => console.error(error)
      )
  }

  const putBodyCam = (modifiedBodyCam, idBodyCam) => {
    const formattedBodycam = JSON.stringify(modifiedBodyCam);

    fetch(`http://localhost:8080/bodycams/${idBodyCam}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: formattedBodycam,
    })
      .then((res) => {
        console.log(res)
        toogleModal();
        getBodyCams();
      })
      .catch((error) => console.error(error)
      )
  }

  const deleteBodyCam = (idBodyCam) => {
    fetch(`http://localhost:8080/bodycams/${idBodyCam}`, {
      method: 'DELETE'
    })
      .then((res) => {
        console.log(res)
        getBodyCams();
      })
      .catch((error) => console.error("Erro ao remover bodycam" + item.idBodyCam + ": " + error));
  }

  const toogleModal = (bodycam) => {
    setShowModal(!showModal);
    setBodycam(bodycam);
  };

  const handleToogleModal = () => {
    toogleModal(null);
  }

  useEffect(() => {
    getBodyCams();
  }, []);

  return (
    <div>
      <center>
        <h2>BodyCam</h2>
      </center>
      <Tabela dados={dados} toogleModal={toogleModal} deleteBodyCam={deleteBodyCam} />
      <Modal showModal={showModal} fechar={toogleModal} postBodyCam={postBodyCam} putBodyCam={putBodyCam} bodycam={bodycam} />
      <button className="adicionarNovaLinha" onClick={handleToogleModal}>+</button>
    </div>
  )
}

export default App