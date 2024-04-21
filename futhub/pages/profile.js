import Layout from '../components/Layout';
import Card from '@/components/Card';
import Avatar from '@/components/Avatar';
import Link from 'next/link';
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbFriends } from "react-icons/tb";
import { IoMdInformationCircleOutline } from "react-icons/io";
import PostCard from '@/components/PostCard';
import { useRouter } from 'next/router';



const ProfilePage = () => {
    const router = useRouter();
    const {asPath:currentpath} = router;
    console.log(currentpath);
    const isPosts = currentpath.includes('posts') || currentpath === '/profile';
    const isAbout = currentpath.includes('about');
    const isFriends = currentpath.includes('friends');
    const activeItemStyles = 'text-teal-500 font-bold border-b-4 border-b-teal-400';

    return (
        <Layout>
            <Card Padding={false}>
                <div className='relative overflow-hidden rounded-md'>
                    <div className='h-56 overflow-hidden flex justify-center items-center'>
                        <img src="https://www.exclusivememorabilia.com/media/resized/catalog/category/800_300/neymarbanner.png" alt="Profile"></img>
                    </div>
                    <div className='absolute top-44 left-4'>
                        <Avatar big={true} />
                    </div>
                    <div className='p-4'>
                        <div>
                            <h1 className="ml-40 text-3xl font-bold">
                                JOHN DOE
                            </h1>
                            <div className='text-gray-400 leading-4 ml-40'>
                                Madrid, Spain
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
                    <PostCard />
                    <PostCard />
                    <PostCard />
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