"use client";

import Image from "next/image";
import { useState } from "react";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "How Gaming Builds Resilience and Discipline",
      excerpt:
        "Explore how games teach valuable life skills like resilience and continuous growth.",
      image: "/blog1.jpg",
    },
    {
      id: 2,
      title: "Connecting Communities Through Games",
      excerpt:
        "Discover how gaming brings people together to create culture and economy.",
      image: "/blog2.jpg",
    },
    {
      id: 3,
      title: "The Role of Gamification in Modern Development",
      excerpt:
        "Understand the impact of gamification companies and studios on the industry.",
      image: "/blog3.jpg",
    },
  ];

  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black pt-20 text-gray-400">
      <section
        className="relative h-64 flex flex-col items-center justify-center px-6 text-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-5xl font-extrabold mb-3 text-white">
          Ethiopian Games Association Blog
        </h1>
        <p className="max-w-2xl text-gray-400">
          Sharing stories, insights, and updates about games, gamification, and
          the community.
        </p>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search blog posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
                mt-6 bg-black text-white placeholder-gray-400
                px-4 py-2 rounded-md
                border border-gray-600
                focus:border-blue-500 focus:outline-none
                hover:border-blue-500
                transition-colors
                w-full max-w-md
            "
        />
      </section>

      {/* About Intro Section */}
      <section className="max-w-5xl mx-auto p-6 space-y-6">
        <h2 className="text-3xl font-bold text-white">Our Story</h2>
        <p>
          It all started with 5 passionate people wanting to unite youngsters
          who share a love for gaming. From humble beginnings, the community
          grew to include gamification companies, game studios, developers, and
          events.
        </p>
        <h3 className="text-2xl font-semibold mt-4 text-white">Our Mission</h3>
        <p className="italic">
          “Games and play are a language that the world can speak; through games
          you can create, connect and cultivate economy, culture, and values.”
        </p>

        <h3 className="text-2xl font-semibold mt-4 text-white">
          EGA Community Focus
        </h3>
        <p>
          Why Games? Games teach resilience, discipline, and continuous growth —
          elevating us to become better humans through determination and
          excellence.
        </p>

        <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-500">
          “Games and play are a language that the world can speak, through game
          you can create, connect and cultivate economy, culture, and values.”
        </blockquote>

        <p className="text-right font-bold text-blue-600">#LetThereBeGames</p>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-6xl mx-auto p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-gray-900 rounded-xl shadow hover:shadow-lg overflow-hidden transition-shadow"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 text-white">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
                <a
                  href="#"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No posts found.
          </p>
        )}
      </section>
    </main>
  );
}
