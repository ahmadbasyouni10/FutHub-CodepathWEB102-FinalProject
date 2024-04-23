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




const ProfilePage = () => {
    const [isProcessing, setProcessing] = useState(false);
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
    }, [userID]);

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
                            <h1 className=" ml-20 text-3xl font-bold">
                                {profile?.name}
                            </h1>
                            {isMyProfile && (
                                 <label className='bg-teal-500 hover:bg-teal-600 text-white text-sm flex items-center dark:text-black gap-1 rounded-full py-1 px-4 absolute hover:cursor-pointer top-44 right-4'><MdOutlineModeEdit  />Banner
                                    <input className="hidden" type='file' onChange={handleBannerUpdate} />
                                </label>
                                )}
                            </div>
                            <div className='text-gray-400 leading-4 ml-20'>
                                {profile?.location}
                            </div>
                            <div className='flex mt-8'>
                                <Link href='/profile/posts' className={`${isPosts ? activeItemStyles : 'hover:bg-teal-200'} items-center flex mt-2 px-3 rounded gap-1 `}><IoDocumentTextOutline /> Posts</Link>
                                <Link href='/profile/about' className={`${isAbout ? activeItemStyles : 'hover:bg-teal-200'} items-center flex mt-2 px-3 rounded gap-1`}><TbFriends /> About</Link>
                                <Link href='/profile/friends' className={`${isFriends ? activeItemStyles : 'hover:bg-teal-200'} items-center flex mt-2 px-3 rounded gap-1`}><IoMdInformationCircleOutline /> Friends</Link>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </Card>
            {isPosts && (
                <div>
                    
                </div>
                )}
            {isAbout && (
                <div>
                    <Card Padding={true}>
                        <h2 className='text-3xl mb-2'>About Me</h2>
                        <p className='text-sm mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, voluptate.Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, voluptate.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, voluptate.Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, voluptate.</p>
                        <p className='text-sm mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, voluptate. 
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, voluptate.</p>
                    </Card>
                </div>)}
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