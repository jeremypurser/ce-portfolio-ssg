import cn from 'classnames';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/layout';
import { getPieceData, getPieceIds } from '../../lib/piece';
import styles from '../../styles/piece.module.css';

export default function Piece({ pieceData }) {
  const imageUrls = pieceData.images.map((image) => image.formats.medium.url);

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Layout>
      <Head>
        <title>{pieceData.title}</title>
      </Head>
      <article className={styles.slideshowContainer}>
        <h2>{pieceData.title}</h2>
        <p>{pieceData.description}</p>
        <div className={styles.slides}>
          <img src={imageUrls[currentIndex]} />
        </div>
        <a
          className={styles.prev}
          onClick={() => setCurrentIndex((currentIndex - 1) % imageUrls.length)}
        >
          ←
        </a>
        <a
          className={styles.next}
          onClick={() => setCurrentIndex((currentIndex + 1) % imageUrls.length)}
        >
          →
        </a>
        <div className={styles.dots}>
          {imageUrls.map((_image, i) => (
            <span
              key={i}
              className={cn(styles.dot, {
                [styles.active]: i === currentIndex,
              })}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getPieceIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const pieceData = await getPieceData(params.id);

  return {
    props: {
      pieceData,
    },
  };
}
