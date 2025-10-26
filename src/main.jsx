import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import './index.css';
import App from './App.jsx';
import { storyblokInit, apiPlugin } from '@storyblok/react';

import Page from './storyblok/Page';
import Teaser from './storyblok/Teaser';
import Feature from './storyblok/Feature';
import Grid from './storyblok/Grid';

// Determine environment and API version
const isProduction = import.meta.env.ENV_MODE === 'production';
const apiVersion = isProduction ? 'published' : 'draft';

storyblokInit({
	accessToken: import.meta.env.STORYBLOK_DELIVERY_API_TOKEN,
	apiOptions: {
		/** Set the correct region for your space. Learn more: https://www.storyblok.com/docs/packages/storyblok-js */
		region: 'eu',
		version: apiVersion, // Use 'draft' for preview, 'published' for production
		/** The following code is only required when creating a Storyblok space directly via the Blueprints feature. */
		endpoint: import.meta.env.STORYBLOK_API_BASE_URL
			? `${new URL(import.meta.env.STORYBLOK_API_BASE_URL).origin}/v2`
			: undefined,
	},
	use: [apiPlugin],
	components: {
		page: Page,
		teaser: Teaser,
		feature: Feature,
		grid: Grid,
	},
	bridge: !isProduction, // Enable bridge script for live editing in non-production
});

const router = createBrowserRouter([
	{
		path: '/*',
		Component: App,
	},
]);
const root = document.getElementById('root');

createRoot(root).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
