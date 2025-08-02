import { useEffect, useState } from "react"
import styles from "./Register.module.css"
import {useAuthentication} from "../../hook/useAuthentication.jsx"
import { useNavigate } from "react-router-dom"
/**
 * Value fica como controle do input 
 * OnChange preenche o valor do input automaticamente
 */
export const Register = () => {

    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const { createUser, erroSystem, loading} = useAuthentication()

    async function onSubmit(e){
        e.preventDefault()

        const user = {
            displayName,
            email,
            password
        }

        setError("")
        if(password !== confirmPassword){
            setError("As senhas não são iguais")
            return;
        }

        await createUser(user)

        navigate("/dashboard")
    }

    useEffect(() => {
        if(erroSystem){
            setError(erroSystem)
        }
    }, [erroSystem])
    return (
        <div className={styles.register}>
            <h1>Cadastre-se para postar</h1>
            <p>Preencha o formulario abaixo para criar uma conta</p>
            <form onSubmit={onSubmit}>
                <label htmlFor="">
                    <span>Nome</span>
                    <input type="text" name="displayName" required placeholder="Nome do usuario" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </label>
                <label htmlFor="">
                    <span>Email</span>
                    <input type="email" name="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label htmlFor="">
                    <span>Senha</span>
                    <input type="password" name="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label htmlFor="">
                    <span>Senha</span>
                    <input type="password" name="confirmPassword" required placeholder="Confirme a sua senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
                
                {error && <p className={styles.error}>{error}</p>}
                {loading && <button className="btn" disabled>Carregando...</button>}
                {!loading && <button className="btn">Cadastrar</button>}
            </form>
        </div>
    )
}