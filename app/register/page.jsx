"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Register = () => {
    // nextjs router
    const router = useRouter();

    // React-hook-form
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        // Request details - Simple POST method
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        try {
            //  Send request
            const response = await fetch(["/api/register"], requestOptions);

            //  Grab response from backend
            const result = await response.json();
            console.log("Register result:", result); // should have accountProvider and email

            // Check if user was created
            if (response.ok) {
                toast.success(result.message);

                // Timer for redirect to prompt toast
                setTimeout(() => {
                    router.push("/onboarding?email=" + result.user.email + "&account=" + result.user.accountProvider);
                }, 1000);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error("Register error:", error);
            toast.error("An unexpected error occured");
        }
    };

    return (
        <div className='grid h-screen place-items-center'>
            <div className='p-5 border-t-4 border-blue-400 rounded-lg shadow-lg'>
                <h1 className='my-4 text-xl font-bold'>Get Registered</h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col gap-3'>
                    <input
                        type='text'
                        required
                        placeholder='username'
                        {...register("name")}
                    />
                    <input
                        type='text'
                        required
                        placeholder='foo@gmail.com'
                        {...register("email")}
                    />
                    <input
                        type='password'
                        placeholder='password'
                        required
                        {...register("password")}
                    />
                    <button
                        type='submit'
                        className='px-6 py-2 font-bold text-white bg-blue-600 cursor-pointer'>
                        Register
                    </button>

                    <Link
                        href='/login'
                        className='mt-3 text-sm text-right'>
                        Have an account? <span className='underline'>Login</span>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Register;
