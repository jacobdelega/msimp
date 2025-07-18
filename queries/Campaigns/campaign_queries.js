import Campaign from '@/models/campaigns';
import connectDB from '@/lib/dbConnection';

// Grab all campaigns for a company
export async function getCampaigns(uuid) {
    if (!uuid) {
        throw new Error('Company id is required');
    }

    try {
        await connectDB();
        const campaigns = await Campaign.find({ company: uuid });

        return campaigns.map(campaign => campaign.toPrivateJSON());
    } catch (error) {
        throw new Error(error);
    }
}

// Grab a single campaign by id
export async function getCampaignById(uuid) {
    if (!uuid) {
        throw new Error('Campaign id is required');
    }
    try {
        await connectDB();
        const campaign = await Campaign.findById(uuid);
        
        return campaign ? campaign.toPrivateJSON() : null;
    } catch (error) {
        throw new Error(error);
    }
}