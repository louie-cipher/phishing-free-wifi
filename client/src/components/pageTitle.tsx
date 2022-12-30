import { useEffect } from 'react';

interface PageTitleProps {
	title: string;
	page: JSX.Element;
}
export default ({ title, page }: PageTitleProps) => {
	useEffect(() => {
		document.title = `Facebook - ${title}`;
	}, [title]);

	return page;
};
