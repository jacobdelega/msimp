"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const EditableCompanyCard = ({ user_data }) => {
    const handleUpdateCompany = async (data) => {
        try {
            // Send the data to the server
            const response = await fetch("/api/user/updateUser", {
                method: "PUT",
                headers: { contentType: "application/json" },
                body: JSON.stringify(data),
            });

            const res = await response.json();
        } catch (error) {}
    };

    const [isEditing, setIsEditing] = useState(false);

    const [editedData, setEditedData] = useState({
        name: user_data?.name,
        email: user_data?.email,
        phone_number: user_data?.phone_number,
        companyDesc: user_data?.companyDesc,
        userType: user_data?.accountType,
    });

    const handleEdit = () => {
        setIsEditing(!isEditing); // Set the opposite of the current state
    };

    const handleSave = () => {
        handleUpdateCompany(editedData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedData({
            name: user_data?.name,
            email: user_data?.email,
            phone_number: user_data?.phone_number,
            companyDesc: user_data?.companyDesc,
        });
        setIsEditing(false);
    };

    const handleChange = (field) => (e) => {
        setEditedData({
            ...editedData,
            [field]: e.target.value,
        });
    };

    return (
        <div className='border-opacity-70 border border-slate-200 shadow-sm rounded-lg p-4 mb-8'>
            <div className='flex justify-between w-full mb-4'>
                <h1 className='text-xl font-semibold'>Company information</h1>
                {isEditing ? (
                    <div className='space-x-2'>
                        <Button onClick={handleSave}>Save</Button>
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

            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <h1 className='text-gray-500 font-normal text-md mb-1'>Name</h1>
                    {isEditing ? (
                        <Input
                            value={editedData.name}
                            onChange={handleChange("name")}
                        />
                    ) : (
                        <p className='text-gray-500 font-normal text-sm'>{user_data?.name}</p>
                    )}
                </div>
                <div>
                    <h1 className='text-gray-500 font-normal text-md mb-1'>Email</h1>
                    {isEditing ? (
                        <Input
                            value={editedData.email}
                            onChange={handleChange("email")}
                        />
                    ) : (
                        <p className='text-gray-500 font-normal text-sm'>{user_data?.email}</p>
                    )}
                </div>
                <div>
                    <h1 className='text-gray-500 font-normal text-md mb-1'>Phone</h1>
                    {isEditing ? (
                        <Input
                            value={editedData.phone_number}
                            onChange={handleChange("phone_number")}
                        />
                    ) : (
                        <p className='text-gray-500 font-normal text-sm'>
                            ({editedData.phone_number.slice(0, 3)})-{editedData.phone_number.slice(3, 6)}-{editedData.phone_number.slice(6)}
                        </p>
                    )}
                </div>
                <div>
                    <h1 className='text-gray-500 font-normal text-md mb-1'>Bio</h1>
                    {isEditing ? (
                        <Textarea
                            value={editedData.companyDesc}
                            onChange={handleChange("companyDesc")}
                            className='h-24'
                        />
                    ) : (
                        <p className='text-gray-500 font-normal text-sm'>{user_data?.companyDesc}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditableCompanyCard;
