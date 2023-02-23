import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import axios from 'axios';
import { Layout } from '../../layout/Layout';
import { Rating } from 'components';
import { MenuItem } from 'interfaces/menu.interface';

export default function Home({ menu, firstCategory }: HomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(5);
	return (
		<Layout>
			<Head>
				<title>Next App</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<ul>
				{menu.map((m) => (
					<li key={m._id.secondCategory}>{m._id.secondCategory}</li>
				))}
			</ul>
			<Rating rating={rating} setRating={setRating} isEditable />
		</Layout>
	);
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;

	const menu = axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', { firstCategory });

	return {
		props: {
			menu,
			firstCategory,
		},
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}
