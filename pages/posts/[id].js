import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
	return (
		<Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<article>
				<h1 className={utilStyles.headingXl}>{postData.title}</h1>
				<div className={utilStyles.lightText}>
					<Date dateString={postData.date} />
				</div>
				<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
			</article>
		</Layout>
	);
}

// Return a list of possible value for id
export async function getStaticPaths() {
	// paths contains the array of known paths returned by getAllPostIds(), which include the params defined by pages/posts/[id].js
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false,
	};
}

// // Fetch necessary data for the blog post using params.id
export async function getStaticProps({ params }) {
	const postData = await getPostData(params.id);

	return {
		props: {
			postData,
		},
	};
}
