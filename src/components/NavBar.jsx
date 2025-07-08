import { NavLink } from "react-router-dom"
import { useAuthValue } from "../context/AuthContext"
import  styles  from "./NavBar.module.css"
export const NavBar = () => {
    const {user} = useAuthValue(); 
    console.log('user', user)
    return (
       <nav className={styles.navbar}>
            <NavLink className={styles.brand} to="/">
                Mini blog
            </NavLink>
            <ul className={styles.links_list}>
                <li><NavLink className={({isActive}) => isActive ? styles.active : ""} to="/">Home</NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? styles.active : ""} to="/about">About</NavLink></li>
                {!user && (
                    <>
                        <li><NavLink className={({isActive}) => isActive ? styles.active : ""} to="/login">Login</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? styles.active : ""} to="/register">Register</NavLink></li>
                    </>
                )}
            </ul>
       </nav>
    )
}