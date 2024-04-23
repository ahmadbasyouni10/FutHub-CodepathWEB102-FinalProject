import ProfilePage from "../profile";
import { useRouter } from "next/router";

export default function Profile() {
    const router = useRouter();
    console.log(router)
    return <ProfilePage />
} 