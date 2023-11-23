import React from "react";
import Image from "next/image";
import Link from "next/link";

function Logo() {
	return (
		<Link href="/">
			<Image src="/images/logo.png" alt="Logo" width={220} height={40} />
		</Link>
	);
}

export default Logo;
