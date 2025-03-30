import "./Linha.css"

const Linha = ({ item }) => {

    const handleRemover = () => {
        fetch(`http://localhost:8080/bodycams/${id}`, {
            method: 'DELETE'
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setDados(data)
            })
            .catch((error) => console.error("Erro ao buscar dados: ", error));
    }

    const handleEditar = () => {
        console.log("editar");
    }

    return (
        <tr>
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