import { useState } from "react";
import SwitchButton from './../SwitchButton/SwitchButton.jsx';
import { postBodyCam, putBodyCam, uploadFile } from '../../utils/Cruds.jsx';

const FormsBodyCam = ({ bodycam, idEntity, toogleModal, atualizarTabela }) => {

    const [modelo, setModelo] = useState(bodycam?.modelo || "");
    const [numeroDeSerie, setNumeroDeSerie] = useState(bodycam?.numeroDeSerie || "");
    const [estado, setEstado] = useState(bodycam?.estado || "");
    const [vendedor, setVendedor] = useState(bodycam?.vendedor || "");
    const [revenda, setRevenda] = useState(bodycam?.revenda || "");
    const [diasAVencer, setDiasAVencer] = useState(bodycam?.diasAVencer || "");
    const [chip, setChip] = useState(bodycam?.chip || false);
    const [file, setFile] = useState(null);

    const handlePostBodyCam = async () => {
        if (!file) {
            const newBodyCam = { modelo, numeroDeSerie, chip, estado, vendedor, revenda, diasAVencer };
            await postBodyCam(newBodyCam, toogleModal);
            atualizarTabela();
        } else {
            await uploadFile(file, toogleModal);
            atualizarTabela();
        }
    };

    const handlePutBodyCam = async () => {
        const modifiedBodyCam = { modelo, numeroDeSerie, chip, estado, vendedor, revenda }
        await putBodyCam(modifiedBodyCam, idEntity.idBodyCam, toogleModal);
        atualizarTabela();
    }

    return (
        <>
            <h2>{bodycam == null ? "Adicionar BodyCam" : `Editar BodyCam ${idEntity.idBodyCam}`}</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    Modelo:
                    <input autocomplete="off" type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} />
                </label>
                <label>
                    Número de Série:
                    <input autocomplete="off" type="text" value={numeroDeSerie} onChange={(e) => setNumeroDeSerie(e.target.value)} />
                </label>
                <label>
                    Chip:
                    <SwitchButton chip={chip} setChip={setChip} />
                </label>
                <label>
                    Estado:
                    <input autocomplete="off" type="text" value={estado} onChange={(e) => setEstado(e.target.value)} />
                </label>
                <label>
                    Vendedor:
                    <input autocomplete="off" type="text" value={vendedor} onChange={(e) => setVendedor(e.target.value)} />
                </label>
                <label>
                    Revenda:
                    <input autocomplete="off" type="text" value={revenda} onChange={(e) => setRevenda(e.target.value)} />
                </label>
                {bodycam == null ? (
                    <>
                        <label>
                            Dias a Vencer:
                            <input
                                autoComplete="off"
                                type="number"
                                value={diasAVencer}
                                onChange={(e) => setDiasAVencer(Number(e.target.value) || null)}
                            />
                        </label>

                        <input type="file" className="inputFile" onChange={(e) => setFile(e.target.files[0] || null)} />

                        <button type="button" onClick={handlePostBodyCam}>Enviar</button>
                    </>
                ) : (
                    <button type="button" onClick={handlePutBodyCam}>Enviar Alterações</button>
                )}

            </form>
        </>
    )
}

export default FormsBodyCam