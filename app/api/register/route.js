import connectDB from "@/lib/dbConnection";
import { createUser, getUserFromEmail } from "@/queries/User/user_queries";
import { saltAndHashPassword } from "@/utils/hashpw";
export async function POST(req) {
    try {
        // Grab data from CLIENT
        const formData = await req.json(); // Grab the form data
        const { name, email, password } = formData;

        // Validate data
        if (!name || !email || !password) {
            return Response.json({ message: "All fields are required" }, { status: 400 });
        }

        // Validate password strength
        if (password.length < 8) {
            return Response.json({ message: "Password must be at least 8 characters long" }, { status: 400 });
        }

        // Establish DB Connection
        await connectDB();

        // Check if user exists
        const userExists = await getUserFromEmail(email);
        if (userExists) {
            return Response.json({ message: "User already exists with this email" }, { status: 400 });
        }

        // hash password for formated user data
        const hashedPassword = await saltAndHashPassword(password);

        // Formated user data to be saved in DB
        const userData = {
            name,
            email,
            password: hashedPassword,
        };

        // Format response user object to send back to client
        const user = {
            email,
            accountProvider: 'credentials',
        };

        // console.log('User data:', userData);
        // console.log("user:", user);

        // Let create the user
        await createUser(userData);

        return Response.json({ message: "Account created successfully!", user }, { status: 201 });
    } catch (error) {
        console.error('Register error:', error);
        return Response.json({ message: "An unexpected error occured" }, { status: 500 });
    }
}
