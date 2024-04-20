import Layout from "../components/Layout";
import Card from "../components/Card";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "../client";
import { useSupabaseClient } from "@supabase/auth-helpers-react";


const Login = () => {
    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        })
        if (error) console.log(error)
    }
    return (
        <Layout nonavigation={true}>
            <div className="h-screen flex items-center">
            <div className="max-w-sm grow mx-auto -mt-32">
            <h1 className="text-5xl text-gray-400 text-center mb-3">Login</h1>
             <Card Padding={false}>
                <button 
                    onClick={handleLogin} 
                    className="hover:bg-green-500 w-full py-3 border-b border-b-gray-200 rounded-md flex items-center gap-2 hover:text-white justify-center transition-all hover:scale-110">
                    <FcGoogle className="text-6xl" />
                    <span>Sign in with Google</span>
                </button>

            </Card>
            </div>
            </div>
        </Layout>
    )
}

export default Login;