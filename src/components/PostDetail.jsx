import styles from './PostDetail.module.css';
import {Link} from 'react-router-dom'
// A key é sempre algo que nao se repete
export const PostDetail = ({ post }) => {
    return (
        <div className={styles.post_detail}>
            <h2>{post.title}</h2>
            <p className={styles.createdby}>{post.createdBy}</p>
            <img src={post.image} alt={post.title} />
            <div>
                {post.tags.map((tag) => (
                    <p key={tag}>
                        <span>#</span>
                        {tag}
                    </p>
                ))}
            </div>
            <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ler</Link>
        </div>
    )
}