import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import { Fragment, ReactElement } from 'react';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import { formatDate } from '../../utils/formatDate';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
      alt: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): ReactElement {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  const sentencesArray = post.data.content.reduce((acc, content) => {
    acc.push(content.heading.split(/\s/));
    content.body.forEach(item => {
      acc.push(item.text.split(/\s/));
    });
    return acc;
  }, []);

  const wordCount = sentencesArray.reduce((acc, sentence) => {
    return acc + sentence.length;
  }, 0);
  const WORDS_PER_MINUTE = 200;
  const estimatedTime = Math.ceil(wordCount / WORDS_PER_MINUTE);

  return (
    <main>
      <img
        className={styles.postBanner}
        src={post.data.banner.url}
        alt={post.data.banner.alt}
      />
      <article>
        <section className={styles.postArticle}>
          <h1>{post.data.title}</h1>
          <section className={styles.postInfo}>
            <div>
              <FiCalendar size={20} />
              <span>{formatDate(post.first_publication_date)}</span>
            </div>
            <div>
              <FiUser size={20} />
              <span>{post.data.author}</span>
            </div>
            <div>
              <FiClock size={20} />
              <span>{estimatedTime} min</span>
            </div>
          </section>
          <section className={styles.postContent}>
            {post.data.content.map(item => (
              <Fragment key={`${item.heading}`}>
                <h2>{item.heading}</h2>
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(item.body),
                  }}
                />
              </Fragment>
            ))}
          </section>
        </section>
      </article>
    </main>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  return {
    props: {
      post: response,
    },
  };
};
