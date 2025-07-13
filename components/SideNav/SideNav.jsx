import Link from "next/link";
import { Megaphone, Home, Settings, Users } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
const SideNav = () => {
    return (
        <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
            <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href='/dashboard'
                                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'>
                                <Home className='h-5 w-5' />
                                <span className='sr-only'>Dashboard</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side='right'>Dashboard</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href='/campaigns'
                                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'>
                                <Megaphone className='h-5 w-5' />
                                <span className='sr-only'>Campaigns</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side='right'>Campaigns</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href='/influencers'
                                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'>
                                <Users className='h-5 w-5' />
                                <span className='sr-only'>Influencers</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side='right'>Influencers</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
            <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href='/dashboard/settings'
                                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'>
                                <Settings className='h-5 w-5' />
                                <span className='sr-only'>Settings</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side='right'>Settings</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    );
};

export default SideNav;
