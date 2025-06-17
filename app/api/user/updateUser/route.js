import { auth } from "@/auth";
import { updateInfluencer, updateCompany } from "@/queries/User/user_queries";

export async function PUT(req) {
    const user_data = await req.json();
    const user_session = await auth();
    if (!user_session) {
        return Response.json({ message: "Not authenticated" });
    }
    const user_id = user_session.user.id;

    if (user_data.userType === "influencer") {
        const updatedUser = await updateInfluencer(user_id, user_data);
        return Response.json({ newUser: updatedUser });
    } else if (user_data.userType === "company") {
        const updatedUser = await updateCompany(user_id, user_data);
        return Response.json({ newUser: updatedUser });
    }

    return Response.json({ message: "No user was updated." });
}
