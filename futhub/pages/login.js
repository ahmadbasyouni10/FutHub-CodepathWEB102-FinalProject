import Layout from "../components/Layout";
import Card from "../components/Card";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "../client";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import ThemeToggle from "../components/ThemeToggle";
import { useEffect } from "react";
import { useRouter } from "next/router";


const Login = () => {
    const router = useRouter();
    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        })
        if (error) console.log(error)
        else {
            router.push('/')}
    }


    return (
        <Layout nonavigation={true}>
            <div className="h-screen flex items-center">
            <div className="max-w-sm grow mx-auto -mt-32">
            <h1 className="text-5xl text-gray-600 dark:text-gray-400 text-center mb-6">Login</h1>
             <Card Padding={false}>
                <button 
                    onClick={handleLogin} 
                    className="hover:bg-teal-500 w-full py-3 rounded-md flex items-center gap-2 hover:text-white justify-center transition-all hover:scale-110">
                    <FcGoogle className="text-6xl" />
                    <span>Sign in with Google</span>
                </button>

            </Card>
            </div>
            </div>
            <div className="absolute top-3 right-10"><ThemeToggle /></div>
        </Layout>
    )
}

export default Login;