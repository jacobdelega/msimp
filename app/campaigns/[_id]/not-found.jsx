import Link from "next/link";
import SideNav from "@/components/SideNav/SideNav";
import DashboardHeader from "@/components/DashboardHeader/DashboardHeader";

export default function NotFound() {
    return (
        <div className='flex min-h-screen w-full flex-col bg-muted/40'>
            <SideNav />
            <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
                <DashboardHeader path={["Campaigns"]} />
                <main className='p-6'>
                    <div className="flex items-center justify-center min-h-[500px]">
                        <div className="text-center max-w-md">
                            <div className="mb-8">
                                <div className="mx-auto h-20 w-20 rounded-full bg-red-100 flex items-center justify-center mb-4">
                                    <svg className="h-10 w-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 13.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">Campaign Not Found</h1>
                                <p className="text-gray-600 mb-6">
                                    The campaign you're looking for doesn't exist or may have been deleted.
                                </p>
                            </div>
                            
                            <div className="space-y-3">
                                <Link 
                                    href="/campaigns"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Campaigns
                                </Link>
                                
                                <div className="text-sm text-gray-500">
                                    <p>Need help? <Link href="/support" className="text-blue-600 hover:underline">Contact Support</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}