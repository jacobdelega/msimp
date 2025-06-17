"use client";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { app } from "@/lib/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "sonner";

const EditableProfileContainer = ({ user_data }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [file, setFile] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState(user_data?.profileImageURL);
    const [isUploading, setIsUploading] = useState(false);

    const handleEdit = () => {
        setIsEditing(!isEditing); // Set the opposite of the current state
    };

    const handleSave = async () => {
        if (file) {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name; // Unique file name
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            setIsUploading(true);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    console.error("Error during upload:", error);
                    setIsUploading(false);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setProfileImageUrl(downloadURL);

                    console.log("getting ready to send to DB");
                    await saveImageToDB(downloadURL);

                    setIsUploading(false);
                    setIsEditing(false);
                }
            );
        } else {
            setIsEditing(false);
        }
    };

    const saveImageToDB = async (url) => {
        try {
            // Send the data to the server
            const response = await fetch("/api/user/updateProfileImg", {
                method: "PUT",
                headers: { contentType: "application/json" },
                body: JSON.stringify({ profileImageURL: url }),
            });

            const res = await response.json();
            if (res.status === 200) {
                toast.success("Profile image updated");
            } else {
                console.error("Error updating profile image:", res.message);
                toast.error("An error occured updating profile image");
            }
        } catch (error) {
            console.error("Error during update:", error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className='border-opacity-70 border border-slate-200 shadow-sm rounded-lg flex p-4 justify-between mb-8'>
            <div className='flex'>
                <div className='rounded-full overflow-hidden w-[125px] h-[125px]'>
                    <Image
                        src={profileImageUrl}
                        width={125}
                        height={125}
                        className='w-full h-full object-cover aspect-auto'
                        alt='Profile Image'
                    />
                </div>

                <div className='ml-4 flex flex-col justify-center'>
                    <h1 className='text-xl font-semibold'>{user_data?.name.charAt(0).toUpperCase() + user_data?.name.slice(1)}</h1>
                    <p className='text-gray-500'> {user_data?.accountType.charAt(0).toUpperCase() + user_data?.accountType.slice(1)}</p>
                </div>
            </div>
            {isEditing ? (
                <div className='space-x-2'>
                    <input
                        type='file'
                        onChange={handleFileChange}
                    />
                    <Button
                        onClick={handleSave}
                        disabled={isUploading}>
                        {isUploading ? "Saving..." : "Save"}
                    </Button>
                    <Button
                        variant='outline'
                        onClick={handleCancel}>
                        Cancel
                    </Button>
                </div>
            ) : (
                <button
                    onClick={handleEdit}
                    className='flex justify-center align-middle items-center h-[30px] border border-gray-400 p-2 rounded-md text-gray-500'>
                    <Pencil className='h-4' />
                    Edit
                </button>
            )}
        </div>
    );
};

export default EditableProfileContainer;
