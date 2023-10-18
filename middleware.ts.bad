import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

import {
  adminPages,
  allPages,
  publicPages,
  userPages,
} from "./utils/permission";

import type { NextRequest } from "next/server";
export const middleware = async (request: NextRequest) => {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const role = token?.role;

  const { pathname } = request.nextUrl;

  // ignore API & static files
  if (pathname.includes("/api/auth") || pathname.includes("/_next")) {
    return NextResponse.next();
  }

  // redirect to Homepage
  if (token && (pathname === "/auth/sign-in" || pathname === "/auth/sign-up")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // public pages
  if (publicPages.includes(pathname)) {
    return NextResponse.next();
  }

  // require login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  // private pages
  if (
    allPages.includes(pathname) &&
    ((role === "admin" && !adminPages.includes(pathname)) ||
      (role === "user" && !userPages.includes(pathname)))
  ) {
    return NextResponse.redirect(new URL("/503", request.url));
  }

  return NextResponse.next();
};
