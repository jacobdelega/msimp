import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    const { pathname } = req.nextUrl;
    
    // Public routes that don't require authentication
    const publicRoutes = [
        "/",
        "/login",
        "/register", 
        "/onboarding",
        "/auth/signin",
        "/auth/signup"
    ];
    
    // API routes that don't require authentication
    const publicApiRoutes = [
        "/api/auth"
    ];
    
    // Check if it's a public route
    const isPublicRoute = publicRoutes.includes(pathname);
    const isPublicApiRoute = publicApiRoutes.some(route => pathname.startsWith(route));
    
    // Allow public routes and API auth routes
    if (isPublicRoute || isPublicApiRoute) {
        return NextResponse.next();
    }
    
    // Get the token to check authentication
    const token = await getToken({ 
        req, 
        secret: process.env.NEXTAUTH_SECRET 
    });
    
    // If user is not authenticated, redirect to login
    if (!token) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        // Match all paths except static files and API routes that shouldn't be protected
        "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)"
    ]
};

