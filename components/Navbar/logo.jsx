import React from "react";
import Link from "next/link";

const logo = () => {
    return (
        <h2 className='text-xl sm:text-3xl font-bold text-blue-500'>
            <Link href='/'>MarketSimp</Link>
        </h2>
    );
};

export default logo;
