import React from "react";
import BlogPosts from "./pages/Blog/BlogPosts";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        basic project1 - Blog Posts
        <BlogPosts />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
