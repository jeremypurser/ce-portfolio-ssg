import cn from 'classnames';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/layout';
import { getPieceData, getPieceIds } from '../../lib/piece';
import styles from '../../styles/piece.module.css';

export default function Piece({ pieceData }) {
  const imageUrls = pieceData.images.map((image) => {
    if (image.formats.medium) {
      return image.formats.medium.url;
    }
    return image.formats.thumbnail.url;
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftArrowClick = () => {
    const imgsLen = imageUrls.length;
    let nextIndex = (currentIndex - 1) % imgsLen;
    if (nextIndex < 0) {
      nextIndex = (nextIndex + imgsLen) % imgsLen;
    }
    setCurrentIndex(nextIndex);
  };

  const handleRightArrowClick = () => {
    setCurrentIndex((currentIndex + 1) % imageUrls.length);
  };

  return (
    <Layout>
      <Head>
        <title>{pieceData.title}</title>
      </Head>
      <article className={styles.slideshowContainer}>
        <h2>{pieceData.title}</h2>
        <p>{pieceData.description}</p>
        <div className={styles.slides}>
          <img className={styles.currentImage} src={imageUrls[currentIndex]} />
        </div>
        {imageUrls.length > 0 ? (
          <>
            <a className={styles.prev} onClick={handleLeftArrowClick}>
              ←
            </a>
            <a className={styles.next} onClick={handleRightArrowClick}>
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
          </>
        ) : null}
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
