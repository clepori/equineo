import "@/styles/globals.css";
import { ReactNode } from "react";
import { Toaster } from "@/ui/sonner"; // shadcn sonner

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="fr" suppressHydrationWarning>
			<body className="font-quicksand antialiased">
				<Toaster
					position="bottom-center"
					richColors
					closeButton
					duration={3500}
				/>
				{children}
			</body>
		</html>
	);
}
