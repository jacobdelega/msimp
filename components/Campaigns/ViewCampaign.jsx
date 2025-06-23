"use client";
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Target, CircleDollarSign, Clock, MessageSquare, BarChart3, Edit, DownloadCloud } from "lucide-react";
import { formatDate, calculateDateDifference, getStatusStyle, calculateTimeProgress, calculatePercentage, formatCurrency } from "@/lib/utils";
export default function ViewCampaign({ campaign }) {
    if (!campaign) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-700">Campaign not found</h2>
                    <p className="text-gray-500 mt-2">The requested campaign could not be loaded.</p>
                </div>
            </div>
        );
    }
    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const fadeInRight = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    };

    const fadeInLeft = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    };

    const pulse = {
        scale: [1, 1.03, 1],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    };

    const progress = calculateTimeProgress(campaign.startDate, campaign.endDate);
    const duration = calculateDateDifference(campaign.startDate, campaign.endDate);
    const totalInfluencers = (campaign.invitedInfluencers?.length || 0) + (campaign.acceptedInfluencers?.length || 0);
    const influencerProgressValue = calculatePercentage(campaign.acceptedInfluencers?.length || 0, totalInfluencers);

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            <div className='max-w-7xl mx-auto p-6 space-y-6'>
                {/* Header Section */}
                <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8'>
                    <motion.div
                        initial='hidden'
                        animate='visible'
                        variants={fadeIn}
                        className='flex flex-col md:flex-row justify-between items-start md:items-center'>
                        <div>
                            <div className='flex items-center'>
                                <h1 className='text-3xl font-bold text-gray-900'>{campaign.name}</h1>
                                <div className={`ml-4 px-4 py-1 rounded-full text-sm font-semibold shadow-sm ${getStatusStyle(campaign.status)}`}>{campaign.status?.charAt(0).toUpperCase() + campaign.status?.slice(1)}</div>
                            </div>
                            <div className='flex items-center mt-2 text-gray-500'>
                                <Calendar className='h-4 w-4 mr-1' />
                                <span>
                                    {formatDate(campaign.startDate).split(",")[0]} - {formatDate(campaign.endDate)}
                                </span>
                            </div>
                        </div>

                        <div className='mt-6 md:mt-0 flex space-x-3'>
                            <button className='px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-300 flex items-center shadow-sm'>
                                <DownloadCloud className='h-4 w-4 mr-2' />
                                Export
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className='px-5 py-2.5 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-all duration-300 flex items-center shadow-sm'>
                                <Edit className='h-4 w-4 mr-2' />
                                Edit Campaign
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                {/* Campaign Stats Cards */}
                <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8'>
                    <motion.div
                        initial='hidden'
                        animate='visible'
                        variants={staggerContainer}
                        className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {/* Campaign Goal Card */}
                        <motion.div
                            variants={fadeInLeft}
                            whileHover={pulse}
                            className='bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100'>
                            <div className='flex justify-between items-center mb-4'>
                                <div className='bg-blue-100 p-2 rounded-lg'>
                                    <Target className='h-6 w-6 text-blue-600' />
                                </div>
                                <div className='text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-md'>Campaign Goal</div>
                            </div>
                            <h3 className='text-2xl font-bold text-gray-900'>{campaign.objective?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
                            <p className='text-sm text-gray-500 mt-1'>Driving new product awareness</p>
                        </motion.div>

                        {/* Budget Card */}
                        <motion.div
                            variants={fadeIn}
                            whileHover={pulse}
                            className='bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-100'>
                            <div className='flex justify-between items-center mb-4'>
                                <div className='bg-emerald-100 p-2 rounded-lg'>
                                    <CircleDollarSign className='h-6 w-6 text-emerald-600' />
                                </div>
                                <div className='text-xs font-medium px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md'>Budget</div>
                            </div>
                            <h3 className='text-2xl font-bold text-gray-900'>{formatCurrency(campaign.budget)}</h3>
                            <p className='text-sm text-gray-500 mt-1'>Total campaign budget</p>
                        </motion.div>

                        {/* Duration Card */}
                        <motion.div
                            variants={fadeInRight}
                            whileHover={pulse}
                            className='bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100'>
                            <div className='flex justify-between items-center mb-4'>
                                <div className='bg-purple-100 p-2 rounded-lg'>
                                    <Clock className='h-6 w-6 text-purple-600' />
                                </div>
                                <div className='text-xs font-medium px-2 py-1 bg-purple-50 text-purple-600 rounded-md'>Duration</div>
                            </div>
                            <h3 className='text-2xl font-bold text-gray-900'>{duration} Days</h3>
                            <p className='text-sm text-gray-500 mt-1'>
                                {formatDate(campaign.startDate).split(",")[0]} - {formatDate(campaign.endDate).split(",")[0]}
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Main Content */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    {/* Left Column - Main Details */}
                    <div className='lg:col-span-2 space-y-6'>
                        <motion.div
                            initial='hidden'
                            animate='visible'
                            variants={staggerContainer}
                            className='space-y-6'>
                            
                            {/* Campaign Progress */}
                            <motion.div
                                variants={fadeIn}
                                className='bg-white p-6 rounded-2xl shadow-lg border border-blue-100'>
                                <div className='flex justify-between items-center mb-6'>
                                    <h3 className='font-semibold text-lg text-gray-900'>Campaign Progress</h3>
                                    <div className='bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm'>
                                        {progress}% Complete
                                    </div>
                                </div>

                                <div className='h-3 w-full bg-gray-100 rounded-full overflow-hidden mb-4 shadow-inner'>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className='h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full'>
                                    </motion.div>
                                </div>

                                <div className='flex justify-between text-sm text-gray-600'>
                                    <div className='flex items-center'>
                                        <div className='h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2'>
                                            <div className='h-2 w-2 rounded-full bg-green-500'></div>
                                        </div>
                                        <span>{formatDate(campaign.startDate)}</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <span>{formatDate(campaign.endDate)}</span>
                                        <div className='h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center ml-2'>
                                            <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Campaign Requirements */}
                            <motion.div
                                variants={fadeIn}
                                className='bg-white p-6 rounded-2xl shadow-lg border border-blue-100'>
                                <h3 className='font-semibold text-lg text-gray-900 mb-4'>Campaign Requirements</h3>

                                <div className='space-y-5'>
                                    <div>
                                        <h4 className='text-sm font-medium text-gray-500 mb-2'>Description</h4>
                                        <div className='bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm text-gray-700'>{campaign.requirements?.description || 'No description provided'}</div>
                                    </div>

                                    <div className='space-y-2'>
                                        <h4 className='text-sm font-medium text-gray-500 mb-2'>Content Requirements</h4>
                                        <div className={`flex items-center p-3 rounded-lg ${campaign.requirements?.hashtags ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-100" : "bg-gray-50 text-gray-500"}`}>
                                            <div className='h-4 w-4 rounded-full bg-green-100 flex items-center justify-center mr-2'>
                                                <div className={`h-2 w-2 rounded-full ${campaign.requirements?.hashtags ? "bg-green-500" : "bg-gray-300"}`}></div>
                                            </div>
                                            <span className='text-sm font-medium'>Include Hashtags</span>
                                        </div>
                                        <div className={`flex items-center p-3 rounded-lg ${campaign.requirements?.disclosure ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-100" : "bg-gray-50 text-gray-500"}`}>
                                            <div className='h-4 w-4 rounded-full bg-green-100 flex items-center justify-center mr-2'>
                                                <div className={`h-2 w-2 rounded-full ${campaign.requirements?.disclosure ? "bg-green-500" : "bg-gray-300"}`}></div>
                                            </div>
                                            <span className='text-sm font-medium'>Disclose Partnership</span>
                                        </div>
                                        <div className={`flex items-center p-3 rounded-lg ${campaign.requirements?.tag_brand ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-100" : "bg-gray-50 text-gray-500"}`}>
                                            <div className='h-4 w-4 rounded-full bg-green-100 flex items-center justify-center mr-2'>
                                                <div className={`h-2 w-2 rounded-full ${campaign.requirements?.tag_brand ? "bg-green-500" : "bg-gray-300"}`}></div>
                                            </div>
                                            <span className='text-sm font-medium'>Tag Brand</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Key Messages */}
                            <motion.div
                                variants={fadeIn}
                                className='bg-white p-6 rounded-2xl shadow-lg border border-blue-100'>
                                <h3 className='font-semibold text-lg text-gray-900 mb-4 flex items-center'>
                                    <MessageSquare className='h-5 w-5 mr-2 text-blue-600' />
                                    Key Messages
                                </h3>

                                <div>
                                    {campaign.keyMessages?.length > 0 ? (
                                        <div className='space-y-3'>
                                            {campaign.keyMessages?.map((message, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ x: -10, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ delay: 0.2 + index * 0.1 }}
                                                    className='flex items-start p-4 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-white'>
                                                    <div className='flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0'>{index + 1}</div>
                                                    <div>
                                                        <span className='text-gray-900 font-medium leading-relaxed'>{message}</span>
                                                        <div className='mt-1 flex items-center text-xs text-blue-500'>
                                                            <span>Important campaign message</span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className='text-center py-8 bg-gray-50 rounded-lg'>
                                            <p className='text-gray-500'>No key messages defined</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right Column - Stats */}
                    <div className='lg:col-span-1 space-y-6'>
                        <motion.div
                            initial='hidden'
                            animate='visible'
                            variants={staggerContainer}
                            className='space-y-6'>
                            {/* Campaign Stats Card */}
                            <motion.div
                                variants={fadeIn}
                                className='bg-white p-6 rounded-2xl shadow-lg border border-blue-100'>
                                <h3 className='font-semibold text-lg text-gray-900 mb-6 flex items-center'>
                                    <BarChart3 className='h-5 w-5 mr-2 text-blue-600' />
                                    Campaign Metrics
                                </h3>

                                <div className='space-y-6'>
                                    <div>
                                        <div className='flex justify-between items-center mb-2'>
                                            <span className='text-gray-600 font-medium'>Influencers</span>
                                            <div className='flex items-center text-sm'>
                                                <span className='font-bold text-gray-900'>{campaign.acceptedInfluencers?.length || 0}</span>
                                                <span className='text-gray-400 mx-1'>/</span>
                                                <span className='text-gray-500'>{totalInfluencers}</span>
                                            </div>
                                        </div>
                                        <div className='h-2 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner'>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${influencerProgressValue}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                className='h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full'></motion.div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className='flex justify-between items-center mb-2'>
                                            <span className='text-gray-600 font-medium'>Budget Used</span>
                                            <div className='flex items-center text-sm'>
                                                <span className='font-bold text-gray-900'>$0</span>
                                                <span className='text-gray-400 mx-1'>/</span>
                                                <span className='text-gray-500'>{formatCurrency(campaign.budget)}</span>
                                            </div>
                                        </div>
                                        <div className='h-2 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner'>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "0%" }}
                                                className='h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full'></motion.div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            {/* Campaign Quick Stats */}
                            <motion.div
                                variants={fadeIn}
                                className='bg-white p-6 rounded-2xl shadow-lg border border-blue-100'>
                                <h3 className='font-semibold text-lg text-gray-900 mb-6'>Quick Details</h3>
                                
                                <div className='space-y-4'>
                                    <div className='flex items-center justify-between py-3 border-b border-gray-100'>
                                        <div className='flex items-center'>
                                            <div className='h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3'>
                                                <Target className='h-4 w-4 text-blue-600' />
                                            </div>
                                            <span className='text-sm font-medium text-gray-600'>Objective</span>
                                        </div>
                                        <span className='text-sm font-semibold text-gray-900'>{campaign.objective?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                                    </div>
                                    
                                    <div className='flex items-center justify-between py-3 border-b border-gray-100'>
                                        <div className='flex items-center'>
                                            <div className='h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center mr-3'>
                                                <CircleDollarSign className='h-4 w-4 text-emerald-600' />
                                            </div>
                                            <span className='text-sm font-medium text-gray-600'>Budget</span>
                                        </div>
                                        <span className='text-sm font-semibold text-gray-900'>{formatCurrency(campaign.budget)}</span>
                                    </div>
                                    
                                    <div className='flex items-center justify-between py-3 border-b border-gray-100'>
                                        <div className='flex items-center'>
                                            <div className='h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3'>
                                                <Clock className='h-4 w-4 text-purple-600' />
                                            </div>
                                            <span className='text-sm font-medium text-gray-600'>Duration</span>
                                        </div>
                                        <span className='text-sm font-semibold text-gray-900'>{duration} Days</span>
                                    </div>
                                    
                                    <div className='flex items-center justify-between py-3'>
                                        <div className='flex items-center'>
                                            <div className='h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3'>
                                                <MessageSquare className='h-4 w-4 text-blue-600' />
                                            </div>
                                            <span className='text-sm font-medium text-gray-600'>Messages</span>
                                        </div>
                                        <span className='text-sm font-semibold text-gray-900'>{campaign.keyMessages?.length || 0}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
