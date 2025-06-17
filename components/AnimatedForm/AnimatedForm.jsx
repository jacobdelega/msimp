"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import AutoHeight from "react-auto-height";
import { FaArrowLeft } from "react-icons/fa";
import { useSearchParams, useRouter } from "next/navigation";

// ShadCN
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { completeProfile } from "@/app/actions";
import { toast } from "sonner";

const niches = ["fitness", "travel", "fashion", "cooking", "beauty", "pets", "lifestyle", "education"];

const AnimatedForm = () => {
    // TODO: VERIFY FORM ENTRYS WITH VALIDATION AND PROVIDE VALID RESPONSES IF NOT VALID.
    // TODO: EXAMPLE VERIFY PHONE NUMBER IS VALID AND IN CORRECT FORMAT BEFORE TRIGGERING SERVER ACTION

    const [section, setSection] = useState(0);
    const [isBack, setIsBack] = useState(false);
    const [formData, setFormData] = useState({});
    const [phoneNumber, setPhoneNumber] = useState("");
    const router = useRouter();

    // Grab searchParams from the URL
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const accountProvider = searchParams.get("account");

    // Set the initial form data
    // This data comes from the Register page
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            email,
            provider: accountProvider,
        }));
    }, [email, accountProvider]);

    const changeSection = (i, isBack) => {
        // Set animation state
        setIsBack(isBack);

        // Clear specific data when navigating back
        if (isBack && i < section) {
            setFormData((prev) => {
                // Create a copy of the current form data
                const updatedFormData = { ...prev };

                // Clear data based on section
                if (i === 0) {
                    // If going back to section 0, clear userType and related fields
                    delete updatedFormData.userType;
                    delete updatedFormData.niche;
                    delete updatedFormData.name;
                    delete updatedFormData.bio;
                    delete updatedFormData.companyDescription;
                    delete updatedFormData.isProfileComplete;
                    delete updatedFormData.phone_number;
                } else if (i === 1) {
                    // If going back to section 1, clear contentNiche or companyName
                    if (prev.userType === "influencer") {
                        delete updatedFormData.niche;
                    } else if (prev.userType === "company") {
                        delete updatedFormData.name;
                    }
                }

                return updatedFormData;
            });
        }

        // Update current section
        setSection(i);
    };

    const handleSelectChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            userType: value,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Verify phone number is valid
        if (name === "phone_number") {
            const phoneNumber = value.replace(/[^\d]/g, ""); // Remove all non-numeric characters
            setPhoneNumber(phoneNumber);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\d{10}$/; // 10 digits
        return phoneRegex.test(phoneNumber);
    };

    const handleNextButton = () => {
        if (formData.phone_number) {
            if (validatePhoneNumber(formData.phone_number)) {
                changeSection(section + 1, false);
            } else {
                toast.error("Enter a valid 10-digit phone number");
            }
        } else {
            changeSection(section + 1, false);
        }
    };

    const handleCompleteButton = async () => {
        // Trigger server action
        const result = await completeProfile(formData);

        // Check result
        if (result.error) {
            toast.error(result.error);
        } else if (result.success) {
            toast.success(result.success);
            router.push("/dashboard");
        }
    };

    return (
        <div className='w-full h-screen flex flex-col gap-4 space-y-5 sm:space-y-0 items-center justify-center'>
            <div className='w-full max-w-md flex items-center justify-around space-x-3'>
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className={`${
                            (section < i && "bg-gray-100 dark:bg-gray-900  h-2 ") || (section > i && "bg-green-500 dark:bg-green-500  h-2") || "p-0 bg-green-100 dark:bg-green-900"
                        }  w-full rounded flex items-center justify-center transition-bg duration-300 ease-in-out`}>
                        {section === i && (
                            <motion.div
                                className='w-full h-2 rounded flex items-center justify-center bg-green-100 dark:bg-green-900'
                                layoutId='bg'
                            />
                        )}
                    </div>
                ))}
            </div>
            <AutoHeight className='relative inline-block h-full w-full max-w-md xl:max-w-xl overflow-hidden text-center align-middle border border-gray-200 dark:border-gray-700 rounded-2xl transition-all'>
                {section !== 0 && (
                    <button
                        onClick={() => changeSection(section - 1, true)}
                        className='absolute z-10 left-10 top-5 inline-flex items-center justify-center gap-2 hover:underline'>
                        <FaArrowLeft /> Back
                    </button>
                )}
                {section === 0 && (
                    <motion.div
                        style={isBack ? { x: -200, opacity: 0 } : { x: 200, opacity: 0 }}
                        animate={isBack ? { translateX: 200, opacity: 1 } : { translateX: -200, opacity: 1 }}
                        className='my-16'>
                        <div className='flex flex-col h-40 justify-center items-center'>
                            <p className='mb-4'>What type of user account</p>
                            <Select onValueChange={handleSelectChange}>
                                <SelectTrigger className='w-[180px]'>
                                    <SelectValue placeholder='Select user account' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value='influencer'>Influencer</SelectItem>
                                        <SelectItem value='company'>Company</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <button
                            onClick={() => handleNextButton()}
                            className='w-32 h-10 bg-black text-white rounded-lg text-xl'>
                            Next
                        </button>
                    </motion.div>
                )}

                {section === 1 && (
                    <motion.div
                        style={isBack ? { x: -200, opacity: 0 } : { x: 200, opacity: 0 }}
                        animate={isBack ? { translateX: 200, opacity: 1 } : { translateX: -200, opacity: 1 }}
                        className='my-16'>
                        {formData.userType === "influencer" ? (
                            <>
                                <div className='flex flex-col h-40 justify-center items-center'>
                                    <p className='mb-4'>What type of content?</p>
                                    <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, niche: value }))}>
                                        <SelectTrigger className='w-[180px]'>
                                            <SelectValue placeholder='Select niche' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {niches.map((niche) => {
                                                    return (
                                                        <SelectItem
                                                            key={niche}
                                                            value={niche}>
                                                            {niche.charAt(0).toUpperCase() + niche.slice(1)}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <button
                                    onClick={() => handleNextButton()}
                                    className='w-32 h-10 bg-black text-white rounded-lg text-xl'>
                                    Next
                                </button>
                            </>
                        ) : (
                            // Else will be company
                            <>
                                <div className='flex flex-col h-40 justify-center items-center'>
                                    <p className='mb-4'>Company Name?</p>
                                    <input
                                        onChange={handleInputChange}
                                        type='text'
                                        name='name'
                                        placeholder='Company Name'
                                        className='w-52 h-10 bg-gray-100 dark:bg-gray-900 rounded-lg px-3'
                                    />
                                </div>
                                <button
                                    onClick={() => handleNextButton()}
                                    className='w-32 h-10 bg-black text-white rounded-lg text-xl'>
                                    Next
                                </button>
                            </>
                        )}
                    </motion.div>
                )}

                {section === 2 && (
                    <motion.div
                        style={isBack ? { x: -200, opacity: 0 } : { x: 200, opacity: 0 }}
                        animate={isBack ? { translateX: 200, opacity: 1 } : { translateX: -200, opacity: 1 }}
                        className='my-16'>
                        {formData.userType === "influencer" ? (
                            <>
                                <div className='flex flex-col h-40 justify-center items-center'>
                                    <p className='mb-4'>Enter a profile bio</p>
                                    <textarea
                                        name='bio'
                                        rows='4'
                                        cols='50'
                                        onChange={handleInputChange}
                                        className='border border-black rounded-sm p-2'
                                        placeholder='Example text'></textarea>
                                </div>

                                <button
                                    onClick={() => handleNextButton()}
                                    className='w-32 h-10 bg-black text-white rounded-lg text-xl mt-4'>
                                    Next
                                </button>
                            </>
                        ) : (
                            // Else will be company
                            <>
                                <div className='flex flex-col h-40 justify-center items-center'>
                                    <p className='mb-4'>Company description</p>
                                    <textarea
                                        name='companyDescription'
                                        rows='4'
                                        cols='50'
                                        onChange={handleInputChange}
                                        className='border border-black rounded-sm p-2'
                                        placeholder='Example text'></textarea>
                                </div>
                                <button
                                    onClick={() => handleNextButton()}
                                    className='w-32 h-10 bg-black text-white rounded-lg text-xl mt-4'>
                                    Next
                                </button>
                            </>
                        )}
                    </motion.div>
                )}

                {section === 3 && (
                    <motion.div
                        style={isBack ? { x: -200, opacity: 0 } : { x: 200, opacity: 0 }}
                        animate={isBack ? { translateX: 200, opacity: 1 } : { translateX: -200, opacity: 1 }}
                        className='my-16'>
                        {formData.userType === "influencer" ? (
                            <>
                                <div className='flex flex-col h-40 justify-center items-center'>
                                    <p className='mb-4'>Enter Mobile Phone</p>
                                    <input
                                        onChange={handleInputChange}
                                        type='text'
                                        name='phone_number'
                                        value={phoneNumber}
                                        placeholder='123 425 2304'
                                        className='w-52 h-10 bg-gray-100 dark:bg-gray-900 rounded-lg px-3'
                                    />
                                </div>

                                <button
                                    onClick={() => handleNextButton()}
                                    className='w-32 h-10 bg-black text-white rounded-lg text-xl mt-4'>
                                    Next
                                </button>
                            </>
                        ) : (
                            // Else will be company
                            <>
                                <div className='flex flex-col h-40 justify-center items-center'>
                                    <p className='mb-4'>Enter Company Number</p>
                                    <input
                                        onChange={handleInputChange}
                                        type='text'
                                        name='phone_number'
                                        value={phoneNumber}
                                        placeholder='123 425 2304'
                                        className='w-52 h-10 bg-gray-100 dark:bg-gray-900 rounded-lg px-3'
                                    />
                                </div>
                                <button
                                    onClick={() => handleNextButton()}
                                    className='w-32 h-10 bg-black text-white rounded-lg text-xl mt-4'>
                                    Next
                                </button>
                            </>
                        )}
                    </motion.div>
                )}
                {section === 4 && (
                    <motion.div
                        style={isBack ? { x: -200, opacity: 0 } : { x: 200, opacity: 0 }}
                        animate={isBack ? { translateX: 200, opacity: 1 } : { translateX: -200, opacity: 1 }}
                        className='my-16'>
                        <div className='h-40 flex flex-col items-center'>
                            <p>Verify all information is correct:</p>
                            {formData.userType === "influencer" ? (
                                <>
                                    <p> Account Type: {formData.userType}</p>
                                    <p> Account Niche: {formData.niche}</p>
                                    <p> Account Bio: {formData.bio}</p>
                                    <p> Account Phone Number: {formData.phone_number}</p>
                                </>
                            ) : (
                                <>
                                    <p> Account Type: {formData.userType}</p>
                                    <p> Company Name: {formData.name}</p>
                                    <p> Company Description: {formData.companyDescription}</p>
                                    <p> Company Phone Number: {formData.phone_number}</p>
                                </>
                            )}
                        </div>
                        {/* TODO: Setup to send formData */}
                        <button
                            onClick={handleCompleteButton}
                            className='w-32 h-10 bg-black text-white rounded-lg text-xl'>
                            Complete
                        </button>
                    </motion.div>
                )}
            </AutoHeight>
        </div>
    );
};

export { AnimatedForm };
