"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Target, Users, DollarSign, CheckSquare, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { CampaignStatusBadge, getObjectiveColor } from "@/utils/campaignStatus";
import StickyHeader from "@/components/Campaigns/StickyHeader";
import EmptyCampaignsState from "./EmptyCampaignsState";
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

    const clearSelection = () => {
        setSelectedCampaigns(new Set());
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
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl md:text-3xl font-bold'>Campaigns</h1>
                <div className='flex gap-2'>
                    <Button
                        variant={isSelectMode ? "secondary" : "outline"}
                        onClick={toggleSelectMode}
                        className='gap-2'>
                        {isSelectMode ? (
                            <>
                                <X className='h-4 w-4' />
                                Exit Selection
                            </>
                        ) : (
                            <>
                                <CheckSquare className='h-4 w-4' />
                                Select Campaigns
                            </>
                        )}
                    </Button>
                    {!isSelectMode && (
                        <Link href={`/campaigns/create`}>
                            <Button className='gap-2'>
                                <PlusCircle className='h-4 w-4' />
                                Create Campaign
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {initialCampaigns.map((campaign) => (
                    <Card
                        key={campaign._id}
                        className={`
                            shadow-sm transition-all 
                            ${isSelectMode ? "cursor-pointer" : ""}
                            ${isSelectMode && selectedCampaigns.has(campaign._id) ? "ring-2 ring-blue-500" : isSelectMode ? "hover:ring-1 hover:ring-blue-200" : "hover:shadow-md"}
                        `}
                        onClick={() => {
                            if (isSelectMode) {
                                toggleCampaignSelection(campaign._id);
                            }
                        }}>
                        <CardHeader>
                            <div className='flex justify-between items-start'>
                                <CardTitle className='text-xl'>{campaign.name}</CardTitle>
                                <CampaignStatusBadge status={campaign.status} />
                            </div>
                            <CardDescription>{formatDistanceToNow(new Date(campaign.startDate), { addSuffix: true })}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                <div className='flex items-center gap-2 text-sm'>
                                    <Target className='h-4 w-4 text-gray-500' />
                                    <span className={`px-2 py-1 rounded-full text-xs ${getObjectiveColor(campaign.objective)}`}>{campaign.objective.charAt(0).toUpperCase() + campaign.objective.slice(1)}</span>
                                </div>
                                <div className='flex items-center gap-2 text-sm'>
                                    <Users className='h-4 w-4 text-gray-500' />
                                    <span>Age TO CHANGE</span>
                                </div>
                                <div className='flex items-center gap-2 text-sm'>
                                    <DollarSign className='h-4 w-4 text-gray-500' />
                                    <span>Budget: ${campaign.budget.toLocaleString()}</span>
                                </div>
                                <div className='flex justify-between items-center mt-4'>
                                    <div className='flex gap-2'>
                                        <span className='text-xs text-gray-500'>999 influencers</span>
                                    </div>
                                    {!isSelectMode && (
                                        <Link href={`/campaigns/${campaign._id}`}>
                                            <Button
                                                variant='outline'
                                                size='sm'>
                                                View Details
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
}

export default CampaignsPage;
