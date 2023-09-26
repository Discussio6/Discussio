"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

interface SessionProviderProps {
	children: React.ReactNode;
}

function SessionProviderWrapper({ children }: SessionProviderProps) {
	return <SessionProvider>{children}</SessionProvider>;
}

export default SessionProviderWrapper;
