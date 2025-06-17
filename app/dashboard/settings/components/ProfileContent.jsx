import Image from "next/image";
import { Pencil } from "lucide-react";
import EditableInfluencerCard from "./EditableInfluencerCard";
import EditableCompanyCard from "./EditableCompanyCard";
import EditableProfileContainer from "./EditableProfileContainer";

const ProfileContent = ({ initialUserData }) => {
    const user_data = initialUserData;
    const clean_user_data = {
        name: user_data?.name || "",
        email: user_data?.email || "",
        profileImageURL: user_data?.profileImageURL || "",
        phone_number: user_data?.phone_number,
        bio: user_data?.bio || "",
        companyDesc: user_data?.description || "",
        accountType: user_data?.userType || "",
    };

    return (
        <>
            {user_data?.userType === "influencer" ? <h1 className='text-xl font-semibold mb-8'>My Profile</h1> : <h1 className='text-xl font-semibold mb-8'>Company Profile</h1>}

            {/* Profile Image Container */}
            <EditableProfileContainer user_data={clean_user_data} />

            {/* Profile Container */}
            {user_data?.userType === "influencer" ? <EditableInfluencerCard user_data={clean_user_data} /> : <EditableCompanyCard user_data={clean_user_data} />}

            {/* Social Media Connect */}
            {user_data?.userType === "influencer" ? (
                <div className='border-opacity-70 border border-slate-200 shadow-sm rounded-lg p-4'>
                    <div className='flex justify-between w-full'>
                        <h1 className='text-xl font-semibold'>Social Media</h1>
                        <button className='flex justify-center align-middle items-center h-[30px] border border-gray-400 p-2 rounded-md text-gray-500'>
                            <Pencil className='h-4' />
                            Edit
                        </button>
                    </div>

                    <div className='grid grid-cols-2 mt-4'>
                        <div className='mb-2'>
                            <h1 className='text-gray-500 font-normal text-md mb-1'>First Name</h1>
                            <p className='text-gray-500 font-normal text-sm mb-1'>Jack</p>
                        </div>
                        <div>
                            <h1 className='text-gray-500 font-normal text-md mb-1'>Last Name</h1>
                            <p className='text-gray-500 font-normal text-sm mb-1'>Jack</p>
                        </div>
                        <div className='mb-2'>
                            <h1 className='text-gray-500 font-normal text-md mb-1'>Email</h1>
                            <p className='text-gray-500 font-normal text-sm mb-1'>Jack@gmail.com</p>
                        </div>
                        <div className='mb-2'>
                            <h1 className='text-gray-500 font-normal text-md mb-1'>Phone</h1>
                            <p className='text-gray-500 font-normal text-sm mb-1'>(856) 873-2271</p>
                        </div>
                        <div className='mb-2'>
                            <h1 className='text-gray-500 font-normal'>Bio</h1>
                            <p className='text-gray-500 font-normal text-sm mb-1'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, nisi vero doloremque ducimus sit harum tenetur blanditiis quas totam delectus.</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </>
    );
};

export default ProfileContent;
