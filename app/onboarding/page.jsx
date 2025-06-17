"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { Suspense } from "react";

import { AnimatedForm } from "@/components/AnimatedForm/AnimatedForm";

const onBoarding = () => {
    const handleSubmit = () => {
        console.log("form submitted");
    };

    // Data to be grabbed from the form
    // need userType
    // if company, need companyName, companyDescription
    // if influencer, need bio, niche

    return (
        <Suspense>
            <AnimatedForm />
        </Suspense>
    );
};

export default onBoarding;
