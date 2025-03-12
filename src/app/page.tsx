'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import {useQuery} from "@tanstack/react-query";

export default function Home() {
  const router = useRouter();

  return (
      <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl mb-8 text-gray-800">Sign in to see random cat facts</h1>

          <div className="flex gap-4">
              <button
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => router.push('/signin')}
              >
                Sign In
              </button>
              <button
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => router.push('/signup')}
              >
                Sign Up
              </button>
          </div>
      </div>
  );
}