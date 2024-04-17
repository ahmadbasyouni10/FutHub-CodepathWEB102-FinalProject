import Card from "./Card";
import { IoPersonOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import Avatar from "./Avatar";




const PostForm = () => {
    return (
        <Card>
            <div className="flex items-center gap-3">
                <div>
                    <Avatar />
                </div>
                <textarea placeholder="What's on your Fut mind" className="w-full p-2 border border-gray-300 rounded-lg"></textarea>
            </div>
            <div className="flex items-center mt-3">
                <button className="text-gray-500 fontpx-1 flex gap-1 items-center"><IoPersonOutline /> People</button>
                <button className="text-gray-500 px-3 flex items-center"><IoLocationOutline /> Location</button>
                <div className="grow text-right">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">Post</button>
                </div>
                

            </div>
        </Card>
    );
    
}

export default PostForm;