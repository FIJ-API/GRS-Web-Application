import { useState, useRef } from "react";
import React from "react";
import './Modal.css';
import SwitchButton from "../SwitchButton/SwitchButton";

const Modal = ({ showModal, fechar, postBodyCam, putBodyCam, bodycam }) => {
    if (!showModal) return null;


    const [modelo, setModelo] = useState(bodycam?.modelo || "");
    const [numeroDeSerie, setNumeroDeSerie] = useState(bodycam?.numeroDeSerie || "");
    const [estado, setEstado] = useState(bodycam?.estado || "");
    const [vendedor, setVendedor] = useState(bodycam?.vendedor || "");
    const [revenda, setRevenda] = useState(bodycam?.revenda || "");
    const [diasAVencer, setDiasAVencer] = useState(bodycam?.diasAVencer || "");
    const [chip, setChip] = useState(bodycam?.chip || false);

    const modalRef = useRef(null);

    const handlePostBodyCam = () => {
        const newBodyCam = { modelo, numeroDeSerie, chip, estado, vendedor, revenda, diasAVencer };
        postBodyCam(newBodyCam);
    };

    const handlePutBodyCam = () => {
        const modifiedBodyCam = { modelo, numeroDeSerie, chip, estado, vendedor, revenda }
        putBodyCam(modifiedBodyCam, bodycam.idBodyCam);
    }

    const handleDragStart = (e) => {
        const modalElement = modalRef.current;
        const offsetX = e.clientX - modalElement.getBoundingClientRect().left;
        const offsetY = e.clientY - modalElement.getBoundingClientRect().top;

        const handleMouseMove = (e) => {
            modalElement.style.left = `${e.clientX - offsetX}px`;
            modalElement.style.top = `${e.clientY - offsetY}px`;
        };

        const handleMouseUp = () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <div className="modal">
            <div className="modal-content" ref={modalRef}>
                <div className="modal-header" onMouseDown={handleDragStart}>
                    <div className="header-box"></div>
                </div>
                <span className="close" onClick={fechar}>&times;</span>
                <h2>{bodycam == null ? "Adicionar BodyCam" : `Editar BodyCam${bodycam.idBodyCam}`}</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                        Modelo:
                        <input autocomplete="off" type="text" id="modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} />
                    </label>
                    <label>
                        Número de Série:
                        <input autocomplete="off" type="text" id="numeroDeSerie" value={numeroDeSerie} onChange={(e) => setNumeroDeSerie(e.target.value)} />
                    </label>
                    <label>
                        Chip:
                        <SwitchButton chip={chip} setChip={setChip} />
                    </label>
                    <label>
                        Estado:
                        <input autocomplete="off" type="text" id="estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
                    </label>
                    <label>
                        Vendedor:
                        <input autocomplete="off" type="text" id="vendedor" value={vendedor} onChange={(e) => setVendedor(e.target.value)} />
                    </label>
                    <label>
                        Revenda:
                        <input autocomplete="off" type="text" id="revenda" value={revenda} onChange={(e) => setRevenda(e.target.value)} />
                    </label>
                    {bodycam == null ? (
                        <>
                            <label>
                                Dias a Vencer:
                                <input
                                    autoComplete="off"
                                    type="number"
                                    id="diasAVencer"
                                    value={diasAVencer}
                                    onChange={(e) => setDiasAVencer(Number(e.target.value) || 0)}
                                />
                            </label>
                            <button type="button" onClick={handlePostBodyCam}>Enviar</button>
                        </>
                    ) : (
                        <button type="button" onClick={handlePutBodyCam}>Enviar Alterações</button>
                    )}

                </form>
            </div>
        </div>
    );
};

export default Modal;
