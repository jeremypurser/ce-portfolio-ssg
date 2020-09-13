import Head from 'next/head';
import Layout from '../../components/layout';
import { getPieceData, getPieceIds } from '../../lib/piece';

export default function Piece({ pieceData }) {
  return (
    <Layout piece={true}>
      <Head>
        <title>{pieceData.title}</title>
      </Head>
      <article>
        <h2>{pieceData.title}</h2>
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
