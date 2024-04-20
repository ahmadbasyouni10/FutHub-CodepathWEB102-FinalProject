import Layout from "@/components/Layout";
import PostForm from "@/components/PostForm";
import PostCard from "@/components/PostCard";
import { supabase } from "../client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";



export default function Home() {
    const [session, setSession] = useState(null);
    const router = useRouter();

    useEffect(() => {
      const fetchSession = async () => {
        const {data: { session },
        } = await supabase.auth.getSession()
        setSession(session);
      if (!session) {
        router.push("/login");
      }
    };
    fetchSession();
    }, [session]);
    console.log(session)

    return (
      <Layout>
        <PostForm />
        <PostCard />
      </Layout>
    );
  }
