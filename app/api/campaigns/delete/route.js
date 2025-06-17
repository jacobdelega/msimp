import { auth } from "@/auth";
import connectDB from "@/lib/dbConnection";
import Campaign from "@/models/campaigns";

export async function DELETE(req) {
    try {
        const userData = await auth();
        if (!userData) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const { campaignIds } = await req.json();

        if (!campaignIds || !Array.isArray(campaignIds)) {
            return Response.json({ error: "Invalid request data" }, { status: 400 });
        }

        // Delete campaigns and ensure they belong to the current user
        const result = await Campaign.deleteMany({
            _id: { $in: campaignIds },
            company: userData.user.id
        });

        if (result.deletedCount === 0) {
            return Response.json({ error: "No campaigns were deleted" }, { status: 404 });
        }

        return Response.json({
            message: `Successfully deleted ${result.deletedCount} campaign(s)`,
            deletedCount: result.deletedCount
        }, { status: 200 });

    } catch (error) {
        console.error("Error deleting campaigns:", error);
        return Response.json({ error: "Failed to delete campaigns" }, { status: 500 });
    }
}