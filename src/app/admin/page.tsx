'use client'
import React, { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import firebase_app from "@/firebase/config";
import {useQuery} from "@tanstack/react-query";
import {useAtom} from "jotai";
import { theme } from "@/atoms/theme";

function Page() {
    const { user } = useAuthContext();
    const router = useRouter();
    const auth = getAuth(firebase_app);
    const [appTheme, setAppTheme] = useAtom(theme);

    useEffect(() => {
        if (user == null) {
            router.push("/");
        }
    }, [user]);

    const getTodos = async() => {
        await new Promise((resolve) => setTimeout(resolve, 100))
        const response = await fetch("https://catfact.ninja/fact")
        return await response.json()
    }

    const {data, isPending, refetch, error} = useQuery({
        queryKey: ['todos'],
        queryFn: getTodos
    })

    if(error) {
        alert("Error occured")
    }

    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out the user
            router.push("/"); // Redirect to the homepage
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    // const handleClick = () => setAppTheme(appTheme === 'light'? 'dark': 'light');

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl mb-8 text-gray-800">Random Cat Fact</h1>
            <div>
                <h2 className="pb-5">
                    {isPending ? "Loading..." : JSON.stringify(data?.fact)}
                </h2>
            </div>
            <div className="flex gap-4">
                <button onClick={() => refetch()}
                        className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Refresh
                </button>
                <button
                    className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
            <div>
                <h1>
                    Current theme: {appTheme}
                </h1>
                {/*<button onClick={handleClick}*/}
                {/*        className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"*/}
                {/*>*/}
                {/*    {appTheme === 'dark'? 'DARK': 'LIGHT'}*/}
                {/*</button>*/}
            </div>
        </div>
    );
}

export default Page;