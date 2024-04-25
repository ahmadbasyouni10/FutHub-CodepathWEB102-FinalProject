import Avatar from "./Avatar";
import Card from "./Card";
import { BiUpvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { IoImageOutline } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineReport } from "react-icons/md";
import { BiSolidUpvote } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import { formatDistanceToNow, set } from 'date-fns';
import { useEffect } from "react";
import { supabase } from "../client";
import { useRouter } from "next/router";


const PostCard = ({postcontent, id, photos, created_at, users:user}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [upVotes, setUpVotes] = useState([]);
    const [session, setSession] = useState(null);
    const [pfp, setPfp] = useState(null);
    const [commentContent, setCommentContent] = useState('');
    const [comments, setComments] = useState([]);

    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const timeAgo = formatDistanceToNow(new Date(created_at), {addSuffix: true});

    const isUpVoted = !!upVotes.find((upvote) => upvote.userid === session.user.id);

    const toggleupvotePost = () => {
        if (isUpVoted) {
            supabase.from('upvotes').delete().eq('postid', id).eq('userid', session.user.id).then((result) => {
                if (result.error) {
                    console.error('Error removing upvote:', result.error);
                } else {
                    fetchUpvotes();
                }
            })
            return;
        }
        supabase.from('upvotes').insert({
            postid: id,
            userid: session.user.id
        }).then((result) => {
            if (result.error) {
                console.error('Error upvoting post:', result.error);
            } else {
                fetchUpvotes();
            }

        })
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
                setPfp(users[0].picture);
            }
        };
        fetchSession();
    }, []);

    useEffect(() => {
        fetchUpvotes();
    }, []);

    const fetchUpvotes = async () => {
        supabase.from('upvotes').select().eq('postid', id).then((result) => {
            if (result.error) {
                console.error('Error fetching upvotes:', result.error);
            }
            setUpVotes(result.data);
        }
    )}

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        supabase.from('posts').select('*, users(*)').eq('parent', id).then((result) => {
            if (result.error) {
                console.error('Error fetching comments:', result.error);
            }
            setComments(result.data);
        })
    }

    const handleCommenting = (event) => {
        event.preventDefault();
        supabase.from('posts').insert({
            postcontent: commentContent,
            creator: session.user.id,
            parent: id
        }).then((result) => {
            console.log(result);
            setCommentContent('');
            fetchComments();
        })
    }

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
            <div className="flex gap-3">
                <div className="cursor-pointer">
                    <Link href={"/profile/"+user.id+'/posts'}>
                        <span className="cursor-pointer">
                            <Avatar url={user?.picture} big={false} />
                        </span>
                    </Link>
                </div>
                <div className="grow">
                    <h2 className="">
                        <Link href={"/profile/"+user.id+'/posts'}>
                            <span className="cursor-pointer hover:underline font-semibold mr-1">{user?.name}</span>
                        </Link>
                        shared a <a className="text-teal-500">post</a>
                        <p className="text-gray-500 dark:text-gray-400">{timeAgo}</p>
                    </h2>
                </div>
                <div>
                    <button className="text-gray-400 text-2xl" onClick={handleDropdown}><IoIosMore /></button>
                    <div className="relative">
                        {showDropdown && (
                        <div className="absolute -right-7 bg-white dark:bg-dark p-3 rounded-sm border dark:border-gray-700 border-gray-100 w-40">
                            <a href="" className="items-center gap-3 flex py-2"><CiEdit /> Edit</a>
                            <a href="" className="items-center gap-3 flex py-2"><MdDeleteOutline /> Delete</a>
                            <a href="" className="items-center gap-3 flex py-2"><MdOutlineReport /> Report</a>
                        </div>
                    )}
                    </div>
                </div>
            </div>
            <div>
                <p className="my-3 text-sm">{postcontent}</p>
                {photos?.length > 1 ? (
                <div className="flex gap-4">
                        {photos.map((photo, index) => (
                            <div className="rounded-md overflow-hidden">
                                <img key={index} src={photo} alt="Post" className="w-full h-96 object-cover" />
                            </div>
                        ))}
                </div>
                ): (
                    <div className="rounded-md overflow-hidden">
                        <img className="w-full object-cover" src={photos[0]}></img>
                    </div>
                )}
            </div>
                
            <div className='flex gap-3 mt-2'>
                <button className={`${isUpVoted ? "text-red-500" : "text-gray-500 dark:text-gray-400"} hover:scale-110 hover:bg-opacity-50 hover:shadow-md font-semibold flex gap-1 items-center`}
                onClick={toggleupvotePost}>
                    <BiSolidUpvote /> {upVotes?.length}
                </button>
                <button className="hover:scale-110 hover:bg-opacity-50 hover:shadow-md text-gray-500 font-semibold flex gap-1 dark:text-gray-400 items-center"><FaRegComment /> 
                {comments ? comments.length : 0}
                 </button>
                <button className="hover:scale-110 hover:bg-opacity-50 hover:shadow-md text-gray-500 font-semibold flex gap-1 dark:text-gray-400 items-center"><FaRegShareFromSquare /> Repost</button>
            </div>
            <div className="flex mt-4 gap-3">
                    <Link href={"/profile/" + session?.user.id + '/posts'}>
                        <span className="cursor-pointer">
                            <Avatar url={pfp} big={false} />
                        </span>
                    </Link>
                <div className="grow rounded-full relative">
                    <form onSubmit={handleCommenting}>
                        <input onChange={event => setCommentContent(event.target.value)} value={commentContent} className="border dark:border-gray-700 block p-3 outline-none dark:bg-dark overflow-hidden px-4 h-12 rounded-full w-full" placeholder="Comment..."></input>
                    </form>
                    <label htmlFor="media2"className="cursor-pointer absolute top-3 right-4 text-2xl"><IoImageOutline /></label>
                    <input type="file" id="media2" className="hidden" multiple onChange={handleMedia} />
                </div>
            </div>
            <div>
                {comments.length > 0 && comments.map((comment) => (
                    <div className="flex items-center gap-2 mt-2">
                        <Avatar url={comment.users.picture} big={false} />
                        <div className="bg-gray-200 dark:text-black p-2 px-4 rounded-3xl">
                        <div className="flex gap-2 items-center">
                        <Link href={'/profile/'+comment.users.id}>
                            <span className="hover:underline font-bold">
                                {comment.users.name}<br />
                            </span>
                        </Link>
                            <div className="text-gray-500 text-sm dark:text-gray-400">{formatDistanceToNow(new Date(comment.created_at), {addSuffix: true})}</div>
                        </div>
                        <p className="text-sm">{comment.postcontent}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default PostCard;

