import styles from "./Search.module.css";
import { PostDetail } from "../../components/PostDetail";
import { useFecthDocuments } from "../../hook/useFetchDocument";
import { Link } from "react-router-dom";
import { useQuery } from "../../hook/useQuery";

export const Search = () => {
  const query = useQuery();
  const search = query.get("q") 
  const {documents: posts} = useFecthDocuments("posts", search);

  return (
    <div className={styles.search_container}>
      <h2>Resultados da busca</h2>
      <div className={styles.results_container}>
        {posts && posts.length === 0 && (
          <div className={styles.no_results}>
            <p>Nenhum post encontrado.</p>
            <Link to="/" className={styles.btn_dark}>Voltar</Link>
          </div>
        )}
        {posts && posts.map((item) => (
          <PostDetail key={item.id} post={item} />
        ))}
      </div>
    </div>
  );
};

