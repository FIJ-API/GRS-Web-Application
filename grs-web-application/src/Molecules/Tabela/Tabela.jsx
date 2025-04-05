import { useEffect, useState } from "react";
import Linha from "../Linha/Linha";
import "./Tabela.css"

const Tabela = ({ dados, toogleModal, atualizarTabela }) => {

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        {dados.length > 0 &&
                            Object.keys(dados[0]).map((chave) => (
                                <th>{chave.charAt(0).toUpperCase() + chave.slice(1)}</th>
                            ))}
                        {/* <th>Id</th>
                        <th>Modelo</th>
                        <th>Número de Série</th>
                        <th>Chip</th>
                        <th>Estado</th>
                        <th>Vendedor</th>
                        <th>Revenda</th>
                        <th>Saída</th>
                        <th>Devolução</th>*/}
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((item) => (
                        <Linha item={item} toogleModal={toogleModal} atualizarTabela={atualizarTabela} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Tabela;