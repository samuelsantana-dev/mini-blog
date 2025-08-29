import { useAuthValue } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import styles from "./Dashboard.module.css"
import { useFecthDocuments } from "../../hook/useFetchDocument";
import { useDeleteDocument } from "../../hook/useDeleteDocuments";

export const Dashboard = () => {
    const {user} = useAuthValue();
    const uid = user.id;
    console.log(uid)
    const { documents: posts, loading } = useFecthDocuments("posts", null, uid);
    const {deleteDocument} = useDeleteDocument("posts")

    console.log('posts', posts)
    if (loading){
        return <p>Carregando...</p>
    }

    return (
      <div className={styles.dashboard}>
        <h1>Dashboard</h1>
        <p>Gerencie seus posts</p>
        {posts && posts.length === 0 ? (
          <div className={styles.noposts}>
            <p>Nao foram encontrados nenhum posts</p>
            <Link to="/create-post" className="btn">
              Criar primeiro post
            </Link>
          </div>
        ) : (
          <div className={styles.posts_container}>
            <div className={styles.post_header}>
              <span>Título</span>
              <span>Ações</span>
            </div>

            {posts &&
              posts.map((post) => (
                <div className={styles.post_row} key={post.id}>
                  <p>{post.title}</p>
                  <div className={styles.actions}>
                    <Link to={`/posts/${post.id}`} className="btn btn-outline">
                      Ver
                    </Link>
                    <Link
                      to={`/posts/edit/${post.id}`}
                      className="btn btn-outline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteDocument(post.id)}
                      className="btn btn-outline btn-danger"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

      </div>
    );
}