import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import { getSortedPagesData } from '../lib/about';
import { capitalize } from '../lib/capitalize';
import {
  getCategoryData,
  getCategoryNames,
  getSortedCategoriesData,
} from '../lib/category';
import styles from '../styles/category.module.css';

export default function Category({
  categoryData,
  allPagesData,
  allCategoriesData,
}) {
  const getURL = (thumbnail) => {
    if (thumbnail.formats.small) {
      return thumbnail.formats.small.url;
    }
    return thumbnail.formats.thumbail.url;
  };

  return (
    <Layout
      page="art"
      allPagesData={allPagesData}
      allCategoriesData={allCategoriesData}
    >
      <Head>{categoryData.name}</Head>
      <div className={styles.divider} />
      <h3>{capitalize(categoryData.name)}</h3>
      <article className={styles.pieceNav}>
        <ul className={styles.pieceList}>
          {categoryData.pieces.map(({ id, title, thumbnail }) => (
            <Link key={id} href="/art/[id]" as={`/art/${id}`}>
              <a
                style={{
                  backgroundImage: `url(${getURL(thumbnail)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <li>{title}</li>
              </a>
            </Link>
          ))}
        </ul>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getCategoryNames();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const categoryData = await getCategoryData(params.name);
  const allPagesData = await getSortedPagesData();
  const allCategoriesData = await getSortedCategoriesData();

  return {
    props: {
      categoryData,
      allPagesData,
      allCategoriesData,
    },
  };
}
