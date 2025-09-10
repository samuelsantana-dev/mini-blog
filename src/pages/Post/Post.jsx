import { useParams } from "react-router-dom"
import styles from './Post.module.css'
import { useFecthUnicDocuments } from "../../hook/useFecthUnicDocuments";

export const Post = () => {
    const {id} = useParams();
    const {document: post, loading } = useFecthUnicDocuments("posts", id);
    
    return (
        <div className={styles.post_container}>
            {loading && <p>Carregando Post...</p>}
            {post && (
                <>
                    <h1>{post.title}</h1>
                    <img src={post.image} alt={post.title} /> <br />
                    <h3>Este post trata sobre</h3>
                    <p>{post.body}</p>
                    <h3>Cada tag represnta</h3>
                
                    <div className={styles.tags}>
                    {post.tags.map((tag) => (
                        <p key={tag}>
                            <span>#</span>
                            {tag}
                        </p>
                    ))}
                    </div>
                </>
            )}
            
        </div>
    )
}