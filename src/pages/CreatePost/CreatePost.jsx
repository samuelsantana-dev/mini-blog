import {useState} from 'react'
import styles from './CreatePost.module.css'
import {useInsertDocument} from "../../hook/useInsertDocument"
import {useAuthValue} from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom'
export const CreatePost = () => {

    const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const {user} = useAuthValue()
  const {insertDocument, response} = useInsertDocument("posts")
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError("")

        try {
            new URL(image)
        } catch (error) {
        console.log('error', error)
            setFormError("A imagem precisa ser uma url.")
            return;
        }

        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
      insertDocument({
        title,
        image,
        body,
        tags: tagsArray,
        uid: user.uid,
        createdBy: user.displayName
      })

      navigate("/")
    }

    return (
        <div className={styles.create_post}>
        <h2>Criar post</h2>
        <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
        <ul>
            <li><strong>Título:</strong> Pense em algo chamativo que resuma seu conteúdo.</li>
            <li><strong>URL da imagem:</strong> Use uma imagem representativa para seu post.</li>
            <li><strong>Conteúdo:</strong> Escreva seu texto com clareza, compartilhe seu conhecimento ou opinião.</li>
            <li><strong>Tags:</strong> Adicione palavras-chave separadas por vírgula para facilitar a busca e organização dos posts.</li>
        </ul>
            <p>
            Após enviar, seu post será publicado e poderá ser visualizado, editado ou excluído na dashboard.
            </p>
        <form onSubmit={handleSubmit}>
            <label>
            <span>Título:</span>
            <input
                type="text"
                name="text"
                required    
                placeholder="Pense num bom título..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            </label>
            <label>
            <span>URL da imagem:</span>
            <input
                type="text"
                name="image"
                required
                placeholder="Insira uma imagem que representa seu post"
                onChange={(e) => setImage(e.target.value)}
                value={image}
            />
            </label>
            <label>
            <span>Conteúdo:</span>
            <textarea
                name="body"
                required
                placeholder="Insira o conteúdo do post"
                onChange={(e) => setBody(e.target.value)}
                value={body}
            ></textarea>
            </label>
            <label>
            <span>Tags:</span>
            <input
                type="text"
                name="tags"
                required
                placeholder="Insira as tags separadas por vírgula"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
            />
            </label>
            {!response.loading && <button type='submit' className="btn">Criar post!</button>}
            {response.loading && (
            <button className="btn" disabled>
                Aguarde.. .
            </button>
            )}
            {(response.error || formError) && (
            <p className="error">{response.error || formError}</p>
            )}
        </form>
    </div>
    )
}