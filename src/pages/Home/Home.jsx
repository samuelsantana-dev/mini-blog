// CSS
import styles from './Home.module.css'
// Hooks
import { useState } from 'react'
import {Link} from 'react-router-dom'
import {useFecthDocuments} from '../../hook/useFetchDocument'
// Components
import {PostDetail} from '../../components/PostDetail'

export const Home = () => {

    const [query, setQuery] = useState("");
    console.log(query)
    const { documents: posts, loading} = useFecthDocuments("posts")

    const handleSubmit = (e) => {
        e.preventDefault()    
    };

    return (
        <div className={styles.home}>
            <h1>Veja nossos posts mais recentes</h1>
            <form onSubmit={handleSubmit} className={styles.search_form}>
                <input type="text" placeholder='Ou busque por tags...' onChange={(e) => setQuery(e.target.value)}/>
                <button className='btn btn-dark'>Pesquisar</button>
            </form>

            <div className='post-list'>
                {loading && <p>Carregando posts</p>}
                {
                   posts && posts.map((post) => (
                        <PostDetail key={post.id} post={post} />
                    ))
                }
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}> 
                        <p>Nao foram encontrados posts</p>
                        <Link to="/posts/create" className="btn">
                            Criar primeiro post
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}