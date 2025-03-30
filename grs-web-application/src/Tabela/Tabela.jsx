import Linha from "../Linha/Linha";
import "./Tabela.css"

const Tabela = ({ dados, toogleModal, deleteBodyCam }) => {

    const handleToogleModal = () => {
        toogleModal(null);
    }

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Modelo</th>
                        <th>Número de Série</th>
                        <th>Chip</th>
                        <th>Estado</th>
                        <th>Vendedor</th>
                        <th>Revenda</th>
                        <th>Saída</th>
                        <th>Devolução</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr>
                        <th colSpan="10">
                            <button onClick={handleToogleModal}>+</button>
                        </th>
                    </tr> */}
                    {dados.map((item) => (
                        <Linha item={item} deleteBodyCam={deleteBodyCam} toogleModal={toogleModal} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Tabela;