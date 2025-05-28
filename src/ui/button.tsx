import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				primary: "border border-transparent bg-primary hover:bg-primary/80 text-white transition duration-200 ease-in-out shadow-sm hover:shadow-md",
				secondary:
					"border border-transparent bg-secondary hover:bg-secondary/70 text-gray-800 transition duration-200 ease-in-out shadow-sm hover:shadow-md",
				destructive:
					"border border-transparent bg-red-600 hover:bg-red-600/80 text-white transition duration-200 ease-in-out shadow-sm hover:shadow-md",
				ghost: "border border-transparent hover:bg-gray-50 text-gray-800 dark:hover:bg-accent/50",
				link: "border border-transparent text-gray-800 underline-offset-4 hover:underline",

				cyan: "border-transparent bg-cyan-600 hover:bg-cyan-600/80 text-white transition duration-200 ease-in-out shadow-sm hover:shadow-md",
				pink: "border-transparent bg-pink-600 hover:bg-pink-600/80 text-white transition duration-200 ease-in-out shadow-sm hover:shadow-md",
				purple: "border-transparent bg-purple-600 hover:bg-purple-600/80 text-white transition duration-200 ease-in-out shadow-sm hover:shadow-md",
				blue: "border-transparent bg-blue-600 hover:bg-blue-600/80 text-white transition duration-200 ease-in-out shadow-sm hover:shadow-md",
				red: "border-transparent bg-red-600 hover:bg-red-600/80 text-white transition duration-200 ease-in-out shadow-sm hover:shadow-md",
				brown: "border-transparent bg-brown-600 hover:bg-brown-600/80 text-white transition duration-200 ease-in-out shadow-sm hover:shadow-md",
				gray: "border-transparent bg-gray-600 hover:bg-gray-600/80 text-white transition duration-200 ease-in-out shadow-sm hover:shadow-md",
				outline_primary:
					"border-primary hover:bg-gray-50 text-primary transition duration-200 ease-in-out shadow-sm hover:shadow-md",
				outline_secondary:
					"border-secondary hover:bg-gray-50 text-gray-800 transition duration-200 ease-in-out shadow-sm hover:shadow-md",
				outline_cyan:
					"border-cyan-600 hover:bg-gray-50 text-cyan-600 transition duration-200 ease-in-out shadow-sm hover:shadow-md",
				outline_pink:
					"border-pink-600 hover:bg-gray-50 text-pink-600 transition duration-200 ease-in-out shadow-sm hover:shadow-md",
				outline_purple:
					"border-purple-600 hover:bg-gray-50 text-purple-600 transition duration-200 ease-in-out shadow-sm hover:shadow-md",
				outline_blue:
					"border-blue-600 hover:bg-gray-50 text-blue-600 transition duration-200 ease-in-out shadow-sm hover:shadow-md",
				outline_red:
					"border-red-600 hover:bg-gray-50 text-red-600 transition duration-200 ease-in-out shadow-sm hover:shadow-md",
				outline_brown:
					"border-brown-600 hover:bg-gray-50 text-brown-600 transition duration-200 ease-in-out shadow-sm hover:shadow-md",
				outline_gray:
					"border-gray-600 hover:bg-gray-50 text-gray-800 transition duration-200 ease-in-out shadow-sm hover:shadow-md",
			},
			size: {
				small: "h-8 rounded-xs px-4 has-[>svg]:px-2.5 text-sm font-normal",
				medium: "h-10 rounded-sm px-5 py-2 has-[>svg]:px-3 text-sm font-normal",
				large: "h-12 rounded-sm px-6 has-[>svg]:px-4 text-md font-normal",
				icon_square_xsmall: "h-6 w-6 rounded-xs",
				icon_square_small: "h-8 w-8 rounded-xs",
				icon_square_medium: "h-10 w-10 rounded-sm",
				icon_square_large: "h-12 w-12 rounded-sm",
				icon_rounded_xsmall: "h-6 w-6 rounded-full",
				icon_rounded_small: "h-8 w-8 rounded-full",
				icon_rounded_medium: "h-10 w-10 rounded-full",
				icon_rounded_large: "h-12 w-12 rounded-full",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "medium",
		},
	}
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
