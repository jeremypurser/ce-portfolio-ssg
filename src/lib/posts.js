import fs from 'fs';
import matter from 'gray-matter';
import fetch from 'isomorphic-unfetch';
import path from 'path';
import remark from 'remark';
import html from 'remark-html';
import { config } from '../config';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

export async function getAllPageIds() {
  const response = await fetch(`${config.api}/pages`, {
    method: 'GET',
  });

  const json = await response.json();

  return json.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }));
}

export async function getPagesData(id) {
  const response = await fetch(`${config.api}/pages/${id}`, {
    method: 'GET',
  });

  const json = await response.json();

  const processedContent = await remark().use(html).process(json.description);

  const contentHtml = processedContent.toString();

  return {
    ...json,
    description: contentHtml,
  };
}

export async function getSortedPagesData() {
  const response = await fetch(`${config.api}/pages`, {
    method: 'GET',
  });

  const pagesData = await response.json();

  const data = pagesData.map((page) => {
    return {
      id: page.id,
      name: page.name,
      order: page.order,
    };
  });

  return data.sort((a, b) => a.order - b.order);
}

// TODO: move to `lib/about`
