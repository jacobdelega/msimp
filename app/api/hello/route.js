// route.js
import connectDB from "../../../lib/dbConnection";

export async function GET(req) {
    await connectDB();
    return new Response("Success!")
};
