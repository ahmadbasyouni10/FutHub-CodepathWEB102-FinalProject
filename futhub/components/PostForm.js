import Card from "./Card";
import { IoPersonOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import Avatar from "./Avatar";
import Link from "next/link";
import { useSessionData } from '../hooks/useSessionData';





const PostForm = () => {
    const { pfp, nameuser} = useSessionData();

    if (!pfp || !nameuser ) {
        return <div>Retreiving Profile...</div>
    };
    
    return (
        <Card Padding={true}>
            <div className="flex items-center gap-3">
                <div>
                    <Link href="/profile">
                        <span className="cursor-pointer">
                            <Avatar url={pfp} big={false} />
                        </span>
                    </Link>
                </div>
                <textarea placeholder={`What's on your Fut mind, ${nameuser.split(' ')[0]}?`} className="w-full p-2 border border-gray-300 rounded-lg dark:text-black"></textarea>
            </div>
            <div className="flex items-center mt-3">
                <button className="text-gray-500 fontpx-1 dark:text-gray-400 flex gap-1 items-center"><IoPersonOutline /> People</button>
                <button className="text-gray-500 px-3 dark:text-gray-400 flex items-center"><IoLocationOutline /> Location</button>
                <div className="grow text-right">
                    <button className="bg-teal-500 text-white dark:text-black px-4 py-2 rounded-lg mt-2">Post</button>
                </div>
                

            </div>
        </Card>
    );
    
}

export default PostForm;