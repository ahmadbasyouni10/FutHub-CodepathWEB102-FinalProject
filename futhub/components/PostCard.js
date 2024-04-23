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
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns';


const PostCard = ({postcontent, photos, created_at, users:user}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const timeAgo = formatDistanceToNow(new Date(created_at), {addSuffix: true});

    return (
        <Card Padding={true}>
            <div className="flex gap-3">
                <div className="cursor-pointer">
                    <Link href={"/profile/"+user.id}>
                        <span className="cursor-pointer">
                            <Avatar url={user?.picture} big={false} />
                        </span>
                    </Link>
                </div>
                <div className="grow">
                    <h2 className="">
                        <Link href={"/profile/"+user.id}>
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
                <button className="hover:bg-teal-200 hover:scale-110 hover:bg-opacity-50 hover:shadow-md text-gray-500 font-semibold flex gap-1 dark:text-gray-400 items-center"><BiUpvote /> 23</button>
                <button className="hover:bg-teal-200 hover:scale-110 hover:bg-opacity-50 hover:shadow-md text-gray-500 font-semibold flex gap-1 dark:text-gray-400 items-center"><FaRegComment /> 4 </button>
                <button className="hover:bg-teal-200 hover:scale-110 hover:bg-opacity-50 hover:shadow-md text-gray-500 font-semibold flex gap-1 dark:text-gray-400 items-center"><FaRegShareFromSquare /> Repost</button>
            </div>
            <div className="flex mt-4 gap-3">
                    <Link href={"/profile/"+user.id}>
                        <span className="cursor-pointer">
                            <Avatar url={user?.picture} big={false} />
                        </span>
                    </Link>
                <div className="grow rounded-full relative">
                    <textarea className="border dark:border-gray-700 block p-3 outline-none dark:bg-dark overflow-hidden px-4 h-12 rounded-full w-full" placeholder="Comment..."></textarea>
                    <button className="absolute top-3 right-4 text-2xl"><IoImageOutline /></button>
                </div>
            </div>
        </Card>
    );
}

export default PostCard;

