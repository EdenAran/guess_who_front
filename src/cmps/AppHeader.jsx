import { NavLink } from "react-router-dom";

export function AppHeader() {
    return (
        <div className="header">
            <NavLink className="logo" to="/"><img  src={require('../assets/logo.jpg').default} alt=""/></NavLink>
        </div>
    )
}
