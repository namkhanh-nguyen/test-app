// app/providers.jsx or app/providers.tsx
'use client'; // Mark this component as a Client Component

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // Optional: for devtools
import { AuthContextProvider } from '@/context/AuthContext'; // Adjust the import path to your AuthContext

// @ts-ignore
export default function Providers({ children }) {
    // Create the QueryClient instance inside the Client Component
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                {children}
                <ReactQueryDevtools initialIsOpen={false} /> {/* Optional: for devtools */}
            </AuthContextProvider>
        </QueryClientProvider>
    );
}