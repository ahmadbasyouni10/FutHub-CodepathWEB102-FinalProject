import Card from "./Card";
import { IoPersonOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { MdPhotoLibrary } from "react-icons/md";
import Avatar from "./Avatar";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../client";
import { useRouter } from "next/router";  
import ToolTip from "./ToolTip";
import { ClipLoader } from "react-spinners";
import { set } from "date-fns";

const PostForm = ({onPost}) => {
    const [session, setSession] = useState(null);
    const [pfp, setPfp] = useState(null);
    const [nameuser, setNameuser] = useState(null);
    const [postContent, setPostContent] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [media, setMedia] = useState([]);
    const router = useRouter();
    

    const handleUserInput = (e) => {
        setPostContent(e.target.value);
    }

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
            } else if (users.length > 0) {
                setNameuser(users[0].name);
                setPfp(users[0].picture);
            }
        };
        fetchSession();
    }, []);

    const createPost = async () => {
        supabase.from('posts').insert({
            postcontent: postContent,
            creator: session.user.id,
            photos: media
        }).then(() => {
            setPostContent('');
            setMedia([]);
            onPost();
        })
}

    if (!pfp || !nameuser ) {
        return <div>Retrieving Profile...</div>
    };

    const handleMedia = async(e) => {
        const files = e.target.files;
        if (files.length > 0) {
            setIsProcessing(true);
            for (let i = 0; i < files.length; i++) {
                const newFileName = `${session.user.id}-${Date.now()}${files[i].name}`;
                const result = await supabase.storage.from('photos').upload(newFileName, files[i])
                        if (result.data) {
                            const url = process.env.NEXT_PUBLIC_supabaseURL + '/storage/v1/object/public/photos/' + result.data.path
                            setMedia(prevMedia => [...prevMedia, url]);
                    }
                setIsProcessing(false)
                ;
            }
        };
    }
    
    return (
        <Card Padding={true}>
            <div className="flex items-center gap-3">
                <div>
                    <Link href={"/profile/" + session.user.id + '/posts'}>
                        <span className="cursor-pointer">
                            <Avatar url={pfp} big={false} />
                        </span>
                    </Link>
                </div>
                <textarea value={postContent} onChange={handleUserInput} placeholder={`What's on your Fut mind, ${nameuser.split(' ')[0]}?`} className="w-full dark:bg-dark dark:text-white p-2 border border-gray-300 rounded-lg "></textarea>
            </div>
            {isProcessing && (
            <div className="mt-2">
                <ClipLoader color='#009688' speedMultiplier={1} loading={isProcessing} size={30} />
            </div>
            )}
            {media.length > 0 && (
    <div className="flex gap-1 max-w-30">
        {media.map((url, index) => (
            <div className="relative mt-2">
                <img src={url} alt="" className="mt-2 rounded-md w-auto h-16" />
                <button 
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center" 
                    onClick={() => {
                        const newMedia = [...media];
                        newMedia.splice(index, 1);
                        setMedia(newMedia);
                    }}
                >
                    x
                </button>
            </div>
        ))}
    </div>
)}

            <div className="flex items-center mt-3 justify-between">
                    <div className="flex items-center gap-3">
                <ToolTip content="Person">
                    <button className="text-gray-500 fontpx-1 dark:text-gray-400 flex gap-1 text-2xl items-center"><IoPersonOutline /></button>
                </ToolTip>
                <ToolTip content="Location">
                    <button className="text-gray-500 px-3 dark:text-gray-400 text-2xl flex items-center"><IoLocationOutline /></button>
                </ToolTip>
                <ToolTip content="Media">
                    <label htmlFor="media" className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"><MdPhotoLibrary /></label>
                    <input type="file" id="media" className="hidden" multiple onChange={handleMedia} />
                </ToolTip>
            </div>
            <div className="text-right">
                <button onClick={createPost} className="bg-teal-500 text-white dark:text-black px-4 py-2 rounded-lg mt-2">Post</button>
            </div>
        </div>
        </Card>
    );
    
}

export default PostForm;