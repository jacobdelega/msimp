"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CampaignForm = ({ existingCampaign = null }) => {
    const { data: session } = useSession();
    const userId = session?.user?.id;

    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        company: userId,
        objective: "",
        startDate: null,
        endDate: null,
        budget: 1000,
        contentTypes: [],
        targetNiches: [],
        keyMessages: [],
        requirements: {
            description: "",
            hashtags: false,
            disclosure: true,
            tag_brand: true,
        },
        status: "draft",
        guidelineFileName: "",
    });

    const isEditMode = !!existingCampaign;
    const [message, setMessage] = useState(""); // State for adding singleton key message
    const [isUploading, setIsUploading] = useState(false); // State for uploading document

    // Only preload form data if in edit mode
    useEffect(() => {
        if (existingCampaign) {
            setFormData({
                ...existingCampaign,
            });
        }
    }, [existingCampaign]);

    // Content options
    const contentTypeOptions = ["Instagram Post", "Instagram Story", "Instagram Reel", "TikTok", "YouTube", "Blog Post"];
    const nicheOptions = [
        "Beauty & Cosmetics",
        "Fashion & Style",
        "Health & Fitness",
        "Food & Cooking",
        "Travel & Adventure",
        "Tech & Gadgets",
        "Gaming",
        "Home & Decor",
        "Finance & Business",
        "Education & Learning",
        "Art & Creativity",
        "Parenting & Family",
        "Sports",
        "Lifestyle",
        "Entertainment",
        "Sustainability",
    ];

    const handleContentTypeToggle = (type) => {
        setFormData((prevState) => ({
            ...prevState,
            contentTypes: prevState.contentTypes.includes(type) ? prevState.contentTypes.filter((item) => item !== type) : [...prevState.contentTypes, type],
        }));
    };

    const handleNicheToggle = (niche) => {
        setFormData((prevState) => ({
            ...prevState,
            targetNiches: prevState.targetNiches.includes(niche) ? prevState.targetNiches.filter((item) => item !== niche) : [...prevState.targetNiches, niche],
        }));
    };

    const handleKeyMessage = (action, index = null) => {
        if (action === "add") {
            if (message.trim() === "") return;
            setFormData((prevState) => ({
                ...prevState,
                keyMessages: [...prevState.keyMessages, message],
            }));
            setMessage("");
        } else if (action === "remove" && index !== null) {
            setFormData((prevState) => ({
                ...prevState,
                keyMessages: prevState.keyMessages.filter((_, i) => i !== index),
            }));
        }
    };

    // Campaign contract upload
    // TODO: Implement file upload logic
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setIsUploading(true);
            // Simulate file upload or handle file storage logic here
            setTimeout(() => {
                setFormData((prevState) => ({
                    ...prevState,
                    guidelineFileName: file.name,
                }));
                setIsUploading(false);
                toast.success("File uploaded successfully");
            }, 1500);
        } else {
            toast.error("No file selected");
        }
    };

    const handleSubmitAction = async (e, action) => {
        e.preventDefault();

        try {
            const url = isEditMode ? `/api/campaigns/${formData._id}/update` : "/api/campaigns/create";
            const method = isEditMode ? "PUT" : "POST";
            const status = action === "submit" ? "active" : "draft";
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData, status, company: session.user.id }),
            });

            if (response.ok && response.status === 200) {
                toast.success(`Campaign ${action === "submit" ? "created" : "saved as draft"} successfully`);
                router.push("/campaigns");
            } else {
                toast.error(`Campaign failed to ${action === "submit" ? "create" : "save as draft"}`);
            }
        } catch (error) {
            console.error(`Error ${action === "submit" ? "creating" : "saving draft"} campaign:`, error);
            toast.error(`An error occurred while ${action === "submit" ? "creating" : "saving draft"} the campaign`);
        }
    };

    const handleNext = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className='w-full max-w-4xl mx-auto py-8 px-4'>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='mb-8 text-center'>
                <h1 className='text-3xl font-bold mb-2'>Create New Campaign</h1>
                <p className='text-gray-500'>Connect with influencers to promote your brand</p>
            </motion.div>

            <div className='mb-8'>
                <div className='flex justify-between items-center mb-6'>
                    {[1, 2, 3, 4].map((step) => (
                        <motion.div
                            key={step}
                            className={`flex flex-col items-center ${currentStep >= step ? "text-blue-500" : "text-gray-400"}`}
                            whileHover={{ scale: 1.05 }}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep === step ? "bg-blue-500 text-white" : currentStep > step ? "bg-blue-100 text-blue-500" : "bg-gray-100 text-gray-400"}`}>
                                {currentStep > step ? "✓" : step}
                            </div>
                            <span className='text-sm'>
                                {step === 1 && "Campagin"}
                                {step === 2 && "Content"}
                                {step === 3 && "Requirements"}
                                {step === 4 && "Review"}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <Card className='w-full shadow-lg'>
                <CardHeader className='bg-gradient-to-r from-blue-50 to-indigo-50 border-b'>
                    <CardTitle>
                        {currentStep === 1 && "Campaign Basics"}
                        {currentStep === 2 && "Content Details"}
                        {currentStep === 3 && "Requirements & Guidelines"}
                        {currentStep === 4 && "Review & Submit"}
                    </CardTitle>
                    <CardDescription>
                        {currentStep === 1 && "Provide the essential details of your campaign"}
                        {currentStep === 2 && "What type of content are you looking for?"}
                        {currentStep === 3 && "Set requirements for influencers"}
                        {currentStep === 4 && "Review your campaign before submitting"}
                    </CardDescription>
                </CardHeader>

                <CardContent className='py-6'>
                    <div>
                        {/* Step 1: Campaign Basics */}
                        {currentStep === 1 && (
                            <motion.div
                                initial='hidden'
                                animate='visible'
                                variants={fadeIn}
                                className='space-y-6'>
                                <div className='space-y-2'>
                                    <Label htmlFor='name'>
                                        Campaign Name <span className='text-red-500'>*</span>
                                    </Label>
                                    <Input
                                        id='name'
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder='Spring Collection Launch'
                                        required
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor='objective'>
                                        Campaign Objective <span className='text-red-500'>*</span>
                                    </Label>
                                    <Select
                                        onValueChange={(value) => setFormData({ ...formData, objective: value })}
                                        value={formData.objective}>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select campaign objective' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='brand_awareness'>Brand Awareness</SelectItem>
                                            <SelectItem value='product_launch'>Product Launch</SelectItem>
                                            <SelectItem value='sales_conversion'>Sales Conversion</SelectItem>
                                            <SelectItem value='audience_growth'>Audience Growth</SelectItem>
                                            <SelectItem value='engagement'>Engagement</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div className='space-y-2'>
                                        <Label>
                                            Start Date <span className='text-red-500'>*</span>
                                        </Label>
                                        <div className='relative'>
                                            <Input
                                                type='date'
                                                className='w-full pl-10'
                                                value={formData.startDate ? new Date(formData.startDate).toISOString().split("T")[0] : ""}
                                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                                required
                                            />
                                            <Calendar className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
                                        </div>
                                    </div>

                                    <div className='space-y-2'>
                                        <Label>
                                            End Date <span className='text-red-500'>*</span>
                                        </Label>
                                        <div className='relative'>
                                            <Input
                                                type='date'
                                                className='w-full pl-10'
                                                value={formData.endDate ? new Date(formData.endDate).toISOString().split("T")[0] : ""}
                                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                                required
                                            />
                                            <Calendar className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
                                        </div>
                                    </div>
                                </div>

                                <div className='space-y-2'>
                                    <Label>Budget (USD)</Label>
                                    <div className='space-y-2'>
                                        <Slider
                                            defaultValue={[formData.budget || 1000]}
                                            min={500}
                                            max={10000}
                                            step={100}
                                            onValueChange={(value) => setFormData({ ...formData, budget: value[0] })}
                                        />
                                        <div className='flex justify-between text-sm text-gray-500'>
                                            <span>$500</span>
                                            <span className='font-medium text-black'>${formData.budget}</span>
                                            <span>$10,000</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {/* Step 2 : Content options */}
                        {currentStep === 2 && (
                            <motion.div
                                initial='hidden'
                                animate='visible'
                                variants={fadeIn}
                                className='space-y-6'>
                                <div className='space-y-2'>
                                    <Label>
                                        Content Types <span className='text-red-500'>*</span>
                                    </Label>
                                    <div className='grid grid-cols-2 md:grid-cols-3 gap-2 mt-2'>
                                        {contentTypeOptions.map((type) => (
                                            <motion.div
                                                key={type}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleContentTypeToggle(type)}
                                                className={`rounded-md border p-3 cursor-pointer flex items-center justify-center text-center transition-colors ${
                                                    formData.contentTypes?.includes(type) ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300"
                                                }`}>
                                                {type}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className='space-y-3 pb-4 mt-2 border-b'>
                                    <Label>
                                        Target Niches <span className='text-red-500'>*</span>
                                    </Label>
                                    <p className='text-sm text-gray-500'>Select the niches that best align with your campaign</p>

                                    <div className='grid grid-cols-2 md:grid-cols-4 gap-2 mt-1'>
                                        {nicheOptions.map((niche) => (
                                            <motion.div
                                                key={niche}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleNicheToggle(niche)}
                                                className={`rounded-md border p-2.5 cursor-pointer flex items-center justify-center text-center transition-colors text-sm ${
                                                    formData.targetNiches?.includes(niche) ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-gray-200 hover:border-gray-300"
                                                }`}>
                                                {niche}
                                            </motion.div>
                                        ))}
                                    </div>

                                    {formData.targetNiches?.length === 0 && <p className='text-sm text-amber-600'>Please select at least one niche</p>}
                                </div>

                                <div className='space-y-2 pt-2'>
                                    <Label>Key Messages</Label>
                                    <div className='flex space-x-2'>
                                        <Input
                                            placeholder='Add a key message for influencers to include'
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                        <Button
                                            type='button'
                                            onClick={() => handleKeyMessage("add")}
                                            className='shrink-0'>
                                            Add
                                        </Button>
                                    </div>

                                    <div className='flex flex-wrap gap-2 mt-2'>
                                        {formData.keyMessages.map((msg, index) => (
                                            <Badge
                                                key={index}
                                                variant='secondary'
                                                className='py-1.5 pl-3 pr-1.5 flex items-center gap-1'>
                                                {msg}
                                                <Button
                                                    type='button'
                                                    variant='ghost'
                                                    size='sm'
                                                    className='h-5 w-5 p-0 rounded-full'
                                                    onClick={() => handleKeyMessage("remove", index)}>
                                                    ✕
                                                </Button>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {/* Step 3: Requirements */}
                        {currentStep === 3 && (
                            <motion.div
                                initial='hidden'
                                animate='visible'
                                variants={fadeIn}
                                className='space-y-6'>
                                <div className='space-y-2'>
                                    <Label htmlFor='description'>Content Requirements</Label>
                                    <Textarea
                                        id='description'
                                        placeholder='Describe what influencers should include in their content'
                                        rows={4}
                                        value={formData.requirements.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                requirements: {
                                                    ...formData.requirements,
                                                    description: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                </div>

                                <div className='space-y-4'>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <Label>Upload Brand Guidelines</Label>
                                            <p className='text-sm text-gray-500'>Share your brand files with influencers</p>
                                        </div>
                                        <label
                                            htmlFor='guidelines'
                                            className={`inline-flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium ${
                                                isUploading ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
                                            }`}
                                            style={{ cursor: isUploading ? "not-allowed" : "pointer" }}>
                                            {isUploading ? "Uploading..." : "Upload File"}
                                        </label>
                                        <Input
                                            type='file'
                                            id='guidelines'
                                            className='hidden' // Hide the file input
                                            accept='.pdf,.doc,.docx'
                                            onChange={handleFileUpload}
                                            disabled={isUploading} // Disable the input while uploading
                                        />
                                    </div>
                                </div>

                                <div className='space-y-4 pt-4 border-t'>
                                    <h3 className='font-medium'>Additional Requirements</h3>

                                    <div className='space-y-3'>
                                        <div className='flex items-center justify-between'>
                                            <div className='space-y-0.5'>
                                                <Label>Use Campaign Hashtags</Label>
                                                <p className='text-sm text-gray-500'>Require influencers to use your hashtags</p>
                                            </div>
                                            <Switch
                                                checked={formData.requirements.hashtags}
                                                onCheckedChange={(checked) =>
                                                    setFormData({
                                                        ...formData,
                                                        requirements: {
                                                            ...formData.requirements,
                                                            hashtags: checked,
                                                        },
                                                    })
                                                }
                                            />
                                        </div>

                                        <div className='flex items-center justify-between'>
                                            <div className='space-y-0.5'>
                                                <Label>Tag Brand</Label>
                                                <p className='text-sm text-gray-500'>Require influencers to tag your brand</p>
                                            </div>
                                            <Switch
                                                checked={formData.requirements.tag_brand}
                                                onCheckedChange={(checked) =>
                                                    setFormData({
                                                        ...formData,
                                                        requirements: {
                                                            ...formData.requirements,
                                                            tag_brand: checked,
                                                        },
                                                    })
                                                }
                                            />
                                        </div>

                                        <div className='flex items-center justify-between'>
                                            <div className='space-y-0.5'>
                                                <Label>Require Disclosure</Label>
                                                <p className='text-sm text-gray-500'>Require #ad or #sponsored disclosure</p>
                                            </div>
                                            <Switch
                                                checked={formData.requirements.disclosure}
                                                onCheckedChange={(checked) =>
                                                    setFormData({
                                                        ...formData,
                                                        requirements: {
                                                            ...formData.requirements,
                                                            disclosure: checked,
                                                        },
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {/* Step 4: Review & Submit */}
                        {currentStep === 4 && (
                            <motion.div
                                initial='hidden'
                                animate='visible'
                                variants={fadeIn}
                                className='space-y-6'>
                                <div className='bg-gray-50 p-4 rounded-lg'>
                                    <h3 className='font-medium mb-3'>Campaign Summary</h3>

                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        <div>
                                            <p className='text-sm text-gray-500'>Campaign Name</p>
                                            <p className='font-medium'>{formData.name || "Not specified"}</p>
                                        </div>

                                        <div>
                                            <p className='text-sm text-gray-500'>Objective</p>
                                            <p className='font-medium'>{formData.objective ? formData.objective.replace("_", " ") : "Not specified"}</p>
                                        </div>

                                        <div>
                                            <p className='text-sm text-gray-500'>Timeline</p>
                                            <p className='font-medium'>{formData.startDate && formData.endDate ? `${new Date(formData.startDate).toLocaleDateString()} - ${new Date(formData.endDate).toLocaleDateString()}` : "Not specified"}</p>
                                        </div>

                                        <div>
                                            <p className='text-sm text-gray-500'>Budget</p>
                                            <p className='font-medium'>${formData.budget}</p>
                                        </div>
                                    </div>

                                    <div className='mt-4'>
                                        <p className='text-sm text-gray-500'>Content Types</p>
                                        <div className='flex flex-wrap gap-2 mt-1'>
                                            {formData.contentTypes.length > 0 ? (
                                                formData.contentTypes.map((type) => (
                                                    <Badge
                                                        key={type}
                                                        variant='outline'
                                                        className='bg-blue-50'>
                                                        {type}
                                                    </Badge>
                                                ))
                                            ) : (
                                                <p className='text-sm italic'>No content types selected</p>
                                            )}
                                        </div>
                                    </div>

                                    {formData.keyMessages.length > 0 && (
                                        <div className='mt-4'>
                                            <p className='text-sm text-gray-500'>Key Messages</p>
                                            <ul className='list-disc pl-5 mt-1 space-y-1'>
                                                {formData.keyMessages.map((msg, index) => (
                                                    <li
                                                        key={index}
                                                        className='text-sm'>
                                                        {msg}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {formData.requirements.description && (
                                        <div className='mt-4'>
                                            <p className='text-sm text-gray-500'>Content Requirements</p>
                                            <p className='text-sm mt-1'>{formData.requirements.description}</p>
                                        </div>
                                    )}
                                </div>

                                <div className='bg-amber-50 border border-amber-200 p-4 rounded-lg text-amber-800'>
                                    <h3 className='font-medium mb-2 flex items-center'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth={1.5}
                                            stroke='currentColor'
                                            className='w-5 h-5 mr-2'>
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
                                            />
                                        </svg>
                                        Please Note
                                    </h3>
                                    <p className='text-sm'>Once submitted, your campaign will be visible to invited influencers. You can edit details until influencers begin to apply.</p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </CardContent>

                <CardFooter className='flex justify-between border-t bg-gray-50 p-4'>
                    <Button
                        type='button'
                        variant='outline'
                        onClick={handlePrevious}
                        disabled={currentStep === 1}>
                        Previous
                    </Button>

                    {currentStep < 4 ? (
                        <div className='space-x-2'>
                            <Button
                                variant='outline'
                                onClick={() => handleSubmitAction(event, "draft")}>
                                Save as draft
                            </Button>
                            <Button
                                type='button'
                                onClick={handleNext}>
                                Continue
                            </Button>
                        </div>
                    ) : (
                        <Button
                            type='button'
                            onClick={() => handleSubmitAction(event, "submit")}
                            className='bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'>
                            {isEditMode ? "Update Campaign" : "Submit Campaign"}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};

export default CampaignForm;
