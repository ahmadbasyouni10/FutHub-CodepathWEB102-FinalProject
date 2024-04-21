import Sidebar from "./Sidebar";
import Card from "./Card";
import Avatar from "./Avatar";

const Layout = ({children, nonavigation}) => {
        return (
            <div className="flex mt-4 mx-auto max-w-6xl gap-5">
                {!nonavigation && 
                <div className=" w-4/12">
                    <Sidebar />
                    <Card Padding={true}>
                        <h2 className="text-2xl text-gray-400 font-bold">Who To follow</h2>
                        <div className='gap-3 mt-3'>
                            <div className="gap-2 flex items-center py-2">
                                <Avatar />
                                <h3 className='font-bold text-center'>Katherine</h3>
                            </div>
                            <div className="gap-2 flex items-center py-2">
                                <Avatar />
                                <h3 className='font-bold text-center'>Katherine</h3>
                            </div>
                            <div className="gap-2 flex items-center py-2">
                                <Avatar />
                                <h3 className='font-bold text-center'>Katherine</h3>
                            </div>
                            <div className="gap-2 flex items-center py-2">
                                <Avatar />
                                <h3 className='font-bold text-center'>Katherine</h3>
                            </div>
                        </div>
                    </Card>
                </div> 
                }
                
                
                <div className={nonavigation ? "w-full" : "w-3/4"}>
                    {children}
                </div>
            </div>
        );
    }

export default Layout;