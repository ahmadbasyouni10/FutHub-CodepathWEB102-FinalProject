import Sidebar from "./Sidebar";
import PostForm from "./PostForm";
import PostCard from "./PostCard";

const Layout = ({children}) => {
        return (
            <div className="flex mt-4 mx-auto max-w-4xl gap-5">
                <div className="w-1/4">
                    <Sidebar />
                </div>
                <div className="w-3/4">
                    {children}
                </div>
            </div>
        );
    }

export default Layout;