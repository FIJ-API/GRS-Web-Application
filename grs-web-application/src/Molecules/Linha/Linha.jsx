import "./Linha.css"
import { deleteBodyCam } from "../../utils/Cruds.jsx"

const Linha = ({ item, toogleModal, atualizarTabela }) => {

    const chavesBloqueadas = ["id", "saida", "devolucao"];

    const handleRemover = async () => {
        await deleteBodyCam(item.idBodyCam);
        atualizarTabela();
    }

    const handleEditar = () => {

        const idEntry = Object.entries(item).find(([chave]) => chave.includes("id")) || null;
        const idEntity = idEntry ? { [idEntry[0]]: idEntry[1] } : null;

        const bodycam = Object.fromEntries(
            Object.entries(item).filter(([chave]) =>
                !chave.includes("id") && !chavesBloqueadas.some(bloqueada => chave.includes(bloqueada))
            )
        );

        toogleModal(bodycam, idEntity);
        atualizarTabela();

        // const bodycam = {
        //     idBodyCam: item.idBodyCam,
        //     modelo: item.modelo,
        //     numeroDeSerie: item.numeroDeSerie,
        //     chip: item.chip,
        //     estado: item.estado,
        //     vendedor: item.vendedor,
        //     revenda: item.revenda,
        //     saida: item.saida,
        // }

        // toogleModal(bodycam)
    }

    return (
        <tr>
            {Object.values(item).map((chave) => (
                <th>{chave != true && chave != false ? chave : chave == true ? "Sim" : "Não"}</th>
            ))}
            <td className="tdActions">
                <button onClick={handleRemover}>🗑️</button>
                <button onClick={handleEditar}>✏️</button>
            </td>
        </tr>
    )
}

export default Linha;