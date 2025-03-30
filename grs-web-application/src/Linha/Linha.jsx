import "./Linha.css"

const Linha = ({ item, deleteBodyCam, toogleModal }) => {

    const handleRemover = () => {
        deleteBodyCam(item.idBodyCam);
    }

    const handleEditar = () => {
        const bodycam = {
            idBodyCam: item.idBodyCam,
            modelo: item.modelo,
            numeroDeSerie: item.numeroDeSerie,
            chip: item.chip,
            estado: item.estado,
            vendedor: item.vendedor,
            revenda: item.revenda,
            saida: item.saida,
        }

        toogleModal(bodycam)
    }

    return (
        <tr>
            <td>{item.idBodyCam}</td>
            <td>{item.modelo}</td>
            <td>{item.numeroDeSerie}</td>
            <td>{item.chip == true ? "Sim" : "Não"}</td>
            <td>{item.estado}</td>
            <td>{item.vendedor}</td>
            <td>{item.revenda}</td>
            <td>{item.saida}</td>
            <td>{item.devolucao}</td>
            <td className="tdActions">
                <button onClick={handleRemover}>🗑️</button>
                <button onClick={handleEditar}>✏️</button>
            </td>
        </tr>
    )
}

export default Linha;