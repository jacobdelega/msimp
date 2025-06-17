import SideNav from "@/components/SideNav/SideNav";
import DashboardHeader from "@/components/DashboardHeader/DashboardHeader";
import { getCampaignById } from "@/queries/Campaigns/campaign_queries";
import ViewCampaign from "@/components/Campaigns/ViewCampaign";
export default async function Campaigns() {
    const practiceId = "681aa0ace067500f862f5cca";
    const campaign = await getCampaignById(practiceId);

    return (
        <div className='flex min-h-screen w-full flex-col bg-muted/40'>
            <SideNav />
            <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
                <DashboardHeader path={["Campaigns", "View Campaign"]} />
                <main className='p-6'>
                    <ViewCampaign campaign={campaign} />
                </main>
            </div>
        </div>
    );
}
