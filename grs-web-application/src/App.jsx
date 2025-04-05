import { useEffect, useState } from "react";
import Tabela from "./Molecules/Tabela/Tabela.jsx"
import Modal from "./Molecules/Modal/Modal.jsx"
import MenuLateral from "./Molecules/MenuLateral/MenuLateral.jsx"
import './App.css'
import './colors.css'
import FormsBodyCam from "./Molecules/Forms/FormsBodycam.jsx";
import { getBodyCams } from "./utils/Cruds.jsx";

function App() {

  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState("light");
  const [bodycam, setBodycam] = useState(null);
  const [id, setId] = useState(null);
  const [dados, setDados] = useState([]);

    const atualizarTabela = async () => {
        const dadosApi = await getBodyCams();
        setDados(dadosApi);
        console.log(dados);
        
    };

    useEffect(() => {
        atualizarTabela();
    }, []);

  const toogleModal = (bodycam, newId) => {
    setId(newId)
    setBodycam(bodycam);
    setShowModal(!showModal);
  };

  const handleToogleModal = () => {
    toogleModal(null);
  }

  const toogleTheme = () => {
    setTheme(theme == "light" ? "dark" : "light")
    document.body.className = theme;
  }

  return (
    <div>
      <center>
        <h2>BodyCam</h2>
      </center>
      <Tabela dados={dados} toogleModal={toogleModal} atualizarTabela={atualizarTabela} />

      <Modal showModal={showModal} fechar={toogleModal}
        form={<FormsBodyCam bodycam={bodycam} idEntity={id} toogleModal={toogleModal} atualizarTabela={atualizarTabela} />}
      >
      </Modal>

      <MenuLateral handleToogleModal={handleToogleModal} toogleTheme={toogleTheme} theme={theme} />
    </div>
  )
}

export default App