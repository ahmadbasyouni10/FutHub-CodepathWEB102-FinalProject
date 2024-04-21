import Card from "./Card";
import { IoPersonOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import Avatar from "./Avatar";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../client";


const PostForm = () => {
    const [session, setSession] = useState(null);
    const [pfp, setPfp] = useState(null);
    const [nameuser, setNameuser] = useState(null);
    const [postContent, setPostContent] = useState('');

    const handleUserInput = (e) => {
        setPostContent(e.target.value);
    }

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            const { data: users, error } = await supabase.from('users').select().eq('id', session.user.id);
            if (error) {
                console.error('Error fetching user:', error);
            } else if (users.length > 0) {
                setPfp(users[0].picture);
                setNameuser(users[0].name);
            }
        };
        fetchSession();
    }, []);

    const createPost = async () => {
        supabase.from('posts').insert({
            postcontent: postContent,
            creator: session.user.id
        }).then((result) => {
            console.log(result);
            if (!result.error) {
                alert('Post created successfully');
            }
        })
}

    if (!pfp || !nameuser ) {
        return <div>Retrieving Profile...</div>
    };
    
    return (
        <Card Padding={true}>
            <div className="flex items-center gap-3">
                <div>
                    <Link href="/profile">
                        <span className="cursor-pointer">
                            <Avatar url={pfp} big={false} />
                        </span>
                    </Link>
                </div>
                <textarea value={postContent} onChange={handleUserInput} placeholder={`What's on your Fut mind, ${nameuser.split(' ')[0]}?`} className="w-full p-2 border border-gray-300 rounded-lg dark:text-black"></textarea>
            </div>
            <div className="flex items-center mt-3">
                <button className="text-gray-500 fontpx-1 dark:text-gray-400 flex gap-1 items-center"><IoPersonOutline /> People</button>
                <button className="text-gray-500 px-3 dark:text-gray-400 flex items-center"><IoLocationOutline /> Location</button>
                <div className="grow text-right">
                    <button onClick={createPost} className="bg-teal-500 text-white dark:text-black px-4 py-2 rounded-lg mt-2">Post</button>
                </div>
                

            </div>
        </Card>
    );
    
}

export default PostForm;