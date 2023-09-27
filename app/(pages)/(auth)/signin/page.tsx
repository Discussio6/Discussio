import GoogleLogin from "@/components/common/GoogleLogin";
import Logo from "@/components/common/Logo";
import React from "react";

function SignInPage() {
	return (
		<div className="bg-green w-screen h-screen">
			<div className="container bg-white h-full">
				<main className="flex flex-col h-full items-center justify-center gap-4">
					<Logo />
                    <article className="flex flex-col gap-8 w-full max-w-lg items-center">
                        <p className="text-slate-500 text-sm">소셜 로그인으로 간편하게 가입해보세요</p>
                        <GoogleLogin />
                    </article>
				</main>
			</div>
		</div>
	);
}

export default SignInPage;
