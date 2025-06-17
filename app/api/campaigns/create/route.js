import connectDB from "@/lib/dbConnection";
import Campaign from "@/models/campaigns";

// User wants to create a campaign
export async function POST(req) {
    if (!req) {
        throw new Error("Campaign data is required");
    }

    try {
        await connectDB();
        const formData = await req.json();

        // Create Campaign
        const newCampaign = await Campaign.create(formData);
        return Response.json({ message: formData.status === "draft" ? "Campaign saved as draft" : "Campaign created successfully",
            campaign: newCampaign 
        }, { status: 200 }); } catch (error) {
        return Response.json({ message: "Error creating campaign"}, { status: 500 });
    }
}