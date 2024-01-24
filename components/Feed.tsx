"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PrompCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return (
          <PromptCard key={post._id} post={post} handleTagClick={() => {}} />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {};

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
    })();
  }, []);

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PrompCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
