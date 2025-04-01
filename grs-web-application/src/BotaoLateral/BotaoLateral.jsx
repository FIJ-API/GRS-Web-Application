import "./BotaoLateral.css"

const BotaoLateral = ({ content, action }) => {
    return (
        <button className="botaoLateral" onClick={action}>{content}</button>
    )
}

export default BotaoLateral;