"use client";
import { Button } from "@/components/ui/button";

const InstagramAuthButton = () => {
    const handleAuth = async () => {
        const url = "https://api.instagram.com/oauth/access_token";
        const formData = formData();

        // Append the below code to the formData
        formData.append("client_id", "1965805220557878");
        formData.append("client_secret", "Az12kxaA30xA89s&$5sazl");
        formData.append("grant_type", "authorization_code");
        formData.append("redirect_uri", "https://market-simplified.vercel.app/dashboard");
        formData.append(
            "code",
            "AQD0u_-KDuuu6x1MoQS_mddVsTn4j5t4oG4Zpp97ydbs5RFrKBeokw228qQyHt9c-9FgKad2JkljebZJBIZxIA2NTp4UjWibgg3H4dB3ObmoTiStKA74LiJmdO95O6ptOMA2Rx4CEqE0m4urT083-RiC-Mdh7J8E-46L-IHZwTGeEG7LqoAEqVnRS6ASZ2f3ZgTkvdsVDJu58KHx29ZBbjzqlB0mG8zHSl7pCm2lKIoLcw"
        );

        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            console.log("Data:", data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <Button
                onClick={handleAuth}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Authenticate with Instagram
            </Button>
        </div>
    );
};

export default InstagramAuthButton;
