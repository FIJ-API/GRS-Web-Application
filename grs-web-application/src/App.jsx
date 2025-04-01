import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Tabela from "./Tabela/Tabela"
import Modal from "./Modal/Modal"
import MenuLateral from "./MenuLateral/MenuLateral"
import './App.css'
import './colors.css'

function App() {

  const [dados, setDados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState("light");
  const [bodycam, setBodycam] = useState(false);

  const getBodyCams = () => {
    fetch("http://localhost:8080/bodycams")
      .then((res) => res.json())
      .then((data) => {
        setDados(data)
        console.log(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados: ", error);
      })
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
        if (res.ok) {
          Swal.fire({
            icon: "success",
            title: res.status,
            position: "bottom-left",
            backdrop: false,
            timer: '2000',
            timerProgressBar: true,
            showConfirmButton: false,
            text: res.message || "Dados enviados com sucesso!",
            customClass: {
              popup: "swalAlerta",
            }
          });
          toogleModal();
          getBodyCams();
        } else {
          Swal.fire({
            icon: "error",
            title: res.status,
            position: "bottom-left",
            backdrop: false,
            timer: '2000',
            timerProgressBar: true,
            showConfirmButton: false,
            text: res.message || "Erro ao cadastrar!",
            customClass: {
              popup: "swalAlerta",
            }
          });
        }
      })
      .catch((error) => {
        console.error(error)
        Swal.fire({
          icon: "error",
          title: error.status,
          position: "bottom-left",
          backdrop: false,
          timer: '2000',
          timerProgressBar: true,
          showConfirmButton: false,
          text: error.message || "Algo deu errado!",
          customClass: {
            popup: "swalAlerta",
          }
        });
      })
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
        if (res.ok) {
          Swal.fire({
            icon: "success",
            title: res.status,
            position: "bottom-left",
            backdrop: false,
            timer: '2000',
            timerProgressBar: true,
            showConfirmButton: false,
            text: res.message || "Dados enviados com sucesso!",
            customClass: {
              popup: "swalAlerta",
            }
          });
          getBodyCams();
          toogleModal();
        } else {
          Swal.fire({
            icon: "error",
            title: res.status,
            position: "bottom-left",
            backdrop: false,
            timer: '2000',
            timerProgressBar: true,
            showConfirmButton: false,
            text: res.message || "Número de série em conflito!",
            customClass: {
              popup: "swalAlerta",
            }
          });
        }
      })
      .catch((error) => {
        console.error(error)
        Swal.fire({
          icon: "error",
          title: error.status,
          position: "bottom-left",
          backdrop: false,
          timer: '2000',
          timerProgressBar: true,
          showConfirmButton: false,
          text: error.message || "Algo deu errado!",
          customClass: {
            popup: "swalAlerta",
          }
        });
      })
  }

  const deleteBodyCam = (idBodyCam) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Essa ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      backdrop: false,
      confirmButtonColor: "#007bff",
      cancelButtonColor: "#ff4d4d",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "swalAlerta",
      }
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8080/bodycams/${idBodyCam}`, {
          method: 'DELETE'
        })
          .then((res) => {
            console.log(res)
            if (res.ok) {
              Swal.fire({
                icon: "success",
                title: res.status,
                position: "bottom-left",
                backdrop: false,
                timer: '2000',
                timerProgressBar: true,
                showConfirmButton: false,
                text: res.message || "Dados enviados com sucesso!",
                customClass: {
                  popup: "swalAlerta",
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: res.status,
                position: "bottom-left",
                backdrop: false,
                timer: '2000',
                timerProgressBar: true,
                showConfirmButton: false,
                text: res.message || "BodyCam não encontrada!",
                customClass: {
                  popup: "swalAlerta",
                }
              });
            }
            getBodyCams();
          })
          .catch((error) => {
            console.error("Erro ao remover bodycam" + idBodyCam + ": " + error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              position: "bottom-left",
              backdrop: false,
              timer: '2000',
              timerProgressBar: true,
              showConfirmButton: false,
              text: error.message || "Algo deu errado!",
              customClass: {
                popup: "swalAlerta",
              }
            });
          })
      }
    })
  }

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8080/bodycams/upload", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      Swal.fire({
        icon: res.ok ? "success" : "error",
        title: res.status,
        text: data.message || (res.ok ? "Dados enviados com sucesso!" : "Erro ao cadastrar via upload!")
      });

      if (res.ok) {
        toogleModal();
        getBodyCams();
      }

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: error.message || "Erro ao cadastrar via upload!"
      });
    }
  };


  const toogleModal = (bodycam) => {
    setShowModal(!showModal);
    setBodycam(bodycam);
  };

  const handleToogleModal = () => {
    toogleModal(null);
  }

  const toogleTheme = () => {
    setTheme(theme == "light" ? "dark" : "light")
    document.body.className = theme;
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
      <Modal showModal={showModal} fechar={toogleModal} postBodyCam={postBodyCam} putBodyCam={putBodyCam} bodycam={bodycam} uploadFile={uploadFile} />
      <MenuLateral handleToogleModal={handleToogleModal} toogleTheme={toogleTheme} theme={theme} />
    </div>
  )
}

export default App