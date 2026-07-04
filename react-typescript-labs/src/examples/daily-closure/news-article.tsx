import { Card } from '$/common/components/card';
import { useEffect, useState } from 'react';
import { currentDate } from './utilities';
import type { Post } from './types';

type NewsArticleProps = {
  id: number;
};

// Fetch api returns defaultly Promise<any>. This can spread to the codebase. Better Type the returned ex[pected type on the function that makes the fetch.
const fetchArticle = async (id: number): Promise<Post> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return response.json();
};

export const NewsArticle = ({ id = 1 }: NewsArticleProps) => {
  const [article, setArticle] = useState<Post | null>(null);

  useEffect(() => {
    fetchArticle(id).then((data) => setArticle(data));
  }, [id]);

  return (
    <Card as="article" className="space-y-4 font-mono md:first:col-span-2">
      <header className="flex items-start justify-between">
        <h2 className="text-lg font-semibold">{article?.title}</h2>
        <p className="text-sm whitespace-nowrap text-gray-500">{currentDate}</p>
      </header>
      <p>{article?.body}</p>
    </Card>
  );
};
