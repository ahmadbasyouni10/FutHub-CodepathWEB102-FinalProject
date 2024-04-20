import Card from "./Card";
import { IoPersonOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import Avatar from "./Avatar";
import Link from "next/link";




const PostForm = () => {
    return (
        <Card Padding={true}>
            <div className="flex items-center gap-3">
                <div>
                    <Link href="/profile">
                        <span className="cursor-pointer">
                            <Avatar big={false} />
                        </span>
                    </Link>
                </div>
                <textarea placeholder="What's on your Fut mind" className="w-full p-2 border border-gray-300 rounded-lg"></textarea>
            </div>
            <div className="flex items-center mt-3">
                <button className="text-gray-500 fontpx-1 flex gap-1 items-center"><IoPersonOutline /> People</button>
                <button className="text-gray-500 px-3 flex items-center"><IoLocationOutline /> Location</button>
                <div className="grow text-right">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2">Post</button>
                </div>
                

            </div>
        </Card>
    );
    
}

export default PostForm;