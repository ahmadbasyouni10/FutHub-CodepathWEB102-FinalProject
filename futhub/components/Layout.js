import Sidebar from "./Sidebar";

const Layout = ({children, nonavigation}) => {
        return (
            <div className="flex mt-4 mx-auto max-w-4xl gap-5">
                {!nonavigation && 
                <div className="w-1/4">
                <Sidebar />
            </div>
            }
                <div className={nonavigation ? "w-full" : "w-3/4"}>
                    {children}
                </div>
            </div>
        );
    }

export default Layout;