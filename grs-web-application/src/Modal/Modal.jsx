import { useState, useRef } from "react";
import React from "react";
import './Modal.css';
import SwitchButton from "../SwitchButton/SwitchButton";

const Modal = ({ showModal, fechar, enviarDados }) => {
    if (!showModal) return null;

    const [isOn, setIsOn] = useState(false);

    const modalRef = useRef(null);

    const handleSubmit = () => {
        const modelo = document.getElementById('modelo').value;
        const numeroDeSerie = document.getElementById('numeroDeSerie').value;
        const estado = document.getElementById('estado').value;
        const vendedor = document.getElementById('vendedor').value;
        const revenda = document.getElementById('revenda').value;
        const diasAVencer = document.getElementById('diasAVencer').value;

        enviarDados(modelo, numeroDeSerie, isOn, estado, vendedor, revenda, diasAVencer);
    };

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
                <h2>Adicionar Body-Cam</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                        Modulo:
                        <input type="text" id="modelo" />
                    </label>
                    <label>
                        Número de Série:
                        <input type="text" id="numeroDeSerie" />
                    </label>
                    <label>
                        Chip:
                        <SwitchButton isOn={isOn} setIsOn={setIsOn} />
                    </label>
                    <label>
                        Estado:
                        <input type="text" id="estado" />
                    </label>
                    <label>
                        Vendedor:
                        <input type="text" id="vendedor" />
                    </label>
                    <label>
                        Revenda:
                        <input type="text" id="revenda" />
                    </label>
                    <label>
                        Dias a Vencer:
                        <input type="number" id="diasAVencer" />
                    </label>
                    <button type="button" onClick={handleSubmit}>Enviar</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
