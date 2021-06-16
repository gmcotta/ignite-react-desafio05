import { GetStaticProps } from 'next';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Prismic from '@prismicio/client';

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

export default function Home({ postsPagination }: HomeProps) {
  return (
    <main className={styles.homeContainer}>
      {postsPagination.results.map(result => (
        <section key={result.uid} className={styles.homePost}>
          <Link href={`/post/${result.uid}`}>
            <a>
              <h2>{result.data.title}</h2>
              <p>{result.data.subtitle}</p>
              <div>
                <div>
                  <FiCalendar size={20} />
                  {result.first_publication_date}
                </div>
                <div>
                  <FiUser size={20} />
                  {result.data.author}
                </div>
              </div>
            </a>
          </Link>
        </section>
      ))}
      {postsPagination.next_page && (
        <button type="button" className={styles.homeButton}>
          Carregar mais post
        </button>
      )}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      pageSize: 1,
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
    }
  );

  return {
    props: { postsPagination: postsResponse },
  };
};
