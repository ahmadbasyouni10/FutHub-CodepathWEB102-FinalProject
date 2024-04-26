import Layout from '../components/Layout';
import Card from '@/components/Card';
import Avatar from '@/components/Avatar';
import Link from 'next/link';
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbFriends } from "react-icons/tb";
import { IoMdInformationCircleOutline } from "react-icons/io";
import PostCard from '@/components/PostCard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from "../client";
import { set } from 'date-fns';
import { MdOutlineModeEdit } from "react-icons/md";
import { ClipLoader } from 'react-spinners';
import About from '@/components/About';


const ProfilePage = () => {
    const [updatedAbout, setUpdatedAbout] = useState('');
    const [editing, setEditing] = useState(false);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedLocation, setUpdatedLocation] = useState('');
    const [isProcessing, setProcessing] = useState(false);
    const [userPosts, setUserPosts] = useState([]);
    const [profile, setProfile] = useState(null);
    const router = useRouter();
    const userID = router?.query.profile? router.query.profile[0] : null;
    const [session, setSession] = useState(null);
    const {asPath:currentpath} = router;
    const isPosts = currentpath.includes('posts') || currentpath === '/profile';
    const isAbout = currentpath.includes('about');
    const isFriends = currentpath.includes('friends');
    const activeItemStyles = 'text-teal-500 font-bold border-b-4 border-b-teal-400';

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: users, error } = await supabase.from('users').select().eq('id', userID);
            if (error) {
                console.error('Error fetching user:', error);
            } else if (users && users.length > 0) {
                setProfile(users[0]);
            } else {
                console.error('No user found with id:', userID);
            }
        };
        if (userID) {
            fetchProfile();
        }
    }, [userID, supabase, setProfile]);

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
    }, [router, supabase, setSession]);

    useEffect (() => {
        const fetchPosts = async () => {
            setProcessing(true);
            const { data: posts, error } = await supabase.from('posts').select('id, postcontent, photos, creator, created_at, users(id,picture,name)').eq('creator', userID).order('created_at', {ascending: false});
            if (error) {
                console.error('Error fetching posts:', error);
            } else if (posts.length > 0) {
                setUserPosts(posts);
            }
        }; 
        if (isPosts) {
            fetchPosts();
            setProcessing(false);
        }
    }, [userPosts, userID, supabase, setUserPosts, setProcessing, isPosts]);



    const isMyProfile = session?.user?.id === userID;

    const handleBannerUpdate = async(e) => {
        setProcessing(true);
        const file = e.target.files?.[0];
        if (!file) return;
        const newName = `banner/${file.name}/${Date.now()}`;
        const {data, error} = await supabase.storage.from('banners').upload(newName, file)
        if (error) {
            console.error('Error uploading file:', error);
        } else {
            const url = process.env.NEXT_PUBLIC_supabaseURL + '/storage/v1/object/public/banners/' + data.path
            supabase.from('users').update({cover: url}).eq('id', session.user.id).then((result) => {
                if (result.error) {
                    console.error('Error updating user:', result.error);
                } else {
                    setProfile({...profile, cover: url});
                }
            })
        }
        setProcessing(false);
    }

    const handleProfileUpdate = async(e) => {
        setProcessing(true);
        const file = e.target.files?.[0];
        if (!file) return;
        const newName = `pfp/${file.name}/${Date.now()}`;
        const {data, error} = await supabase.storage.from('pfps').upload(newName, file)
        if (error) {
            console.error('Error uploading file:', error);
        } else {
            console.log(data);
            const url = process.env.NEXT_PUBLIC_supabaseURL + '/storage/v1/object/public/pfps/' + data.path
            console.log(url)
            supabase.from('users').update({picture: url}).eq('id', session.user.id).then((result) => {
                if (result.error) {
                    console.error('Error updating user:', result.error);
                } else {
                    setProfile({...profile, picture: url});
                }
            })
        }
        setProcessing(false);
    }

    const handleEditProfile = () => {
        setEditing(true);
    }

    const handleUpdateName = (e) => {
        setUpdatedName(e.target.value);
    }

    const handleUpdateLocation = (e) => {
        setUpdatedLocation(e.target.value);
    }

    const handleSavingProfile = () => {
        supabase.from('users').update({name: updatedName, location: updatedLocation}).eq('id', session.user.id).then((result) => {
            if (result.error) {
                console.error('Error updating user:', result.error);
            } else {
                setProfile({...profile, name: updatedName, location: updatedLocation});
                setEditing(false);
            }
        })
    }

    const handleCancel = () => {
        setEditing(false);
    }

    return (
        <Layout>
            <Card Padding={false}>
                <div className='relative overflow-hidden rounded-md'>
                    <div className='h-56 overflow-hidden flex justify-center items-center'>
                        {profile?.cover && (
                            <img src={profile.cover} alt="Profile"></img>
                            )}
                        {isProcessing && (
                            <div className="absolute m-auto mt-2">
                                <ClipLoader color='#009688' speedMultiplier={1} loading={isProcessing} size={30} />
                            </div>
                        )}
                    </div>
                    <div className='top-44 left-4 absolute'>
                        {profile?.picture && (
                            <Avatar url={profile?.picture} big={true} />
                            )}
                        {isMyProfile && (
                            <label className='bg-teal-500 hover:bg-teal-600 text-white text-sm flex items-center dark:text-black gap-1 rounded-full p-1 absolute bottom-0 left-0 hover:cursor-pointer'><MdOutlineModeEdit />
                                <input className="hidden" type='file' onChange={handleProfileUpdate} />
                            </label>
                        )}
                    </div>

                    <div className='p-4'>
                        <div>
                            <div>
                            <div className='flex'>
                            <h1 className=" ml-20 text-3xl font-bold">
                                {!editing && profile?.name}
                                {editing && <input className="text-black py-1 px-2 w-full rounded-md border border-black text-md" type='text' onChange={handleUpdateName} placeholder="Type your name..." value={updatedName} />}
                            </h1>
                            {isMyProfile && !editing && (
                                <button onClick={handleEditProfile} className='bg-teal-500 hover:bg-teal-600 text-white text-sm flex items-center dark:text-black gap-1 rounded-full py-1 px-4 hover:cursor-pointer absolute right-3'>Edit Profile</button>
                            )}
                            {isMyProfile && editing && (
                            <div className='ml-40 flex gap-1 item-center'>
                                <button onClick={handleSavingProfile} className='bg-teal-500 mb-2 hover:bg-teal-600 text-white text-sm flex items-center dark:text-black gap-1 rounded-full py-1 px-4 hover:cursor-pointer'>Save</button>
                                <button onClick={handleCancel} className='bg-teal-500 mb-2 hover:bg-teal-600 text-white text-sm flex items-center dark:text-black gap-1 rounded-full py-1 px-4 hover:cursor-pointer'>Cancel</button>
                            </div>
                            )}
                            </div>
                            {isMyProfile && (
                                 <label className='bg-teal-500 hover:bg-teal-600 text-white text-sm flex items-center dark:text-black gap-1 rounded-full py-1 px-4 absolute hover:cursor-pointer top-44 right-4'><MdOutlineModeEdit  />Banner
                                    <input className="hidden" type='file' onChange={handleBannerUpdate} />
                                </label>
                                )}
                            </div>
                            {!editing && (
                                <div className='text-gray-400 leading-4 ml-20'>
                                {profile?.location}
                                </div>
                                )}
                            {isMyProfile && editing && (
                                <input className="text-black mt-2 w-30 py-1 px-2 rounded-md border border-black text-md ml-20" type='text' onChange={handleUpdateLocation} placeholder="Type your location..." value={updatedLocation} />
                                )}
                            

                            <div className='flex mt-8'>
                                <Link href={`/profile/${userID}/posts`} className={`${isPosts ? activeItemStyles : 'hover:bg-teal-200'} items-center flex mt-2 px-3 rounded gap-1 `}><IoDocumentTextOutline /> Posts</Link>
                                <Link href={`/profile/${userID}/about`} className={`${isAbout ? activeItemStyles : 'hover:bg-teal-200'} items-center flex mt-2 px-3 rounded gap-1`}><TbFriends /> About</Link>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </Card>
            {isPosts && userPosts.map((
                post, index) => (
                    <PostCard key={post.created_at} {...post}/>
                ))}
            {isPosts && userPosts.length > 0 && isProcessing && (
                <div className="mt-2">
                    <ClipLoader color='#009688' speedMultiplier={1} loading={isProcessing} size={30} />
                </div>
            )}
             {isPosts && userPosts.length === 0 && !isProcessing &&(
                <Card Padding={true}>
                    <h2 className='text-3xl mb-2'>No posts yet</h2>
            </Card>
            )}
            {isAbout && (
                <About />)}
            {isFriends && (
                <div>
                    <Card Padding={true}>
                        <h2 className='text-3xl mb-2'>Friends</h2>
                        <div className='flex gap-3'>
                            <div>
                                <Avatar />
                                <h3 className='font-bold text-center'>Katherine</h3>
                            </div>
                            <div>
                                <Avatar />
                                <h3 className='font-bold text-center'>Katherine</h3>
                            </div>
                            <div>
                                <Avatar />
                                <h3 className='font-bold text-center'>Katherine</h3>
                            </div>
                            <div>
                                <Avatar />
                                <h3 className='font-bold text-center'>Katherine</h3>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

        </Layout>
    );
    }
export default ProfilePage;