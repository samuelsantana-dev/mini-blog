// import styles from "./About.module.css";

import { PostDetail } from "../../components/PostDetail";
import { useFecthDocuments } from "../../hook/useFetchDocument";
import { Link } from "react-router-dom";
import { useQuery } from "../../hook/useQuery";

export const Search = () => {
  const query = useQuery();
  const search = query.get("q") 
  console.log('search', search)
  const {documents: posts} = useFecthDocuments("posts", search);
  console.log('posts', posts)
  return (
    <div>
      <h2>search</h2>
      <div>
        {posts && posts.length === 0 && (<>
          <p>Não tem nenhum post</p> 
          <Link to="/" className="btn btn-dark">Voltar</Link>
        </> )}
        {posts && posts.map((item) => <PostDetail key={item.id} post={item} />)}
      </div>
    </div>
  );
};
