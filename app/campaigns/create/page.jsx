import SideNav from "@/components/SideNav/SideNav";
import DashboardHeader from "@/components/DashboardHeader/DashboardHeader";
import CreateCampaignForm from "@/components/Campaigns/CreateCampaignForm";
import { getCampaignById } from "@/queries/Campaigns/campaign_queries";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";

export default async function Create({ searchParams }) {
    // Validate session first
    const session = await auth();
    if (!session?.user?.id) {
        redirect("/login");
    }

    const editId = searchParams?.edit;
    const isEditMode = !!editId;
    let existingCampaign = null;
    
    // Fetch existing campaign data if in edit mode
    if (isEditMode) {
        try {
            existingCampaign = await getCampaignById(editId);
            if (!existingCampaign) {
                notFound();
            }
        } catch (error) {
            console.error("Error fetching campaign for edit:", error);
            notFound();
        }
    }
    
    const headerPath = isEditMode 
        ? ["Campaigns", existingCampaign?.name || "Edit", "Edit"]
        : ["Campaigns", "Create"];
    
    return (
        <div className='flex min-h-screen w-full flex-col bg-muted/40'>
            <SideNav />
            <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
                <DashboardHeader path={headerPath} />
                <main className='py-6'>
                    <CreateCampaignForm existingCampaign={existingCampaign} userId={session?.user?.id} />
                </main>
            </div>
        </div>
    );
}
