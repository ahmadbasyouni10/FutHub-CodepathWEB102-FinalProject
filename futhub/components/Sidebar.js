import Card from "./Card"
import { TiHomeOutline } from "react-icons/ti";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { BiRepost } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiLogout } from "react-icons/ci";

const Sidebar = () => {
    return(
    <Card className="">
        <h2 className=" text-gray-400 font-bold mb-3 pt-2">Navigation</h2>
        <a href="" className="flex items-center gap-2 py-3"><TiHomeOutline />Home</a>
        <a href="" className="flex items-center gap-2 py-3"><BiRepost />Reposts</a>
        <a href="" className="flex items-center gap-2 py-3"><LiaUserFriendsSolid />Friends</a>
        <a href="" className="flex items-center gap-2 py-3"><IoMdNotificationsOutline />Notifications</a>
        <a href="" className="flex items-center gap-2 py-3"><CiLogout />Logout</a>
    </Card>
    );
}

export default Sidebar;
