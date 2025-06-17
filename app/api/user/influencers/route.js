import { getActiveInfluencers } from "@/queries/User/user_queries";

export async function GET() {
    try {
        const influencers = await getActiveInfluencers();
        return Response.json(influencers);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
