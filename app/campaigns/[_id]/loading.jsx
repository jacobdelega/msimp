import SideNav from "@/components/SideNav/SideNav";
import DashboardHeader from "@/components/DashboardHeader/DashboardHeader";

export default function Loading() {
    return (
        <div className='flex min-h-screen w-full flex-col bg-muted/40'>
            <SideNav />
            <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
                <DashboardHeader path={["Campaigns"]} />
                <main className='p-6'>
                    <div className="max-w-7xl mx-auto">
                        {/* Header Skeleton */}
                        <div className="relative px-6 py-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div className="animate-pulse">
                                    <div className="flex items-center">
                                        <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
                                        <div className="ml-4 h-6 bg-gray-200 rounded-full w-20"></div>
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                                </div>
                                <div className="mt-6 md:mt-0 flex space-x-3">
                                    <div className="h-10 bg-gray-200 rounded-lg w-24 animate-pulse"></div>
                                    <div className="h-10 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards Skeleton */}
                        <div className="px-6 mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 animate-pulse">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                                            <div className="h-5 bg-gray-200 rounded w-20"></div>
                                        </div>
                                        <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Main Content Skeleton */}
                        <div className="mx-auto px-6 py-6">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                {/* Left Column */}
                                <div className="md:col-span-8 space-y-6">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 animate-pulse">
                                            <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
                                            <div className="space-y-3">
                                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Right Column */}
                                <div className="md:col-span-4 space-y-6">
                                    {[...Array(2)].map((_, i) => (
                                        <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 animate-pulse">
                                            <div className="h-6 bg-gray-200 rounded w-40 mb-6"></div>
                                            <div className="space-y-4">
                                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}