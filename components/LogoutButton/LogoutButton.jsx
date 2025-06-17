import { signOut } from "next-auth/react";

const LogoutButton = ({ session }) => {
    return (
        <button
            onClick={signOut}
            className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50'>
            Logout
        </button>
    );
};

export default LogoutButton;
