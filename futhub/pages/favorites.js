import { useEffect, useState } from "react";
import { supabase } from '../client';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import { useRouter } from 'next/router';


export default function Saved() { 
    const [posts, setPosts] = useState([]);
    const [session, setSession] = useState(null); 
    const router = useRouter();

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            if (!session) {
                router.push('/login');
                return
              }
            const { data: users, error } = await supabase.from('users').select().eq('id', session.user.id);
            if (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchSession();
    }, []);
    console.log(session?.user?.id)

    useEffect(() => {
        if (!session?.user?.id){
            return
        }
        supabase.from('reposts').select('postid').eq('userid', session?.user?.id).then(result => {
            const postids = result.data.map(repost => repost.postid);
            supabase.from('posts').select('*, users(*)').in('id', postids).then(result => {
                setPosts(result.data);
            })
        })
                
        }, [session]);
    
    console.log(posts);

    return(
        <div>
            <Layout>
                <h1 className='text-4xl mb-4 text-gray-500'>Favorites</h1>
                {posts.length > 0 ? posts.map(post => (
                    <div key={post.id}>
                        <PostCard isFavoritesPage={true} key={post.created_at} {...post} />
                    </div>
                )) : <h2 className='text-2xl text-gray-400 font-bold'>No Posts yet</h2>}
            </Layout>
        </div>
    );
}