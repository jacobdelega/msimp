import SideNav from "@/components/SideNav/SideNav";
import DashboardHeader from "@/components/DashboardHeader/DashboardHeader";
import CreateCampaignForm from "@/components/Campaigns/CreateCampaignForm";
import { getCampaignById } from "@/queries/Campaigns/campaign_queries";
export default async function EditCampaign({ params }) {
    const campaign_data = await getCampaignById(params._id);
    return (
        <div className='flex min-h-screen w-full flex-col bg-muted/40'>
            <SideNav />
            <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
                <DashboardHeader path={["Campaigns", "Create"]} />
                <main className='py-6'>
                    <CreateCampaignForm existingCampaign={campaign_data} />
                </main>
            </div>
        </div>
    );
}
