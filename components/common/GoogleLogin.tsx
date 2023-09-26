"use client";

import React from "react";
import { Button } from "../ui/button";

import GoogleIcon from "public/images/google-login-icon.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";

interface GoogleLoginProps {
	className?: string;
}

function GoogleLogin({ className }: GoogleLoginProps) {
	return (
		<Button
			variant="outline"
			className={cn("w-full h-12", className)}
			onClick={() => signIn("google", { callbackUrl: "/" })}
		>
			<Image width={32} height={32} alt="G" src={GoogleIcon} />
			<span className="font-bold">구글 계정으로 가입</span>
		</Button>
	);
}

export default GoogleLogin;
