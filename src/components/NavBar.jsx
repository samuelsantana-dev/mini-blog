import { NavLink } from "react-router-dom"

export const NavBar = () => {
    return (
       <nav>
            <NavLink to="/">
                mini blog
            </NavLink>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
            </ul>
       </nav>
    )
}