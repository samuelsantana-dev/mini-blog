import {useAuthentication} from "../../hook/useAuthentication.jsx"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import styles from "./Login.module.css"
export const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const { erroSystem, loading, login} = useAuthentication()

    async function onSubmit(e){
        e.preventDefault()

        const user = {
            email,
            password
        }

        setError("")

        await login(user)
        navigate("/dashboard")
    }

    useEffect(() => {
        if(erroSystem){
            setError(erroSystem)
        }
    }, [erroSystem])


    return (
        <div className={styles.login}>
            <h1>Login</h1>
            <p>Preencha o formulario abaixo para criar uma conta</p>
             <form onSubmit={onSubmit}>
                <label htmlFor="">
                    <span>Email</span>
                    <input type="email" name="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label htmlFor="">
                    <span>Senha</span>
                    <input type="password" name="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                
                {error && <p className={styles.error}>{error}</p>}
                {loading && <button className="btn" disabled>Carregando...</button>}

                <button className="btn">Entrar</button>
            </form>
        </div>
    )
}