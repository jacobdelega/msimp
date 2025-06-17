import SideNav from "@/components/SideNav/SideNav";
import DashboardHeader from "@/components/DashboardHeader/DashboardHeader";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import dynamic from "next/dynamic";

const DynamicProfile = dynamic(() => import("./components/ProfileContent"), { ssr: false });

// User Queries
import { getUserFromID } from "@/queries/User/user_queries";

export default async function page() {
    const user_session = await auth();
    // If user is not logged in, redirect to login page
    if (!user_session) {
        redirect("/login");
        return;
    }
    // Get user from ID
    const user_data = await getUserFromID(user_session?.user?.id);

    const initialData = {
        name: user_data?.name,
        email: user_data?.email,
        userType: user_data?.userType,
        profileImageURL: user_data?.profileImageURL,
        bio: user_data?.influencer?.bio || "",
        description: user_data?.company?.companyDescription || "",
        phone_number: user_data?.phoneNumber,
    };

    return (
        <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
            <SideNav />
            <DashboardHeader path={["Dashboard", "Settings"]} />
            <main className='mx-8'>
                <Suspense fallback={<div>Loading...</div>}>
                    <DynamicProfile initialUserData={initialData} />
                </Suspense>
            </main>
        </div>
    );
}
