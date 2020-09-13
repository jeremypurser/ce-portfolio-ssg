import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/layout.module.css';
import utilStyles from '../styles/utils.module.css';

const name = 'Catherine Edgerton';
export const siteTitle = name;

export default function Layout({
  children,
  home,
  allPagesData,
  allCategoriesData,
}) {
  const [showBgImage, setShowBgImage] = useState(
    allCategoriesData.map(() => true)
  );

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <h2>
          <Link href="/">
            <a>{siteTitle}</a>
          </Link>
        </h2>
        <nav className={styles.aboutNav}>
          <ul className={styles.aboutList}>
            {allPagesData.map(({ slug, name }) => (
              <li className={utilStyles.listItem} key={slug}>
                <Link href="/about/[slug]" as={`/about/${slug}`}>
                  <a>{name}</a>
                </Link>
                <br />
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <nav className={styles.categoryNav}>
        <ul className={styles.categoryList}>
          {allCategoriesData.map(({ id, name, thumbnail }, i) => (
            <Link href="/[name]" as={`/${name}`} key={id}>
              <a
                style={{
                  backgroundImage: `${
                    showBgImage[i] ? `url(${thumbnail.url})` : 'none'
                  }`,
                  backgroundSize: 'cover',
                }}
                onMouseEnter={() =>
                  setShowBgImage((show) => {
                    const newShow = [...show];
                    newShow[i] = false;
                    return newShow;
                  })
                }
                onMouseLeave={() =>
                  setShowBgImage((show) => {
                    const newShow = [...show];
                    newShow[i] = true;
                    return newShow;
                  })
                }
              >
                {name}
              </a>
            </Link>
          ))}
        </ul>
      </nav>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
