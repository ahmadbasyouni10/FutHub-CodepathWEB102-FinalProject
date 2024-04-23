import Sidebar from "./Sidebar";
import Card from "./Card";
import Avatar from "./Avatar";
import Recommended from "./Recommended";

const Layout = ({children, nonavigation}) => {
        return (
            <div className="flex mt-4 mx-auto max-w-6xl gap-5">
                {!nonavigation && 
                <div className=" w-4/12">
                    <Sidebar />
                    <Recommended />
                </div> 
                }
                
                
                <div className={nonavigation ? "w-full" : "w-3/4"}>
                    {children}
                </div>
            </div>
        );
    }

export default Layout;