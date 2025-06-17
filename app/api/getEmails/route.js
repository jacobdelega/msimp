import Email from "../../../models/emails";
import connectDB from "../../../lib/dbConnection";

import { NextResponse } from 'next/server';


export async function GET() {
    'use server'
    try{
        connectDB();
        const emails = await Email.find({})
        return NextResponse.json(emails)
    } catch(error){
        throw new Error("Failed To Get Contacts " + error)
    }
}
