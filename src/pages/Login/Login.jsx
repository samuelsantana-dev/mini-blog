import { useEffect, useState } from "react"
import styles from "./Login.module.css"
import { useAuthentication } from "../../hook/useAuthentication"
export const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { error: erroSystem, loading, login} = useAuthentication()

    async function onSubmit(e){
        e.preventDefault()
        try {

            const user = {
                email,
                password
            }
             await login(user)   
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        if(erroSystem){
            console.log(erroSystem)
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
                
                {erroSystem && <p className={styles.error}>{erroSystem}</p>}
                {loading && <button className="btn" disabled>Carregando...</button>}

                {!loading && <button type="submit" className="btn">Entrar</button>}
            </form>
        </div>
    )
}