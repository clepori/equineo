"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
	className,
	...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			className={cn(
				"peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-100 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-gray-200 shadow-md transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50",
				className
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={cn(
					"bg-white border border-gray-200 pointer-events-none block size-[20px] -mt-[0.4px] rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-5.5px)] data-[state=unchecked]:-translate-x-[1px]"
				)}
			/>
		</SwitchPrimitive.Root>
	);
}

export { Switch };
