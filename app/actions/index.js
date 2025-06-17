"use server";
import { signIn } from "@/auth";
import { updateProfile } from "@/queries/User/user_queries";

export async function loginAction(formData) {
    // Verify action
    const action = formData.get("action");

    if (action === "credentials") {
        try {
            const result = await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirect: false,
            });
            return { success: "Logged In Successfully" };
        } catch (error) {
            return { error: "Invalid Credentials" };
        }
    } else if (action === "google" || action === "github") {
        // For provider sign-in, we'll still redirect
        return signIn(action, { callbackUrl: "/dashboard" });
    }
}

export async function providerSignIn(formData) {
    const action = formData.get("action");
    // For OAuth providers, signIn will redirect the user,
    // so we dont have a return object
    await signIn(action, { redirectTo: "/dashboard" });
}

export async function completeProfile(formData) {
    // Update user data
    const result = await updateProfile(formData);

    // Check result
    if (result.error) {
        return { error: result.error };
    } else if (result.success) {
        return { success: result.success };
    }
}
