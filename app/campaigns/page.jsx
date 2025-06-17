import { auth } from "@/auth";
import { getCampaigns } from "@/queries/Company/company_queries";
import CampaignsPage from "@/components/Campaigns/CampaignsPage";
import SideNav from "@/components/SideNav/SideNav";
import DashboardHeader from "@/components/DashboardHeader/DashboardHeader";
import { redirect } from "next/navigation";

export default async function Campaigns() {
    const userData = await auth();
    if (!userData) {
        redirect("/login");
        return;
    }
    const allCampaigns = await getCampaigns(userData.user.id);

    return (
        <div className='flex min-h-screen w-full flex-col bg-muted/40'>
            <SideNav />
            <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
                <DashboardHeader path={["Campaigns"]} />
                <main className='p-6'>
                    <CampaignsPage
                        allCampaigns={allCampaigns}
                        userData={userData}
                    />
                </main>
            </div>
        </div>
    );
}
