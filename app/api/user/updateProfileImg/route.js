// PUT method
import { auth } from "@/auth";
import { updateProfileImg } from "@/queries/User/user_queries";

export async function PUT(req) {
    try {
        const user_session = await auth();
    
        if (!user_session) {
            return Response.json({ message: "Not authenticated" });
        }
    
        const user_id = user_session.user.id;
        const user_data = await req.json();
    
        // Data validation
        if (!user_data || !user_data.profileImageURL) {
            return new Response(JSON.stringify({ message: "Invalid data: profileImageURL is required", status:400 }));
        }
    
        // Update user in the database
        // Use the user_id and user_data.profileImageURL to update the user's profile image
        await updateProfileImg(user_id, user_data.profileImageURL);
    
    
        return Response.json({ message: "User updated", status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message, status:500 }));
    }

}