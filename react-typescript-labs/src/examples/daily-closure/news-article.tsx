import { Card } from '$/common/components/card';
import { use } from 'react';
import { currentDate } from './utilities';
import z from 'zod';
import type { Post } from './types';

type NewsArticleProps = {
  id: number;
};

const PostSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  body: z.string(),
}) satisfies z.ZodType<Post>;

// // I can also infer the type from zod schema instead of use the satisfies
// type Post = z.infer<typeof PostSchema>;

// Fetch api returns defaultly Promise<any>. This can spread to the codebase. Better Type the returned expected type on the function that makes the fetch or use Zod.
const fetchArticle = async (id: number) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const responseJson = response.json();
  return PostSchema.parse(responseJson);
};

export const NewsArticle = ({ id = 1 }: NewsArticleProps) => {
  const article = use(fetchArticle(id));

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
