import Card from "./Card"
import { TiHomeOutline } from "react-icons/ti";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { BiRepost } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/router";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { supabase } from "../client";


const Sidebar = () => {
    const router = useRouter();
    const activeItemStyles = 'text-white bg-green-500 hover:bg-green-200'
    const {asPath:currentPath} = router;
    const handleLogOut = async () => {
        const {error} = await supabase.auth.signOut();
        if(error) console.log(error);
    }

    return(
    <Card Padding={true} className="">
        <h2 className=" text-gray-400 font-bold mb-3 pt-2">Futhub</h2>
        <Link href="/" className={`${currentPath === '/' ? activeItemStyles : 'hover:bg-green-200'} hover:scale-110 hover:bg-opacity-50 hover:shadow-md flex items-center h-10 gap-2 py-5 -mx-4 px-4 rounded-md transition-all`}><TiHomeOutline />Home</Link>
        <Link href="/profile" className={`${currentPath === '/profile' || currentPath === '/profile/about' || currentPath === '/profile/posts' ? activeItemStyles : 'hover:bg-green-200'} hover:scale-110 hover:bg-opacity-50 hover:shadow-md flex items-center h-10 gap-2 py-5 -mx-4 px-4 rounded-md transition-all`}><CgProfile />Profile</Link>
        <Link href="/profile/friends" className={`${currentPath === '/profile/friends' ? activeItemStyles : 'hover:bg-green-200'} hover:scale-110 hover:bg-opacity-50 hover:shadow-md flex items-center h-10 gap-2 py-5 -mx-4 px-4 rounded-md transition-all`}><LiaUserFriendsSolid />Friends</Link>
        <Link href="/reposts" className={`${currentPath === '/reposts' ? activeItemStyles : 'hover:bg-green-200'} hover:scale-110 hover:bg-opacity-50 hover:shadow-md flex items-center h-10 gap-2 py-5 -mx-4 px-4 rounded-md transition-all`}><BiRepost />Reposts</Link>
        <Link href="/notifications" className={`${currentPath === '/notifications' ? activeItemStyles : 'hover:bg-green-200'} hover:scale-110 hover:bg-opacity-50 hover:shadow-md flex items-center h-10 gap-2 py-5 -mx-4 px-4 rounded-md transition-all`}><IoMdNotificationsOutline />Notifications</Link>
        
        <button className="w-full" onClick={handleLogOut}>
        <span className="hover:bg-green-200 hover:scale-110 hover:bg-opacity-50 hover:shadow-md flex items-center h-10 gap-2 py-5 -mx-4 px-4 rounded-md transition-all mt-16">
            <CiLogout />
            <span className="hidden md:block">Logout</span>
        </span>
        </button>
    </Card>
    );
}

export default Sidebar
