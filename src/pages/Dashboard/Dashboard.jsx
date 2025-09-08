import { useAuthValue } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import styles from "./Dashboard.module.css"
import { useFecthDocuments } from "../../hook/useFetchDocument";
import { useDeleteDocument } from "../../hook/useDeleteDocuments";

export const Dashboard = () => {
    const {user} = useAuthValue();
    const uid = user.id;
    const { documents: posts, loading } = useFecthDocuments("posts", null, uid);
    console.log("🚀 ~ Dashboard ~ posts:", posts)
    
    const {deleteDocument} = useDeleteDocument("posts")

    if (loading){
        return <p>Carregando...</p>
    }

    return (
      <div className={styles.dashboard}>
        <h1>Dashboard</h1>
        <p>Gerencie seus posts</p>

        <div className={styles.dashboard_info}>
          <h3>Como usar o Dashboard:</h3>
          <ul>
            <li><strong>Visualizar:</strong> Clique em "Ver" para abrir o post completo.</li>
            <li><strong>Editar:</strong> Clique em "Editar" para alterar título, conteúdo, imagem ou tags do post.</li>
            <li><strong>Excluir:</strong> Clique em "Excluir" para remover permanentemente o post.</li>
            <li><strong>Criar novo post:</strong> Use o botão "Criar primeiro post" caso ainda não tenha posts.</li>
          </ul>
          <p>
            Todas as alterações feitas podem ser vistas imediatamente. Mantenha seus posts atualizados para compartilhar seu conteúdo com seus leitores.
          </p>
        </div>

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
                      to={`/edit-post/${post.id}`}
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
