import User from "@/models/users";
import connectDB from "@/lib/dbConnection";
// Create user
export async function createUser(userData) {
    if (!userData) {
        throw new Error("User data is required");
    }
    try {
        await connectDB();
        const activeUser = await getUserFromEmail(userData.email);

        if (!activeUser) {
            const newUser = await User.create(userData);
        } else {
            throw new Error("User already exists");
        }
    } catch (error) {
        throw new Error(error);
    }
}

export async function getUserFromDb(email, hashedPassword) {
    if (!email || !hashedPassword) {
        throw new Error("Email and password are required");
    }

    const user = User.findOne({
        email,
        password: hashedPassword,
    });

    return user;
}

export async function getUserFromEmail(email) {
    if (!email) {
        throw new Error("Email is required");
    }

    await connectDB();
    const foundUser = await User.findOne({
        email,
    });

    return foundUser;
}

// This fucntion is called only to finish onboarding
// Update user and set isProfileComplete to true
export async function updateProfile(userData) {
    if (!userData) {
        throw new Error("User data is required");
    }

    await connectDB();

    let { email, userType, name, companyDescription, bio, niche, phone_number } = userData;

    let updatedData = {
        email,
        userType,
        name,
        isProfileComplete: true,
        phoneNumber: phone_number,
    };

    if (userType === "company") {
        updatedData.company = {
            companyName: name,
            companyDescription,
        };
    } else if (userType === "influencer") {
        updatedData.influencer = {
            bio,
            niche,
        };
    }

    const updatedUser = await User.findOneAndUpdate({ email }, { $set: updatedData }, { new: true, runValidators: true });

    if (!updatedUser) {
        throw new Error("User not found");
        return { error: "User was no updated" };
    }

    return { success: "User updated successfully" };
}

export async function getUserFromID(userId) {
    if (!userId) {
        throw new Error("User ID is not found");
    }

    await connectDB();

    const user = await User.findById(userId);
    return user;
}

export async function updateInfluencer(user_id, userData) {
    if (!user_id || !userData) {
        throw new Error("User ID and data are required");
    }
    console.log(userData);

    const formatedData = {
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phone_number,
        influencer: {
            bio: userData.bio,
        },
    };

    await connectDB();
    const updatedUser = await User.findByIdAndUpdate(user_id, formatedData, { new: true, runValidators: true });

    return updatedUser;
}

export async function updateCompany(user_id, userData) {
    if (!user_id || !userData) {
        throw new Error("User ID and data are required");
    }

    const formatedData = {
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phone_number,
        company: {
            companyDescription: userData.companyDesc,
        },
    };

    await connectDB();
    const updatedUser = await User.findByIdAndUpdate(user_id, formatedData, { new: true, runValidators: true });

    return updatedUser;
}

// This function is called to update the user's profile image
export async function updateProfileImg(user_id, profileImageURL) {
    if (!user_id || !profileImageURL) {
        throw new Error("User ID and profile image URL are required");
    }

    await connectDB();
    // user_id to find the user
    // profileImageURL is the value for the users profileIMG key
    const updatedUser = await User.findByIdAndUpdate(user_id, { profileImageURL }, { new: true, runValidators: true });

    return updatedUser;
}

export async function getActiveInfluencers() {
    try {
        await connectDB();
        const activeInfluencers = await User.find({ isProfileComplete: true, userType: "influencer" });
        return activeInfluencers;
    } catch (error) {
        throw new Error(error);
    }
}
