import connectDB from "@/lib/dbConnection";
import Campaign from "@/models/campaigns";

// API route to update a campaign by ID
export async function PUT(req, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const updateData = await req.json();
    
    if (!id) {
      return Response.json({ error: "Campaign ID is required" }, { status: 400 });
    }
    
    // Find campaign by ID and update it
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // return the updated document and run schema validators
    );
    
    if (!updatedCampaign) {
      return Response.json({ error: "Campaign not found" }, { status: 404 });
    }
    
    return Response.json({ 
      message: "Campaign updated successfully",
      campaign: updatedCampaign 
    }, { status: 200 });
    
  } catch (error) {
    console.error("Campaign update error:", error);
    return Response.json({ error: "Error updating campaign" }, { status: 500 });
  }
}