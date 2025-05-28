import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center justify-center rounded-xs border px-3 py-0.5 text-xs font-normal w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
	{
		variants: {
			variant: {
				primary: "border border-transparent bg-primary hover:bg-primary/80 text-white transition duration-200 ease-in-out",
				secondary:
					"border border-transparent bg-secondary hover:bg-secondary/70 text-gray-800 transition duration-200 ease-in-out",
				destructive:
					"border border-transparent bg-red-600 hover:bg-red-600/80 text-white transition duration-200 ease-in-out",

				cyan: "border-transparent bg-cyan-600 hover:bg-cyan-600/80 text-white transition duration-200 ease-in-out",
				pink: "border-transparent bg-pink-600 hover:bg-pink-600/80 text-white transition duration-200 ease-in-out",
				purple: "border-transparent bg-purple-600 hover:bg-purple-600/80 text-white transition duration-200 ease-in-out",
				blue: "border-transparent bg-blue-600 hover:bg-blue-600/80 text-white transition duration-200 ease-in-out",
				red: "border-transparent bg-red-600 hover:bg-red-600/80 text-white transition duration-200 ease-in-out",
				brown: "border-transparent bg-brown-600 hover:bg-brown-600/80 text-white transition duration-200 ease-in-out",
				gray: "border-transparent bg-gray-600 hover:bg-gray-600/80 text-white transition duration-200 ease-in-out",
				outline_primary:
					"border-primary hover:bg-gray-50 text-primary transition duration-200 ease-in-out",
				outline_secondary:
					"border-secondary hover:bg-gray-50 text-gray-800 transition duration-200 ease-in-out",
				outline_cyan:
					"border-cyan-600 hover:bg-gray-50 text-cyan-600 transition duration-200 ease-in-out",
				outline_pink:
					"border-pink-600 hover:bg-gray-50 text-pink-600 transition duration-200 ease-in-out",
				outline_purple:
					"border-purple-600 hover:bg-gray-50 text-purple-600 transition duration-200 ease-in-out",
				outline_blue:
					"border-blue-600 hover:bg-gray-50 text-blue-600 transition duration-200 ease-in-out",
				outline_red:
					"border-red-600 hover:bg-gray-50 text-red-600 transition duration-200 ease-in-out",
				outline_brown:
					"border-brown-600 hover:bg-gray-50 text-brown-600 transition duration-200 ease-in-out",
				outline_gray:
					"border-gray-600 hover:bg-gray-50 text-gray-800 transition duration-200 ease-in-out",
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	}
);

function Badge({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "span";

	return (
		<Comp
			data-slot="badge"
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
