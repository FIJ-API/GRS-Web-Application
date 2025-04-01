import "./MenuLateral.css"
import BotaoLateral from "../BotaoLateral/BotaoLateral"

const MenuLateral = ({ handleToogleModal, toogleTheme, theme }) => {
    return (
        <div className="menuLateral">
            <BotaoLateral content={theme == "light" ? "☀️" : "🌙"} action={toogleTheme} />
            <BotaoLateral content={"+"} action={handleToogleModal} />
        </div>
    )
}

export default MenuLateral;