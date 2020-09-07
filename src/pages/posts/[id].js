import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllPageIds, getPagesData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ pageData }) {
  return (
    <Layout>
      <Head>
        <title>{pageData.name}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{pageData.name}</h1>
        {/* <div className={utilStyles.lightText}> */}
        {/* <Date dateString={pageData.date} /> */}
        {/* </div> */}
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
  return {
    props: { pageData },
  };
}
