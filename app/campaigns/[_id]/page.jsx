import { getCampaignById } from "@/queries/Campaigns/campaign_queries";
import ViewCampaign from "@/components/Campaigns/ViewCampaign";
import SideNav from "@/components/SideNav/SideNav";
import DashboardHeader from "@/components/DashboardHeader/DashboardHeader";
import { notFound } from "next/navigation";

const CampaignDetails = async ({ params }) => {
    try {
        const { _id } = params;
        
        if (!_id) {
            notFound();
        }

        const campaign = await getCampaignById(_id);
        
        if (!campaign) {
            notFound();
        }

        return (
            <div className='flex min-h-screen w-full flex-col bg-muted/40'>
                <SideNav />
                <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
                    <DashboardHeader path={["Campaigns", campaign.name]} />
                    <main className='p-6'>
                        <ViewCampaign campaign={campaign} />
                    </main>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error loading campaign:", error);
        return (
            <div className='flex min-h-screen w-full flex-col bg-muted/40'>
                <SideNav />
                <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
                    <DashboardHeader path={["Campaigns"]} />
                    <main className='p-6'>
                        <div className="flex items-center justify-center min-h-[400px]">
                            <div className="text-center">
                                <h2 className="text-xl font-semibold text-gray-700">Error loading campaign</h2>
                                <p className="text-gray-500 mt-2">Please try again later or contact support if the problem persists.</p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
};

export default CampaignDetails;
