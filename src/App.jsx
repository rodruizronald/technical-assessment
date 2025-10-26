import { useParams } from 'react-router';
import { StoryblokComponent, useStoryblok } from '@storyblok/react';

export default function App() {
	const currentYear = new Date().getFullYear();
	const { '*': slug } = useParams();

	// Determine API version based on environment
	const isProduction = import.meta.env.ENV_MODE === 'production';
	const apiVersion = isProduction ? 'published' : 'draft';

	const story = useStoryblok(slug || 'home', {
		version: apiVersion,
	});

	if (!story?.content) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<StoryblokComponent blok={story.content} />
			<footer>All rights reserved © {currentYear}</footer>
		</>
	);
}
