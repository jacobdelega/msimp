// route.js
import connectDB from "../../../lib/dbConnection";
import Email from "../../../models/emails";

export async function POST(req) {
    await connectDB();

    if (!req.body) { // Handle missing form data
        return res.status(400).json({ message: 'Missing form data' });
    }

    const formData = await req.formData(); // Access form data
    const name = formData.get('name');
    const email = formData.get('email');

    // Let add the user
    const user_email = new Email({ name, email });
    await user_email.save(); // Save to database

    return Response.json({name, email})
}
