import Campaign from '@/models/campaigns';
import connectDB from '@/lib/dbConnection';

// Grab all campaigns for a company
export async function getCampaigns(uuid) {
    if (!uuid) {
        throw new Error('Company id is required');
    }

    try {
        await connectDB();
        const campaigns = await Campaign.find({ company: uuid }).lean(); // return plain JS objects instead of Mongoose document

        return JSON.parse(JSON.stringify(campaigns)); // Convert any reaming Mongoose objects to JS objects
    } catch (error) {
        throw new Error(error);
    }
}