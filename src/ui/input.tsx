import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"file:text-gray-800 placeholder:text-gray-500 selection:bg-gray-100 selection:text-gray-800 border-gray-200 flex h-9 w-full min-w-0 rounded-sm border bg-white px-3 py-1 text-gray-800 shadow-md transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				"focus-visible:shadow-lg focus-visible:border-gray-300",
				"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
				className
			)}
			{...props}
		/>
	);
}

export { Input };
