import Avatar from "./Avatar";
import Card from "./Card";
import { BiUpvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";

const PostCard = () => {
    return (
        <Card>
            <div className="flex gap-3">
                <div className="">
                    <Avatar />
                </div>
                <div className="">
                    <h2 className=""><a className="font-semibold">John Doe</a> shared a <a className="text-blue-500">post</a></h2>
                    <p className="text-gray-500">3 hours ago</p>
                </div>
            </div>
            <div>
                <p className="my-3 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, voluptate.</p>
                <div className=" rounded-md overflow-hidden">
                    <img src="https://static.independent.co.uk/2024/04/16/22/CAMPEONES_BARCELONA-PSG_93788.jpg" alt="Post"></img>
                </div>
            </div>
            <div className='flex gap-2 mt-2'>
                <button className="text-gray-500 font-semibold flex gap-1 items-center"><BiUpvote /> Upvote</button>
                <button className="text-gray-500 font-semibold flex gap-1 items-center"><FaRegComment /> Comment </button>
                <button className="text-gray-500 font-semibold flex gap-1 items-center"><FaRegShareFromSquare /> Repost</button>
            </div>
        </Card>
    );
}

export default PostCard;

