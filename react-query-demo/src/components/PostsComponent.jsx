import React from "react";
import { useQuery } from "react-query";

function PostsComponent() {
  const { data, error, isLoading } = useQuery("posts", async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    return res.json();
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {data.slice(0, 5).map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostsComponent;
