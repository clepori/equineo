"use client";
import { AlignVerticalSpaceAround, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";

type ChevauxView = "carousel" | "accordion";

interface ChevauxViewToggleProps {
	view: ChevauxView;
	onToggle: (view: ChevauxView) => void;
	className?: string;
}

export function ChevauxViewToggle({
	view,
	onToggle,
	className,
}: ChevauxViewToggleProps) {
	return (
		<div
			className={cn(
				"flex flex-col gap-1 cursor-pointer transition-all duration-300",
				className
			)}
		>
			<Label className="text-[2.5vw]">Affichage</Label>
			<div className="flex items-center gap-1">
				<Button
					size={"icon_square_xsmall"}
					variant={"ghost"}
					className={cn(
						"flex-1 flex items-center justify-center transition-all",
						view === "carousel"
							? "bg-gray-200 text-gray-800 font-bold shadow"
							: "hover:bg-zinc-100 text-zinc-600"
					)}
					onClick={() => onToggle("carousel")}
					aria-pressed={view === "carousel"}
				>
					<AlignVerticalSpaceAround size={16} />
				</Button>
				<Button
					size={"icon_square_xsmall"}
					variant={"ghost"}
					className={cn(
						"flex-1 flex items-center justify-center transition-all",
						view === "accordion"
							? "bg-gray-200 text-gray-800 font-bold shadow"
							: "hover:bg-zinc-100 text-zinc-600"
					)}
					onClick={() => onToggle("accordion")}
					aria-pressed={view === "accordion"}
				>
					<LayoutList size={16} />
				</Button>
			</div>
		</div>
	);
}
