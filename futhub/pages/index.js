import Layout from "@/components/Layout";
import PostForm from "@/components/PostForm";
import PostCard from "@/components/PostCard";
import { supabase } from "../client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Search from "@/components/Search";

export default function Home() {
    const [session, setSession] = useState(null);
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
      fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const {data: { session },
    } = await supabase.auth.getSession()
    setSession(session);
    if (!session) {
      router.push('/login');
    }
    const { data: posts, error } = await supabase.from('posts').select('id, postcontent, photos, creator, created_at, users(id, picture, name)').is('parent', null).order('created_at', {ascending: false});
    if (error) {
      console.error('Error fetching posts:', error);
    } else if (posts.length > 0) {
      const postsWithUpvotes = await Promise.all(posts.map(async (post) => {
        const { data: upvotes, error } = await supabase.from('upvotes').select('userid').eq('postid', post.id);
        if (error) {
          console.error('Error fetching upvotes:', error);
        }
        return {...post, upvotes:upvotes? upvotes.length : 0};
      }))
      const sortedPosts = postsWithUpvotes.sort((a, b) => b.upvotes - a.upvotes);
      setPosts(sortedPosts);
      fetchPosts();
    }
  };
      

    return (
      <Layout session={session}>
        <PostForm onPost={fetchPosts} />
        <Search />
        {posts.map(post => (
          <PostCard key={post.created_at} {...post} />
        ))}
      </Layout>
    );
  }
