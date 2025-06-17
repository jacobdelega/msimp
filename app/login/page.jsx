"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

import { loginAction, providerSignIn } from "@/app/actions/index";

const Login = () => {
    const router = useRouter();

    // Function to handle the form submission using Server Actions
    const handleSubmit = async (formData) => {
        const action = formData.get("action");

        let result;

        if (action === "credentials") {
            result = await loginAction(formData);

            if (result.error) {
                toast.error("Invalid login credentials");
            } else {
                toast.success("Login successful");
                setTimeout(() => {
                    router.push("/dashboard");
                }, 2000);
            }
        } else {
            await providerSignIn(formData);
        }
    };

    return (
        <div className='grid h-screen place-items-center'>
            <div className='p-10 border-t-4 border-blue-400 rounded-lg shadow-lg'>
                <h1 className='my-4 text-xl font-bold'>Enter the details</h1>

                <form
                    action={handleSubmit}
                    className='flex flex-col gap-3'>
                    <input
                        name='email'
                        type='email'
                        placeholder='foo@gmail.com'
                    />
                    <input
                        name='password'
                        type='password'
                        placeholder='foo'
                    />
                    <button
                        type='submit'
                        name='action'
                        value='credentials'
                        className='px-6 py-2 font-bold text-white bg-blue-600 cursor-pointer'>
                        Login
                    </button>

                    {/* Spacer */}
                    <div className='flex gap-2 '>
                        <hr className='w-2/3 my-3' />
                        <p className='font-light text-gray-500'> or </p>
                        <hr className='w-2/3 my-3' />
                    </div>

                    {/* Google Sign in */}
                    <div className='flex justify-center'>
                        <button
                            type='submit'
                            name='action'
                            value='google'
                            className='flex gap-4 cursor-pointer'>
                            <FcGoogle size={30} />
                            <p className='mt-1'>Sign in with Google</p>
                        </button>
                    </div>

                    <Link
                        href='/register'
                        className='mt-3 text-sm text-right'>
                        {" "}
                        Dont have an account? <span className='underline'>Register</span>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
