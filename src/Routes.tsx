import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import BlogPosts from "./pages/Blog/BlogPosts";
import InfinitePeople from "./pages/StarWarsAPI/InfinitePeople";
import InfiniteSpecies from "./pages/StarWarsAPI/InfiniteSpecies";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogPosts />} />
      <Route path="/infinitePeople" element={<InfinitePeople />} />
      <Route path="/infiniteSpecies" element={<InfiniteSpecies />} />
    </Routes>
  );
};

export default Router;
