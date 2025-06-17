export async function POST(req) {
    // Grab data from CLIENT
    const formData = await req.json(); // Grab the form data
    const { email, password } = formData;

    // Check with the database if active user.
    

    return Response.json({ message: "Success!" });
}
