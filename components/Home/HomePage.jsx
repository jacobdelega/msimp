"use client";

import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
    BanknotesIcon,
    Bars3Icon,
    ChatBubbleBottomCenterTextIcon,
    ChatBubbleLeftEllipsisIcon,
    ChatBubbleLeftRightIcon,
    DocumentChartBarIcon,
    ChartPieIcon,
    InboxIcon,
    PencilSquareIcon,
    QuestionMarkCircleIcon,
    SparklesIcon,
    TrashIcon,
    UsersIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

import dynamic from "next/dynamic";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { useState } from "react";

const LottieSocialTree = dynamic(() => import("../lotties/LottieSocialTree"), { ssr: false });
const LottieSearch = dynamic(() => import("../lotties/LottieSearch"), { ssr: false });

const solutions = [
    {
        name: "Inbox",
        description: "Get a better understanding of where your traffic is coming from.",
        href: "#",
        icon: InboxIcon,
    },
    {
        name: "Messaging",
        description: "Speak directly to your customers in a more meaningful way.",
        href: "#",
        icon: ChatBubbleBottomCenterTextIcon,
    },
    {
        name: "Live Chat",
        description: "Your customers' data will be safe and secure.",
        href: "#",
        icon: ChatBubbleLeftRightIcon,
    },
    {
        name: "Knowledge Base",
        description: "Connect with third-party tools that you're already using.",
        href: "#",
        icon: QuestionMarkCircleIcon,
    },
];
const features = [
    {
        name: "Tier System",
        description: "We categorize influencers with a tier system broken up into 3 levels based on their reach, engagement, and more to help you find the perfect match.",
        icon: InboxIcon,
    },
    {
        name: "Campaign Opportunities ",
        description: "Stop chasing down deals. We put high-paying brand partnerships directly at your fingertips, so you can focus on creating amazing content.",
        icon: UsersIcon,
    },
    {
        name: "Networking",
        description: "Our upcoming web application will connect you with a network of exciting brands, fostering long-term collaborations and building trust in the influencer community.",
        icon: TrashIcon,
    },
    {
        name: "Streamlined Workflow",
        description: "Our platform is designed with creators in mind. We make it simple to find brand deals, manage campaigns, and track your progress all in one place. ",
        icon: PencilSquareIcon,
    },
    {
        name: "Influencer Database",
        description: "Skip the guesswork, find the perfect fit. Unleash the power of hyper-targeted influencer marketing. Discover creators who can deliver impactful campaigns that drive real results.",
        icon: DocumentChartBarIcon,
    },
    {
        name: "Connectivity",
        description: "Invest in long term success. Our platform fosters genuine connections between brands and influencers, leading to successful collaborations that deliver affordable lasting results.",
        icon: BanknotesIcon,
    },
    {
        name: "Campaign Managment",
        description: "Our platform will offer a easy to use campaign manager that empowers you to handle everything from setup to execution. No need to worry about contracts, legal work, or payments we take care of it all.",
        icon: ChatBubbleLeftEllipsisIcon,
    },
    {
        name: "Track Anaylsis",
        description: "Dive deep or get a quick snapshot. Our powerful tracking tools give you full visibility into your content performance, with both detailed campaign metrics and high-level summaries.",
        icon: ChartPieIcon,
    },
];
const metrics = [
    { id: 1, stat: "250 Billion market", emphasis: "up 210 billion from 2020", rest: "showing a massive market driving innovation and competition in social media." },
    { id: 2, stat: "500+ Billion", emphasis: "CNBC Estimates", rest: "that in 5 year timeline we will see massive growth." },
    { id: 3, stat: "47%", emphasis: "of all", rest: "influencers are classified as a Micro-influencer" },
    { id: 4, stat: "89%", emphasis: "of marketers", rest: "who currently engage with influencer marketing will increase or maintain there investment" },
];
const footerNavigation = {
    solutions: [
        { name: "Marketing", href: "#" },
        { name: "Analytics", href: "#" },
        { name: "Commerce", href: "#" },
        { name: "Insights", href: "#" },
    ],
    support: [
        { name: "Pricing", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "Guides", href: "#" },
        { name: "API Status", href: "#" },
    ],
    company: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Jobs", href: "#" },
        { name: "Press", href: "#" },
        { name: "Partners", href: "#" },
    ],
    legal: [
        { name: "Claim", href: "#" },
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" },
    ],
    social: [
        {
            name: "Facebook",
            href: "#",
            icon: (props) => (
                <svg
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    {...props}>
                    <path
                        fillRule='evenodd'
                        d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                        clipRule='evenodd'
                    />
                </svg>
            ),
        },
        {
            name: "Instagram",
            href: "#",
            icon: (props) => (
                <svg
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    {...props}>
                    <path
                        fillRule='evenodd'
                        d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                        clipRule='evenodd'
                    />
                </svg>
            ),
        },
        {
            name: "Twitter",
            href: "#",
            icon: (props) => (
                <svg
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    {...props}>
                    <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                </svg>
            ),
        },
        {
            name: "GitHub",
            href: "#",
            icon: (props) => (
                <svg
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    {...props}>
                    <path
                        fillRule='evenodd'
                        d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                        clipRule='evenodd'
                    />
                </svg>
            ),
        },
        {
            name: "Dribbble",
            href: "#",
            icon: (props) => (
                <svg
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    {...props}>
                    <path
                        fillRule='evenodd'
                        d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z'
                        clipRule='evenodd'
                    />
                </svg>
            ),
        },
    ],
};

export default function HomePage() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [error, setError] = useState();
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send POST request and handle response
        try {
            // verify email .. if not jump out and just prompt user to enter a valid email
            if (!email) {
                toast("Please enter a valid email address", { type: "error" });
                return;
            }

            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            const response = await fetch("/api/addEmail", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                // Show success message
                toast("Your information has been saved!", {
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                });

                setOpen(false);
            } else {
                // Handle error response
                toast("Error saving information", { type: "error" });
            }
        } catch (error) {
            // Handle network error
            console.error("Error saving information:", error);
            toast("Error saving information", { type: "error" });
        }
    };

    return (
        <div className='bg-white '>
            <main>
                {/* Hero section */}
                <div className='relative'>
                    <div className='absolute inset-x-0 bottom-0 bg-gray-100 h-1/2 p-' />

                    <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
                        <div className='relative shadow-xl sm:overflow-hidden sm:rounded-2xl'>
                            <div className='absolute inset-0'>
                                <img
                                    className='object-cover w-full h-full'
                                    src='https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100'
                                    alt=''
                                />

                                <div className='absolute inset-0 bg-gradient-to-r from-slate-800 to-blue-500 mix-blend-multiply' />
                            </div>
                            <div className='relative px-6 py-16 sm:py-24 lg:py-32 lg:px-8'>
                                <h1 className='text-4xl font-bold tracking-tight text-center sm:text-5xl lg:text-6xl'>
                                    <span className='block text-white'>Influencer Marketing</span>
                                    <span className='block text-indigo-200'>the future of brand story telling</span>
                                </h1>
                                <p className='max-w-lg mx-auto mt-6 text-xl text-center text-indigo-200 sm:max-w-3xl'>Dont get left behind unlock the power of influencer marketing today</p>
                                <div className='max-w-sm mx-auto mt-10 flex sm:max-w-none justify-center'>
                                    <div className='flex space-x-5 space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5 sm:space-y-0'>
                                        {/* <a href='#' className='flex items-center justify-center px-4 py-3 text-base font-medium text-blue-500 bg-white border border-transparent rounded-md shadow-sm hover:bg-indigo-50 sm:px-8'>
                                            Get started
                                        </a> */}
                                        {/* <a href='https://linkedin.com/in/jacobdelega' className='flex items-center justify-center px-4 gap-4 py-3 text-base font-medium text-white bg-indigo-500 border border-transparent rounded-md shadow-sm bg-opacity-60  hover:bg-opacity-70 sm:px-8'>
                                            LinkedIn
                                        </a> */}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button className='flex items-center justify-center px-4 py-3 text-base font-medium text-blue-500 bg-white border border-transparent rounded-md shadow-sm hover:bg-indigo-50 sm:px-8 '>Contact us</Button>
                                            </DialogTrigger>
                                            <DialogContent className='sm:max-w-[425px]'>
                                                <DialogHeader>
                                                    <DialogTitle>Lets stay in touch!</DialogTitle>
                                                    <DialogDescription>If you are interested in further contact please enter details.</DialogDescription>
                                                </DialogHeader>
                                                <form onSubmit={handleSubmit}>
                                                    <div className='grid gap-4 py-4'>
                                                        <div className='grid items-center grid-cols-4 gap-4'>
                                                            <Label
                                                                htmlFor='name'
                                                                className='text-right'>
                                                                Name
                                                            </Label>
                                                            <Input
                                                                placeholder=''
                                                                id='name'
                                                                className='col-span-3'
                                                                type='name'
                                                                onChange={(e) => setName(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className='grid items-center grid-cols-4 gap-4'>
                                                            <Label
                                                                htmlFor='email'
                                                                className='text-right'>
                                                                Email
                                                            </Label>
                                                            <Input
                                                                id='email'
                                                                placeholder=''
                                                                className='col-span-3'
                                                                onChange={(e) => setEmail(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button type='submit'>Save changes</Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logo Cloud */}
                {/* <div className='bg-gray-100'>
                    <div className='px-6 py-16 mx-auto max-w-7xl lg:px-8'>
                        <p className='text-base font-semibold text-center text-gray-500'>These are examples</p>
                        <div className=''>
                            <div className='flex justify-center col-span-1 md:col-span-2 lg:col-span-1'>
                                <img className='h-15' src='https://flemingfruit.com/cdn/shop/files/Projekt_bez_nazwy_36.png?v=1708979800' alt='Tuple' />
                            </div>
                            <div className='flex justify-center col-span-1 md:col-span-2 lg:col-span-1'>
                                <Image
                                    src='/images/jaytire.png'
                                    alt='Mirage'
                                    width={200} // Replace with actual image width
                                    height={50} // Replace with actual image height
                                    // Or "fill" or "intrinsic" based on your needs
                                />
                            </div>
                            <div className='flex justify-center col-span-1 md:col-span-2 lg:col-span-1'>
                                <img className='h-12' src='https://tailwindui.com/img/logos/statickit-logo-gray-400.svg' alt='StaticKit' />
                            </div>
                            <div className='flex justify-center col-span-1 md:col-span-2 md:col-start-2 lg:col-span-1'>
                                <img className='h-12' src='https://tailwindui.com/img/logos/transistor-logo-gray-400.svg' alt='Transistor' />
                            </div>
                            <div className='flex justify-center col-span-2 md:col-span-2 md:col-start-4 lg:col-span-1'>
                                <img className='h-12' src='https://tailwindui.com/img/logos/workcation-logo-gray-400.svg' alt='Workcation' />
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* Alternating Feature Sections */}
                <div className='relative pt-16 pb-32 overflow-hidden'>
                    <div
                        aria-hidden='true'
                        className='absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100'
                    />
                    <div className='relative'>
                        <div className='lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8'>
                            <div className='max-w-xl px-6 mx-auto lg:mx-0 lg:max-w-none lg:py-16 lg:px-0'>
                                <div>
                                    <div className='mt-6'>
                                        <h2 className='text-3xl font-semibold tracking-tight text-gray-900'>Influencer marketing: where results meets relationships</h2>
                                        <p className='mt-4 text-lg text-gray-500'>
                                            Influencer marketing goes beyond reach. Its about collaborating with influential voices who share your brands values and resonate with your target audience. These trusted partners will create engaging
                                            content that feels genuine, advocating for your brand in a way that fosters lasting relationships and measurable impact.
                                        </p>
                                        <div className='mt-6'>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <a
                                                        href='#'
                                                        className='inline-flex px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-indigo-600 to-blue-500 bg-origin-border hover:from-blue-600 hover:to-indigo-700'>
                                                        Get started
                                                    </a>
                                                </DialogTrigger>
                                            </Dialog>
                                        </div>
                                    </div>
                                </div>
                                {/* TODO: ADD A QUOTE FROM SOMEONE CREDIBLE */}
                                {/* <div className='pt-6 mt-8 border-t border-gray-200'>
                                    <blockquote>
                                        <div>
                                            <p className='text-base text-gray-500'>&ldquo;Being in the space for the past 4 years, I wish I had a platform like this when I started. Looking forward to using this product in the future.&rdquo;</p>
                                        </div>
                                        <footer className='mt-3'>
                                            <div className='flex items-center space-x-3'>
                                                <div className='flex-shrink-0'>
                                                    <img className='w-6 h-6 rounded-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmYr7n8L1ni-HRm9zqHRP5CT0lIBvw4D0GXjZaHp1Eqw&s' alt='' />
                                                </div>
                                                <div className='text-base font-medium text-gray-700'>Adam Elsaadi, 40k following</div>
                                            </div>
                                        </footer>
                                    </blockquote>
                                </div> */}
                            </div>
                            <div className='mt-12 sm:mt-16 lg:mt-0'>
                                <div className='flex items-center justify-center'>
                                    <LottieSocialTree src='https://lottie.host/6ec9450d-4292-4bef-8b52-7c8b8221f46c/GezYe92vJ8.json' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-24'>
                        <div className='lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8'>
                            <div className='max-w-xl px-6 mx-auto lg:col-start-2 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0'>
                                <div>
                                    <div className='mt-6'>
                                        <h2 className='text-3xl font-bold tracking-tight text-gray-900'>Find Your Brands Voice: Discover Top Content Creators</h2>
                                        <p className='mt-4 text-lg text-gray-500'>
                                            Explore a massive pool of talented content creators, all categorized to meet your specific needs. Filter by demographics, skills, follower size, and even network to identify the voices that resonate most
                                            with your target audience. Build authentic connections in just a click and amplify your brand message through powerful influencer partnerships.
                                        </p>
                                        <div className='mt-6'>
                                            <a
                                                href='#'
                                                className='inline-flex px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-blue-500 to-indigo-600 bg-origin-border hover:from-blue-600 hover:to-indigo-700'>
                                                Get started
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-12 sm:mt-16 lg:col-start-1 lg:mt-0'>
                                <div className=''>
                                    <LottieSearch
                                        src='https://lottie.host/f0716878-1357-4308-90e8-e14a6b49a22c/XSQiudbkhR.json'
                                        width='500px'
                                        height='500px'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gradient Feature Section */}
                <div className='bg-gradient-to-r from-slate-800 to-blue-700'>
                    <div className='max-w-4xl px-6 py-16 mx-auto sm:pt-20 sm:pb-24 lg:max-w-7xl lg:px-8 lg:pt-24'>
                        <h2 className='text-3xl font-bold tracking-tight text-white'>MarketSimplified Functions </h2>
                        <p className='max-w-3xl mt-4 text-lg text-indigo-200'>Level Up Your Influencer Marketing: Explore How We Simplify Your Workflow.</p>
                        <div className='grid grid-cols-1 mt-12 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16'>
                            {features.map((feature) => (
                                <div key={feature.name}>
                                    <div>
                                        <span className='flex items-center justify-center w-12 h-12 bg-white rounded-md bg-opacity-10'>
                                            <feature.icon
                                                className='w-6 h-6 text-white'
                                                aria-hidden='true'
                                            />
                                        </span>
                                    </div>
                                    <div className='mt-6'>
                                        <h3 className='text-lg font-medium text-white'>{feature.name}</h3>
                                        <p className='mt-2 text-base text-indigo-200'>{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats section */}
                <div className='relative bg-gray-900'>
                    <div className='absolute inset-x-0 bottom-0 h-80 xl:top-0 xl:h-full'>
                        <div className='w-full h-full xl:grid xl:grid-cols-2'>
                            <div className='h-full xl:relative xl:col-start-2'>
                                <img
                                    className='object-cover w-full h-full opacity-25 xl:absolute xl:inset-0'
                                    src='https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100'
                                    alt='People working on laptops'
                                />
                                <div
                                    aria-hidden='true'
                                    className='absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='max-w-4xl px-6 mx-auto lg:max-w-7xl lg:px-8 xl:grid xl:grid-flow-col-dense xl:grid-cols-2 xl:gap-x-8'>
                        <div className='relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24'>
                            <h2 className='text-base font-semibold'>
                                <span className='text-transparent bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text'>Valuable History</span>
                            </h2>
                            <p className='mt-3 text-3xl font-bold tracking-tight text-white'>Discover a new world of possibilities with influencer partnerships.</p>
                            <p className='mt-5 text-lg text-gray-300'>
                                Influencer marketing lets you connect with your target audience through trusted voices they already follow. Imagine reaching millions of potential customers without breaking the bank!
                            </p>
                            <div className='grid grid-cols-1 mt-12 gap-y-12 gap-x-6 sm:grid-cols-2'>
                                {metrics.map((item) => (
                                    <p key={item.id}>
                                        <span className='block text-2xl font-bold text-white'>{item.stat}</span>
                                        <span className='block mt-1 text-base text-gray-300'>
                                            <span className='font-medium text-white'>{item.emphasis}</span> {item.rest}
                                        </span>
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className='bg-white'>
                    <div className='max-w-4xl px-6 py-16 mx-auto sm:py-24 lg:flex lg:max-w-7xl lg:items-center lg:justify-between lg:px-8'>
                        <h2 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                            <span className='block'>Ready to get started?</span>
                            <span className='block pb-1 -mb-1 text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text'>Get in touch or create an account.</span>
                        </h2>
                        <div className='mt-6 space-y-4 sm:flex sm:space-y-0 sm:space-x-5'>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className='w-full md:w-[120px] flex items-center justify-center px-4 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-blue-500 to-indigo-600 bg-origin-border hover:from-blue-600 hover:to-indigo-700 h-18'>
                                        Contact us
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className='sm:max-w-[425px]'>
                                    <DialogHeader>
                                        <DialogTitle>Lets stay in touch!</DialogTitle>
                                        <DialogDescription>If you are interested in further contact please enter details.</DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit}>
                                        <div className='grid gap-4 py-4'>
                                            <div className='grid items-center grid-cols-4 gap-4'>
                                                <Label
                                                    htmlFor='name'
                                                    className='text-right'>
                                                    Name
                                                </Label>
                                                <Input
                                                    id='name'
                                                    placeholder='Jacob Delega'
                                                    className='col-span-3'
                                                    type='name'
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                            <div className='grid items-center grid-cols-4 gap-4'>
                                                <Label
                                                    htmlFor='email'
                                                    className='text-right'>
                                                    Email
                                                </Label>
                                                <Input
                                                    id='email'
                                                    placeholder='jacobdelega@gmail.com'
                                                    className='col-span-3'
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button type='submit'>Save changes</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>

                            <a
                                href='#'
                                className='flex items-center justify-center px-4 py-3 text-base font-medium text-blue-800 border border-transparent rounded-md shadow-sm bg-indigo-50 hover:bg-indigo-100 w-25'>
                                Get started
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <footer
                className='bg-gray-50'
                aria-labelledby='footer-heading'>
                <h2
                    id='footer-heading'
                    className='sr-only'>
                    Footer
                </h2>
                <div className='px-6 pt-16 pb-8 mx-auto max-w-7xl lg:px-8 lg:pt-24'>
                    {/* <div className='xl:grid xl:grid-cols-3 xl:gap-8'>
                        <div className='grid grid-cols-2 gap-8 xl:col-span-2'>
                            <div className='md:grid md:grid-cols-2 md:gap-8'>
                                <div>
                                    <h3 className='text-base font-medium text-gray-900'>Solutions</h3>
                                    <ul role='list' className='mt-4 space-y-4'>
                                        {footerNavigation.solutions.map((item) => (
                                            <li key={item.name}>
                                                <a href={item.href} className='text-base text-gray-500 hover:text-gray-900'>
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className='mt-12 md:mt-0'>
                                    <h3 className='text-base font-medium text-gray-900'>Support</h3>
                                    <ul role='list' className='mt-4 space-y-4'>
                                        {footerNavigation.support.map((item) => (
                                            <li key={item.name}>
                                                <a href={item.href} className='text-base text-gray-500 hover:text-gray-900'>
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className='md:grid md:grid-cols-2 md:gap-8'>
                                <div>
                                    <h3 className='text-base font-medium text-gray-900'>Company</h3>
                                    <ul role='list' className='mt-4 space-y-4'>
                                        {footerNavigation.company.map((item) => (
                                            <li key={item.name}>
                                                <a href={item.href} className='text-base text-gray-500 hover:text-gray-900'>
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className='mt-12 md:mt-0'>
                                    <h3 className='text-base font-medium text-gray-900'>Legal</h3>
                                    <ul role='list' className='mt-4 space-y-4'>
                                        {footerNavigation.legal.map((item) => (
                                            <li key={item.name}>
                                                <a href={item.href} className='text-base text-gray-500 hover:text-gray-900'>
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='mt-12 xl:mt-0'>
                            <h3 className='text-base font-medium text-gray-900'>Subscribe to our newsletter</h3>
                            <p className='mt-4 text-base text-gray-500'>The latest news, articles, and resources, sent to your inbox weekly.</p>
                            <form className='mt-4 sm:flex sm:max-w-md'>
                                <label htmlFor='email-address' className='sr-only'>
                                    Email address
                                </label>
                                <input
                                    type='email'
                                    name='email-address'
                                    id='email-address'
                                    autoComplete='email'
                                    required
                                    className='w-full min-w-0 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-indigo-500'
                                    placeholder='Enter your email'
                                />
                                <div className='mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0'>
                                    <button
                                        type='submit'
                                        className='flex items-center justify-center w-full px-4 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border hover:from-purple-700 hover:to-indigo-700'>
                                        Subscribe
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div> */}
                    <div className='pt-8 mt-6 border-t border-gray-200 md:flex md:items-center md:justify-between lg:mt-16'>
                        <div className='flex space-x-6 md:order-2'>
                            {footerNavigation.social.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className='text-gray-400 hover:text-gray-500'>
                                    <span className='sr-only'>{item.name}</span>
                                    <item.icon
                                        className='w-6 h-6'
                                        aria-hidden='true'
                                    />
                                </a>
                            ))}
                        </div>
                        <p className='mt-8 text-base text-gray-400 md:order-1 md:mt-0'>&copy; 2024 Marketing Simplified, Inc. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
