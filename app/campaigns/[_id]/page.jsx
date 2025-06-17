import React from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Users, DollarSign, Calendar, MessageSquare, Trophy, FileText, ArrowLeft, Hash, Edit, PauseCircle } from "lucide-react";
import Link from "next/link";
import { getCampaignById } from "@/queries/Campaigns/campaign_queries";

const CampaignDetails = async ({ params }) => {
    const campaign = await getCampaignById(params._id);
    const getStatusColor = (status) => {
        const colors = {
            draft: "bg-gray-100 text-gray-800",
            active: "bg-green-100 text-green-800",
            completed: "bg-blue-100 text-blue-800",
            cancelled: "bg-red-100 text-red-800",
        };
        return colors[status] || "bg-gray-100 text-gray-800";
    };

    const calculateProgress = (spent, total) => {
        return Math.round((spent / total) * 100);
    };

    return (
        <div className='flex flex-col space-y-6 p-6'>
            {/* Header Section */}
            <div className='flex flex-col space-y-4'>
                <Link
                    href='/campaigns'
                    className='inline-flex items-center text-gray-600 hover:text-gray-900'>
                    <ArrowLeft className='h-4 w-4 mr-2' />
                    Back to Campaigns
                </Link>

                <div className='flex justify-between items-start'>
                    <div>
                        <h1 className='text-3xl font-bold'>{campaign.name}</h1>
                        <div className='flex items-center gap-4 mt-2'>
                            <Badge className={getStatusColor(campaign.status)}>{campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}</Badge>
                            <span className='text-sm text-gray-500 flex items-center'>
                                <Calendar className='inline mr-2 h-4 w-4' />
                                {format(new Date(campaign.startDate), "MMM dd, yyyy")} - {format(new Date(campaign.endDate), "MMM dd, yyyy")}
                            </span>
                        </div>
                    </div>
                    <div className='flex gap-3'>
                        <Link href={`/campaigns/${campaign._id}/edit`}>
                            <Button
                                variant='outline'
                                className='gap-2'>
                                <Edit className='h-4 w-4' />
                                Edit Campaign
                            </Button>
                        </Link>
                        <Button
                            variant='destructive'
                            className='gap-2'>
                            <PauseCircle className='h-4 w-4' />
                            Pause Campaign
                        </Button>
                    </div>
                </div>
            </div>

            {/* Quick Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <Card>
                    <CardContent className='pt-6'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <p className='text-sm text-gray-500'>Budget Spent</p>
                                <p className='text-2xl font-bold'>${campaign.compensation?.amount?.toLocaleString() || 0}</p>
                            </div>
                            <DollarSign className='h-8 w-8 text-gray-400' />
                        </div>
                        <Progress
                            value={calculateProgress(campaign.compensation?.amount || 0, campaign.budget || 1)}
                            className='mt-4'
                        />
                        <p className='text-sm text-gray-500 mt-2'>{calculateProgress(campaign.compensation?.amount || 0, campaign.budget || 1)}% of total budget</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className='pt-6'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <p className='text-sm text-gray-500'>Influencer Response</p>
                                <p className='text-2xl font-bold'>{(((campaign.acceptedInfluencers?.length || 0) / (campaign.invitedInfluencers?.length || 1)) * 100).toFixed(1)}%</p>
                            </div>
                            <Users className='h-8 w-8 text-gray-400' />
                        </div>
                        <div className='mt-4'>
                            <p className='text-sm text-gray-500'>
                                {campaign.acceptedInfluencers?.length || 0} of {campaign.invitedInfluencers?.length || 0} invited
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className='pt-6'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <p className='text-sm text-gray-500'>Content Submitted</p>
                                <p className='text-2xl font-bold'>{campaign.requirements?.postCount || 0}</p>
                            </div>
                            <Trophy className='h-8 w-8 text-gray-400' />
                        </div>
                        <div className='mt-4'>
                            <p className='text-sm text-gray-500'>Required posts per influencer</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs
                defaultValue='overview'
                className='w-full'>
                <TabsList>
                    <TabsTrigger value='overview'>Overview</TabsTrigger>
                    <TabsTrigger value='content'>Content Requirements</TabsTrigger>
                    <TabsTrigger value='influencers'>Influencers</TabsTrigger>
                </TabsList>

                <TabsContent
                    value='overview'
                    className='mt-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <Card>
                            <CardHeader>
                                <CardTitle className='text-lg flex items-center gap-2'>
                                    <Target className='h-5 w-5 text-gray-500' />
                                    Campaign Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <div className='grid gap-4'>
                                    <div>
                                        <p className='text-sm text-gray-500'>Objective</p>
                                        <p className='font-medium capitalize'>{campaign.objective}</p>
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-500'>Target Age Range</p>
                                        <p className='font-medium'>
                                            {campaign.targetAudience?.ageRange?.min} - {campaign.targetAudience?.ageRange?.max} years
                                        </p>
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-500'>Interests</p>
                                        <div className='flex flex-wrap gap-2 mt-1'>
                                            {campaign.targetAudience?.interests?.map((interest) => (
                                                <Badge
                                                    key={interest}
                                                    variant='secondary'>
                                                    {interest}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className='text-lg flex items-center gap-2'>
                                    <DollarSign className='h-5 w-5 text-gray-500' />
                                    Budget & Compensation
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <div className='grid gap-4'>
                                    <div>
                                        <p className='text-sm text-gray-500'>Total Budget</p>
                                        <p className='font-medium'>${campaign.budget?.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-500'>Compensation Type</p>
                                        <p className='font-medium capitalize'>{campaign.compensation?.type}</p>
                                    </div>
                                    <div className='grid grid-cols-2 gap-4'>
                                        <div>
                                            <p className='text-sm text-gray-500'>Base Amount</p>
                                            <p className='font-medium'>${campaign.compensation?.amount?.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className='text-sm text-gray-500'>Bonus</p>
                                            <p className='font-medium'>${campaign.compensation?.bonus?.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent
                    value='content'
                    className='mt-6'>
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-lg flex items-center gap-2'>
                                <FileText className='h-5 w-5 text-gray-500' />
                                Content Requirements
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-6'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div>
                                    <p className='text-sm text-gray-500 mb-2'>Content Types</p>
                                    <div className='flex flex-wrap gap-2'>
                                        {campaign.requirements?.contentType?.map((type) => (
                                            <Badge
                                                key={type}
                                                variant='secondary'>
                                                {type.replace("-", " ")}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500 mb-2'>Required Elements</p>
                                    <div className='space-y-2'>
                                        {campaign.requirements?.requiredElements?.map((element) => (
                                            <div
                                                key={element}
                                                className='flex items-center gap-2'>
                                                <div className='h-1.5 w-1.5 rounded-full bg-gray-500' />
                                                <span className='text-sm'>{element}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className='text-sm text-gray-500 mb-2'>Description</p>
                                <p className='text-sm'>{campaign.requirements?.description}</p>
                            </div>

                            <div>
                                <p className='text-sm text-gray-500 mb-2'>Key Messages</p>
                                <div className='space-y-2'>
                                    {campaign.keyMessages?.map((message, index) => (
                                        <div
                                            key={index}
                                            className='flex items-start gap-2'>
                                            <span className='font-medium text-gray-500 min-w-[24px]'>{index + 1}.</span>
                                            <span className='text-sm'>{message}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className='text-sm text-gray-500 mb-2'>Hashtags</p>
                                <div className='flex flex-wrap gap-2'>
                                    {campaign.hashtags?.split(" ").map((tag, index) => (
                                        <Badge
                                            key={index}
                                            variant='outline'>
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent
                    value='influencers'
                    className='mt-6'>
                    <Card>
                        <CardContent className='pt-6'>
                            <div className='space-y-4'>
                                {campaign.acceptedInfluencers?.map((influencer, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center justify-between p-4 border rounded-lg'>
                                        <div>
                                            <p className='font-medium'>{influencer.name}</p>
                                            <p className='text-sm text-gray-500'>Status: Active</p>
                                        </div>
                                        <div className='flex gap-2'>
                                            <Button
                                                variant='outline'
                                                size='sm'>
                                                View Content
                                            </Button>
                                            <Button
                                                variant='outline'
                                                size='sm'>
                                                Message
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default CampaignDetails;
