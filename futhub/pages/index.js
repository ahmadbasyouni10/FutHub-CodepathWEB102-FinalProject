import Card from "../components/Card";
import Sidebar from "../components/Sidebar";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

export default function Home() {
  return (
    <div className="flex mt-4 mx-auto max-w-4xl gap-5">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4">
        <PostForm />
        <PostCard />
      </div>
    </div>
  );
}
