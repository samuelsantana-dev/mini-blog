import styles from "./About.module.css";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.content}>
        <h2>
          Sobre o <span>Mini Blog</span>
        </h2>

        <p>
          O <strong>Mini Blog</strong> é um projeto desenvolvido para praticar e
          demonstrar o uso de tecnologias modernas como <b>React</b> no
          front-end e <b>Firebase</b> no back-end.  
          Aqui você pode <em>criar</em>, <em>editar</em> e <em>explorar</em> posts
          de forma simples e prática.
        </p>

        <p className={styles.callToAction}>
          Comece agora a compartilhar suas ideias!
        </p>

        <Link to="/create-post" className="btn btn-dark">
          Criar meu primeiro post
        </Link>
      </div>
    </section>
  );
};
