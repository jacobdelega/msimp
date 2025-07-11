"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, DollarSign, CheckSquare, X, Users, Calendar, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { CampaignStatusBadge } from "@/utils/campaignStatus";
import StickyHeader from "@/components/Campaigns/StickyHeader";
import EmptyCampaignsState from "./EmptyCampaignsState";
import { calculateDateDifference } from "@/lib/utils";

function CampaignsPage({ allCampaigns, userData }) {
    const userId = userData.user.id;
    const initialCampaigns = allCampaigns;
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [selectedCampaigns, setSelectedCampaigns] = useState(new Set());

    const toggleSelectMode = () => {
        setIsSelectMode(!isSelectMode);
        setSelectedCampaigns(new Set()); // Clear selections when toggling mode
    };

    const toggleCampaignSelection = (campaignId) => {
        setSelectedCampaigns((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(campaignId)) {
                newSet.delete(campaignId);
            } else {
                newSet.add(campaignId);
            }
            return newSet;
        });
    };

    const handleDelete = async () => {
        if (selectedCampaigns.size === 0) return;
        if (confirm(`Are you sure you want to delete ${selectedCampaigns.size} campaign(s)?`)) {
            try {
                const response = await fetch("/api/campaigns/delete", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        campaignIds: Array.from(selectedCampaigns),
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to delete campaigns");
                }

                // Refresh the page after successful deletion
                window.location.reload();
            } catch (error) {
                console.error("Error deleting campaigns:", error);
                alert("Failed to delete campaigns");
            }
        }
    };

    if (!initialCampaigns.length > 0) {
        return <EmptyCampaignsState userId={userId} />;
    }

    return (
        <>
            {selectedCampaigns.size > 0 && (
                <StickyHeader
                    selectedCount={selectedCampaigns.size}
                    onClearSelection={() => setSelectedCampaigns(new Set())}
                    onDelete={handleDelete}
                />
            )}
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0'>
                <h1 className='text-xl sm:text-2xl md:text-3xl font-bold'>Campaigns</h1>
                <div className='flex gap-2 w-full sm:w-auto'>
                    <Button
                        variant={isSelectMode ? "secondary" : "outline"}
                        onClick={toggleSelectMode}
                        className='gap-2 flex-1 sm:flex-none text-sm'>
                        {isSelectMode ? (
                            <>
                                <X className='h-4 w-4' />
                                <span className='hidden sm:inline'>Exit Selection</span>
                                <span className='sm:hidden'>Exit</span>
                            </>
                        ) : (
                            <>
                                <CheckSquare className='h-4 w-4' />
                                <span className='hidden sm:inline'>Select Campaigns</span>
                                <span className='sm:hidden'>Select</span>
                            </>
                        )}
                    </Button>
                    {!isSelectMode && (
                        <Link href={`/campaigns/create`} className='flex-1 sm:flex-none'>
                            <Button className='gap-2 w-full sm:w-auto text-sm'>
                                <PlusCircle className='h-4 w-4' />
                                <span className='hidden sm:inline'>Create Campaign</span>
                                <span className='sm:hidden'>Create</span>
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
            <div className='grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
                {initialCampaigns.map((campaign) => {
                    const acceptedInfluencers = campaign.acceptedInfluencers?.length || 0;
                    const invitedInfluencers = campaign.invitedInfluencers?.length || 0;
                    const totalInfluencers = acceptedInfluencers + invitedInfluencers;
                    const acceptanceRate = totalInfluencers > 0 ? Math.round((acceptedInfluencers / totalInfluencers) * 100) : 0;
                    
                    return (
                        <Card
                            key={campaign._id}
                            className={`
                                shadow-sm transition-all rounded-lg border-l-4 
                                ${campaign.status === 'active' ? 'border-l-green-500' : 
                                campaign.status === 'draft' ? 'border-l-gray-400' : 
                                campaign.status === 'completed' ? 'border-l-blue-500' : 'border-l-red-500'}
                                ${isSelectMode ? "cursor-pointer" : ""}
                                ${isSelectMode && selectedCampaigns.has(campaign._id) ? "ring-2 ring-blue-500" : isSelectMode ? "hover:ring-1 hover:ring-blue-200" : "hover:shadow-md"}
                            `}
                            onClick={() => {
                                if (isSelectMode) {
                                    toggleCampaignSelection(campaign._id);
                                }
                            }}>
                            <CardHeader className='p-4 pb-2'>
                                <div className='flex justify-between items-start gap-2'>
                                    <CardTitle className='text-base sm:text-lg font-semibold leading-tight truncate'>{campaign.name}</CardTitle>
                                    <CampaignStatusBadge status={campaign.status} />
                                </div>
                                <div className='text-xs text-gray-500 flex -translate-y-1.5'>
                                    {formatDistanceToNow(new Date(campaign.startDate), { addSuffix: true })}
                                </div>
                            </CardHeader>
                            <CardContent className='p-4 pt-0'>
                                <div className='space-y-3'>
                                    {/* Budget */}
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <DollarSign className='h-4 w-4 text-green-600' />
                                            <span className='text-sm text-gray-600'>Budget</span>
                                        </div>
                                        <span className='text-sm font-semibold text-gray-900'>
                                            ${campaign.budget?.toLocaleString() || '0'}
                                        </span>
                                    </div>
                                    
                                    {/* Influencers */}
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <Users className='h-4 w-4 text-blue-600' />
                                            <span className='text-sm text-gray-600'>Influencers</span>
                                        </div>
                                        <div className='text-right'>
                                            <span className='text-sm font-semibold text-gray-900'>
                                                {acceptedInfluencers}/{totalInfluencers}
                                            </span>
                                            {totalInfluencers > 0 && (
                                                <div className='text-xs text-gray-500'>
                                                    {acceptanceRate}% accepted
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Duration */}
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <Calendar className='h-4 w-4 text-purple-600' />
                                            <span className='text-sm text-gray-600'>Duration</span>
                                        </div>
                                        <span className='text-sm font-semibold text-gray-900'>
                                            {calculateDateDifference(campaign.startDate, campaign.endDate)} days
                                        </span>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    {!isSelectMode && (
                                        <div className='pt-3 border-t border-gray-100'>
                                            <div className='flex gap-2'>
                                                <Link href={`/campaigns/${campaign._id}`} className='flex-1'>
                                                    <Button
                                                        variant='secondary'
                                                        size='sm'
                                                        className='w-full justify-center text-xs font-medium h-8 bg-gray-50 hover:bg-gray-100 text-gray-700 border-0'>
                                                        <Eye className='h-3 w-3 mr-1.5' />
                                                        View
                                                    </Button>
                                                </Link>
                                                {campaign.status === 'active' ? (
                                                    <Button
                                                        variant='secondary'
                                                        size='sm'
                                                        className='flex-1 justify-center text-xs font-medium h-8 bg-orange-50 hover:bg-orange-100 text-orange-700 border-0'
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            // TODO: Add mark as draft functionality
                                                            console.log('Mark as draft:', campaign._id);
                                                        }}>
                                                        Mark Draft
                                                    </Button>
                                                ) : campaign.status === 'draft' ? (
                                                    <Link href='/influencers' className='flex-1'>
                                                        <Button
                                                            variant='secondary'
                                                            size='sm'
                                                            className='w-full justify-center text-xs font-medium h-8 bg-blue-50 hover:bg-blue-100 text-blue-700 border-0'>
                                                            Invite Influencers
                                                        </Button>
                                                    </Link>
                                                ) : null}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </>
    );
}

export default CampaignsPage;
