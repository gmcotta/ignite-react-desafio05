import { GetStaticProps } from 'next';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return (
    <main className={styles.homeContainer}>
      <section className={styles.homePost}>
        <h2>Como utilizar Hooks</h2>
        <p>Pensando em sincronização em vez de ciclos de vida.</p>
        <div>
          <div>
            <FiCalendar size={20} />
            15 Mar 2021
          </div>
          <div>
            <FiUser size={20} />
            Joseph Oliveira
          </div>
        </div>
      </section>
      <section className={styles.homePost}>
        <h2>Criando um app CRA do zero</h2>
        <p>
          Tudo sobre como criar a sua primeira aplicação utilizando Create React
          App.
        </p>
        <div>
          <div>
            <FiCalendar size={20} />
            19 Abr 2021
          </div>
          <div>
            <FiUser size={20} />
            Danilo Vieira
          </div>
        </div>
      </section>
      <button type="button" className={styles.homeButton}>
        Carregar mais post
      </button>
    </main>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
