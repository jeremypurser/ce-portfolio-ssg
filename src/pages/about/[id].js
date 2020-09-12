import Head from 'next/head';
import Layout from '../../components/layout';
import {
  getAllPageIds,
  getPagesData,
  getSortedPagesData,
} from '../../lib/about';
import utilStyles from '../../styles/utils.module.css';

export default function Page({ pageData, allPagesData }) {
  return (
    <Layout allPagesData={allPagesData}>
      <Head>
        <title>{pageData.name}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{pageData.name}</h1>
        <div dangerouslySetInnerHTML={{ __html: pageData.description }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getAllPageIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const pageData = await getPagesData(params.id);
  const allPagesData = await getSortedPagesData();
  return {
    props: {
      pageData,
      allPagesData,
    },
  };
}
