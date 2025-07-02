import { NavLink } from "react-router-dom"
import  styles  from "./NavBar.module.css"
export const NavBar = () => {

    return (
       <nav className={styles.navbar}>
            <NavLink className={styles.brand} to="/">
                Mini blog
            </NavLink>
            <ul className={styles.links_list}>
                {/*O NavLink vai verificar se a rota esta ativa */}
                <li><NavLink className={({isActive}) => isActive ? styles.active : ""} to="/">Home</NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? styles.active : ""} to="/about">About</NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? styles.active : ""} to="/login">Login</NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? styles.active : ""} to="/register">Register</NavLink></li>
            </ul>
       </nav>
    )
}