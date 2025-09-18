// CSS
import styles from './Home.module.css'
// Hooks
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useFecthDocuments} from '../../hook/useFetchDocument'
// Components
import {PostDetail} from '../../components/PostDetail'
import { Loading } from "../../components/Loading";


export const Home = () => {

    const [query, setQuery] = useState("");
    const { documents: posts, loading} = useFecthDocuments("posts")
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()    
        if(query){
            return navigate(`/search?q=${query}`)
        }
    };

    return (
        <div className={styles.home}>
            <h1>Veja nossos posts mais recentes</h1>
            <form onSubmit={handleSubmit} className={styles.search_form}>
                <input type="text" placeholder='Ou busque por tags...' onChange={(e) => setQuery(e.target.value)}/>
                <button className='btn btn-dark'>Pesquisar</button>
            </form>

            <div className='post-list'>
                {loading && <Loading />}
                {
                   posts && posts.map((post) => (
                        <PostDetail key={post.id} post={post} />
                    ))
                }
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}> 
                        <p>Nao foram encontrados posts</p>
                        <Link to="/create-post" className="btn">
                            Criar primeiro post
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}