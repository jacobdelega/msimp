import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Home, ShoppingCart, Package, Users2, LineChart, Search, PanelLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import LogoutButton from "@/components/LogoutButton/LogoutButton";
import { auth } from "@/auth";
import { getUserFromID } from "@/queries/User/user_queries";

const DashboardHeader = async ({ path }) => {
    const user = await auth();
    const user_data = await getUserFromID(user?.user?.id);

    // This is a helper function for breadcrumbs for routing
    // Takes the state from the Path which we passed in parent component
    // Uses index to determine which to route to
    // index is type int
    // example:  0 == dashboard, 1 == dashboard/settings... etc...
    const getBreadcrumbHref = (index) => {
        return (
            "/" +
            path
                .slice(0, index + 1)
                .join("/")
                .toLowerCase()
        );
    };

    return (
        <header className='sticky top-0 z-30 flex h-12 sm:h-14 items-center gap-2 sm:gap-4 border-b bg-background px-3 sm:px-4 md:px-6'>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        size='icon'
                        variant='outline'
                        className='sm:hidden h-8 w-8'>
                        <PanelLeft className='h-4 w-4' />
                        <span className='sr-only'>Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side='left'
                    className='w-64 sm:max-w-xs'>
                    <nav className='grid gap-4 text-sm font-medium'>
                        <Link
                            href='/dashboard'
                            className='flex items-center gap-3 px-2 py-2 text-muted-foreground hover:text-foreground transition-colors'>
                            <Home className='h-4 w-4' />
                            Dashboard
                        </Link>
                        <Link
                            href='#'
                            className='flex items-center gap-3 px-2 py-2 text-foreground'>
                            <ShoppingCart className='h-4 w-4' />
                            Orders
                        </Link>
                        <Link
                            href='#'
                            className='flex items-center gap-3 px-2 py-2 text-muted-foreground hover:text-foreground transition-colors'>
                            <Package className='h-4 w-4' />
                            Products
                        </Link>
                        <Link
                            href='#'
                            className='flex items-center gap-3 px-2 py-2 text-muted-foreground hover:text-foreground transition-colors'>
                            <Users2 className='h-4 w-4' />
                            Customers
                        </Link>
                        <Link
                            href='/dashboard/settings'
                            className='flex items-center gap-3 px-2 py-2 text-muted-foreground hover:text-foreground transition-colors'>
                            <LineChart className='h-4 w-4' />
                            Settings
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
            
            <Breadcrumb className='hidden md:flex flex-1 min-w-0'>
                <BreadcrumbList className='text-sm'>
                    {path.map((item, index) => (
                        <div key={index} className='flex items-center'>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link 
                                        href={getBreadcrumbHref(index)}
                                        className='truncate hover:text-foreground transition-colors'
                                    >
                                        {item}
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {index < path.length - 1 && <BreadcrumbSeparator className='mx-2' />}
                        </div>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant='outline'
                        size='icon'
                        className='overflow-hidden rounded-full w-8 h-8 sm:w-10 sm:h-10 ml-auto'>
                        <Image
                            src={user_data?.profileImageURL}
                            width={40}
                            height={40}
                            alt='Avatar'
                            className='rounded-full w-full h-full object-cover'
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-48'>
                    <DropdownMenuLabel className='text-sm'>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href='/dashboard/settings'>
                        <DropdownMenuItem className='text-sm'>Settings</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className='text-sm'>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='text-sm'>
                        <LogoutButton session={user_data} />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};

export default DashboardHeader;
