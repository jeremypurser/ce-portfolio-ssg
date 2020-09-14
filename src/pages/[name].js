import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import { getSortedPagesData } from '../lib/about';
import {
  getCategoryData,
  getCategoryNames,
  getSortedCategoriesData,
} from '../lib/category';
import styles from '../styles/layout.module.css';

export default function Category({
  categoryData,
  allPagesData,
  allCategoriesData,
}) {
  return (
    <Layout
      page="art"
      allPagesData={allPagesData}
      allCategoriesData={allCategoriesData}
    >
      <Head>{categoryData.name}</Head>
      <article>
        <ul className={styles.categoryList}>
          {/* TODO: make thumbnail */}
          {categoryData.pieces.map(({ id, title, thumbnail }) => (
            <Link key={id} href="/art/[id]" as={`/art/${id}`}>
              <a
                style={{
                  backgroundImage: `url(${thumbnail.formats.thumbnail.url})`,
                  backgroundSize: 'cover',
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
