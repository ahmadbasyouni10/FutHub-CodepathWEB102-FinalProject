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





const PostCard = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    return (
        <Card Padding={true}>
            <div className="flex gap-3">
                <div className="cursor-pointer">
                    <Link href="/profile">
                        <span className="cursor-pointer">
                            <Avatar big={false} />
                        </span>
                    </Link>
                </div>
                <div className="grow">
                    <h2 className="">
                        <Link href="/profile">
                            <span className="cursor-pointer hover:underline font-semibold mr-1">John Doe</span>
                        </Link>
                        shared a <a className="text-green-500">post</a>
                        <p className="text-gray-500">3 hours ago</p>
                    </h2>
                </div>
                <div>
                    <button className="text-gray-400 text-2xl" onClick={handleDropdown}><IoIosMore /></button>
                    <div className="relative">
                        {showDropdown && (
                        <div className="absolute -right-7 bg-white p-3 rounded-sm border border-gray-100 w-40">
                            <a href="" className="items-center gap-3 flex py-2"><CiEdit /> Edit</a>
                            <a href="" className="items-center gap-3 flex py-2"><MdDeleteOutline /> Delete</a>
                            <a href="" className="items-center gap-3 flex py-2"><MdOutlineReport /> Report</a>
                        </div>
                    )}
                    </div>
                </div>
            </div>
            <div>
                <p className="my-3 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, voluptate.</p>
                <div className=" rounded-md overflow-hidden">
                    <img src="https://static.independent.co.uk/2024/04/16/22/CAMPEONES_BARCELONA-PSG_93788.jpg" alt="Post"></img>
                </div>
            </div>
            <div className='flex gap-3 mt-2'>
                <button className="hover:bg-green-200 hover:scale-110 hover:bg-opacity-50 hover:shadow-md text-gray-500 font-semibold flex gap-1 items-center"><BiUpvote /> 23</button>
                <button className="hover:bg-green-200 hover:scale-110 hover:bg-opacity-50 hover:shadow-md text-gray-500 font-semibold flex gap-1 items-center"><FaRegComment /> 4 </button>
                <button className="hover:bg-green-200 hover:scale-110 hover:bg-opacity-50 hover:shadow-md text-gray-500 font-semibold flex gap-1 items-center"><FaRegShareFromSquare /> Repost</button>
            </div>
            <div className="flex mt-4 gap-3">
                <div>
                    <Avatar />
                </div>
                <div className="grow rounded-full relative">
                    <textarea className="border block p-3 overflow-hidden px-4 h-12 rounded-full w-full" placeholder="Comment..."></textarea>
                    <button className="absolute top-3 right-4 text-2xl"><IoImageOutline /></button>
                </div>
            </div>
        </Card>
    );
}

export default PostCard;

