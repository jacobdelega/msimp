import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle, Rocket, TrendingUp, Users } from "lucide-react";

const EmptyCampaignsState = () => {
    return (
        <div className='flex flex-col items-center justify-center py-16 px-4 text-center'>
            <div className='w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6'>
                <Rocket className='h-10 w-10 text-blue-500' />
            </div>

            <h2 className='text-2xl font-bold mb-3'>Launch your first campaign!</h2>
            <p className='text-gray-500 max-w-md mb-8'>Start collaborating with influencers and grow your brand's reach. It only takes a few minutes to set up your first campaign.</p>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full max-w-3xl'>
                <div className='p-6 border rounded-lg text-center hover:border-blue-200 hover:bg-blue-50 transition-colors'>
                    <TrendingUp className='h-8 w-8 text-blue-500 mx-auto mb-3' />
                    <h3 className='font-semibold mb-2'>Boost Engagement</h3>
                    <p className='text-sm text-gray-500'>Reach new audiences and drive more engagement with your brand</p>
                </div>

                <div className='p-6 border rounded-lg text-center hover:border-blue-200 hover:bg-blue-50 transition-colors'>
                    <Users className='h-8 w-8 text-blue-500 mx-auto mb-3' />
                    <h3 className='font-semibold mb-2'>Find Perfect Matches</h3>
                    <p className='text-sm text-gray-500'>Connect with influencers who align with your brand values</p>
                </div>

                <div className='p-6 border rounded-lg text-center hover:border-blue-200 hover:bg-blue-50 transition-colors'>
                    <div className='flex justify-center'>
                        <svg
                            width='32'
                            height='32'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            className='text-blue-500 mb-3'>
                            <path
                                d='M12 6V18M18 12H6'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    </div>
                    <h3 className='font-semibold mb-2'>Track Results</h3>
                    <p className='text-sm text-gray-500'>Measure campaign performance with detailed analytics</p>
                </div>
            </div>

            <Link href="/campaigns/create">
                <Button
                    size='lg'
                    className='gap-2 py-6 px-8 text-lg'>
                    <PlusCircle className='h-5 w-5' />
                    Create Your First Campaign
                </Button>
            </Link>
        </div>
    );
};

export default EmptyCampaignsState;
