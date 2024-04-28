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
import { ClipLoader } from "react-spinners";
import { FaHeart } from "react-icons/fa";



const PostCard = ({postcontent, id, photos, created_at, users:user, isFavoritesPage}) => {
    const [alreadyHearted, setAlreadyHearted] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [upVotes, setUpVotes] = useState([]);
    const [session, setSession] = useState(null);
    const [pfp, setPfp] = useState(null);
    const [commentContent, setCommentContent] = useState('');
    const [comments, setComments] = useState([]);
    const [media, setMedia] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(postcontent);
    const router = useRouter();
    const [isPosts, setIsPosts] = useState(true);
    const [userPosts, setUserPosts] = useState([]);
    const [processing, setProcessing] = useState(false);
    const userID = router?.query.profile? router.query.profile[0] : null;


    useEffect (() => {
        if (userID) {
            fetchPosts()
        }
    }, [userID, isPosts]);

    const fetchPosts = async () => {
        if (!userID) {
            console.error('No user ID specified.');
            return;
        }
        setProcessing(true);
        const { data: posts, error } = await supabase.from('posts').select('id, postcontent, photos, creator, created_at, users(id,picture,name)').eq('creator', userID).order('created_at', {ascending: false});
        setProcessing(false);
        if (error) {
            console.error('Error fetching posts:', error);
        } else if (posts.length > 0) {
            setUserPosts(posts);
        }
    }; 
    
    const handleEdit = async () => {
        setEditing(true);
        setShowDropdown(false);
    }

    const handleDelete = async () => {
            const { data, error } = await supabase.from('posts').delete().eq('id', id)
            if (error) {
                console.error('Error deleting post:', error);
            }
            else
            {
                setShowDropdown(false);
                fetchPosts(); 
            }  
        }

        

    const handleSave = async () => {
    if (!id) {
        console.error('No id specified for post.');
        return;
    }

    const { data, error } = await supabase
        .from('posts')
        .update({ postcontent: editedContent })
        .eq('id',id);

    if (error) {
        console.error('Error updating post:', error);
    } else if (data && data.length === 0) {
        console.error('No post was updated. Check the post ID.');
    } else {
        setEditing(false);
    }}


    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const timeAgo = formatDistanceToNow(new Date(created_at || Date.now()), {addSuffix: true});

    const isUpVoted = !!upVotes?.find((upvote) => upvote.userid === session?.user?.id);

    const isMyProfile = session?.user.id === user?.id;

  




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
    }, [router, supabase]);

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
            photos: media,
            parent: id
        }).then((result) => {
            setCommentContent('');
            setMedia([]);
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
            e.target.value = null;
        };

    }

    const handleFavorite = async () => {
        try {
            if (alreadyHearted) {
                await supabase.from('reposts').delete().eq('postid', id).eq('userid', session.user.id);
            } else {
                await supabase.from('reposts').insert({ postid: id, userid: session.user.id });
            }
            setAlreadyHearted(!alreadyHearted);
            setShowDropdown(false);
        } catch (error) {
            console.error('Error toggling favorite status:', error);
        }
    }
    

    return (
        <Card Padding={true}>
            <div className="flex gap-3">
                <div className="cursor-pointer">
                    <Link href={"/profile/"+user?.id+'/posts'}>
                        <span className="cursor-pointer">
                            <Avatar url={user?.picture} big={false} />
                        </span>
                    </Link>
                </div>
                <div className="grow">
                    <h2 className="">
                        <Link href={"/profile/"+user?.id+'/posts'}>
                            <span className="cursor-pointer hover:underline font-semibold mr-1">{user?.name}</span>
                        </Link>
                        shared a <a className="text-teal-500">post</a>
                        <p className="text-gray-500 dark:text-gray-400">{timeAgo}</p>
                    </h2>
                </div>
                <div>
                    {( 
                        <div>
                        {!isFavoritesPage && (
                        <button className="text-gray-400 text-2xl" onClick={handleDropdown}><IoIosMore /></button>
                        )}
                        <div className="relative">
                            {!isFavoritesPage && showDropdown && (
                            <div className="absolute -right-7 bg-white dark:bg-dark p-3 rounded-sm border dark:border-gray-700 border-gray-100 w-40 z-50">
                                {isMyProfile && (
                                <div>
                                <button onClick={handleEdit} className="items-center gap-3 flex py-2"><CiEdit /> Edit</button>
                                <button onClick={handleDelete} className="items-center gap-3 flex py-2"><MdDeleteOutline /> Delete</button>
                                </div>
                                )}
                                <button onClick={handleFavorite} className="items-center gap-3 flex py-2"><FaHeart /> Favorite</button>
                            </div>
                        )}
                        </div>
                        </div>  
                    )}
                </div>
            </div>
            <div>
                {editing ? (
                    <div className="flex gap-3 mt-2 mb-2">
                        <input value={editedContent} onChange={(event) => setEditedContent(event.target.value)} className="w-full dark:bg-dark dark:text-white p-2 border border-gray-300 rounded-lg"></input>
                        <button className="bg-teal-500 text-white px-4 py-2 rounded-lg" onClick={handleSave}>Save</button>
                    </div>
                ) : (
                    <p className="my-3 text-sm">{postcontent}</p>
                )
                    }
                {photos?.length > 1 ? (
                    <div className="flex gap-4">
                        {photos.map((photo, index) => (
                            <div key={index} className="flex-grow rounded-md overflow-hidden">
                                <img src={photo} alt="Postimage" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-md overflow-hidden">
                        <img src={photos?.[0]} className="w-full h-full object-cover" alt={photos?.[0]} />
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
                    {isProcessing && (
                            <div className="mt-2">
                                <ClipLoader color='#009688' speedMultiplier={1} loading={isProcessing} size={30} />
                            </div>
                        )}
                    {media.length > 0 && (
                    <div className="flex gap-1 mt-2 mb-2 border border-gray-300 p-2">
                        {media.map((url, index) => (
                        <div key={index} className="relative">
                        <img src={url} alt="media" className="w-10 h-10 rounded-md" />
                        <button className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-3 h-3 text-xs flex items-center justify-center" onClick={() => {
                            const newMedia = [...media];
                            newMedia.splice(index, 1);
                            setMedia(newMedia);
                        }}>
                            x
                        </button>
                        </div>
                        ))}
                    </div>
                    )}
                    
                    <label htmlFor="media2"className="cursor-pointer absolute top-3 right-4 text-2xl"><IoImageOutline /></label>
                    <input type="file" id="media2" className="hidden" multiple onChange={handleMedia} />
                </div>
            </div>
            <div>
            {comments?.length > 0 && comments.map((comment, index) => (
                <div key={index} className="flex items-center gap-2 mt-2">
                    <Link href={'/profile/'+comment?.users.id+'/posts'}>
                        <Avatar url={comment.users.picture} big={false} />
                    </Link>
                    <div className="bg-gray-200 dark:text-white dark:bg-gray-600 p-2 px-4 rounded-3xl">
                        <div className="flex gap-2 items-center">
                            <Link href={'/profile/'+comment?.users.id+'/posts'}>
                                <span className="hover:underline font-bold">
                                    {comment?.users.name}<br />
                                </span>
                            </Link>
                        <div className="text-gray-500 text-sm dark:text-gray-400">
                            {formatDistanceToNow(new Date(comment.created_at), {addSuffix: true})}
                        </div>
                    </div>
                    <p className="text-sm">{comment.postcontent}</p>
                    {comment.photos && comment.photos.map((url, index) => (
                        <img key={index} src={url} alt="comment image" className="w-20 h-20 object-cover rounded-md" />
                    ))}
                </div>
            </div>
        ))}
            </div>
        </Card>
    );

}

export default PostCard;

