import Linha from "../Linha/Linha";

const Tabela = ({ dados, adicionarLinha }) => {

    return (
        <div className="p-4">
            <table>
                <thead>
                    <tr>
                        <th>Modulo</th>
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
                    <tr>
                        <th colSpan="9">
                            <button onClick={adicionarLinha}>+</button>
                        </th>
                    </tr>
                    {dados.map((item) => (
                        <Linha item={item} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Tabela;