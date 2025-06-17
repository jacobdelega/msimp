"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const NavAction = () => {
    const { data: session, status } = useSession();

    return (
        <>
            {status === "authenticated" ? (
                <p className='px-3 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-indigo-300'>
                    <Link
                        href='/'
                        onClick={signOut}>
                        Logout
                    </Link>
                </p>
            ) : (
                <p className='px-3 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-indigo-300'>
                    <Link href='/login'>Login</Link>
                </p>
            )}
        </>
    );
};

export default NavAction;
