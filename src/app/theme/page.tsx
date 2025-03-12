'use client'

import { useAtom } from 'jotai';
import React from "react";
import {theme} from "@/atoms/theme";

export default function Theme() {

    const [appTheme, setAppTheme] = useAtom(theme);

    const handleClick = () => setAppTheme(appTheme === 'light'? 'dark': 'light');

    return(
        <div className="flex flex-col items-center justify-center h-screen">
            <div>
                <h1>
                    Current theme: {appTheme}
                </h1>
                <button onClick={handleClick}
                        className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    {appTheme === 'dark'? 'DARK': 'LIGHT'}
                </button>
            </div>
        </div>
        );
}