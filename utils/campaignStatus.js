// Campaign status types from the model
export const CAMPAIGN_STATUSES = {
    DRAFT: "draft",
    ACTIVE: "active",
    COMPLETED: "completed",
    CANCELLED: "cancelled"
}

export const getStatusColor = (status) => {
    const colors = {
        [CAMPAIGN_STATUSES.DRAFT]: "bg-gray-100 text-gray-800",
        [CAMPAIGN_STATUSES.ACTIVE]: "bg-green-100 text-green-800",
        [CAMPAIGN_STATUSES.COMPLETED]: "bg-blue-100 text-blue-800",
        [CAMPAIGN_STATUSES.CANCELLED]: "bg-red-100 text-red-800"
    }
    return colors[status.toLowerCase()] || "bg-gray-100 text-gray-800"
}

export const CampaignStatusBadge = ({ status }) => {
    const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1)
    const colorClass = getStatusColor(status)

    return (
        <span className={`px-2 py-1 rounded-full text-xs ${colorClass}`}>
            {formattedStatus}
        </span>
    )
}

// Campaign objective types and colors
export const CAMPAIGN_OBJECTIVES = {
    AWARENESS: "awareness",
    ENGAGEMENT: "engagement",
    SALES: "sales"
}

export const getObjectiveColor = (objective) => {
    const colors = {
        [CAMPAIGN_OBJECTIVES.AWARENESS]: "bg-blue-100 text-blue-800",
        [CAMPAIGN_OBJECTIVES.ENGAGEMENT]: "bg-purple-100 text-purple-800",
        [CAMPAIGN_OBJECTIVES.SALES]: "bg-green-100 text-green-800"
    }
    return colors[objective.toLowerCase()] || "bg-gray-100 text-gray-800"
}