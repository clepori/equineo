import { Button } from "@/ui/button";
import { Calendar, ChartPie } from "lucide-react";

type Props = {
	activeTab: "journees" | "dashboard";
	onTabChange: (tab: "journees" | "dashboard") => void;
};

export default function JourneesTabs({ activeTab, onTabChange }: Props) {
	return (
		<div className="flex flex-row justify-centerpb-2 -mt-[0.2vh] gap-[6vw]">
			<Button
				variant={"ghost"}
				size={"icon_rounded_large"}
				onClick={() => onTabChange("journees")}
				className={`bg-transparent flex-1 flex flex-col items-center justify-center gap-2 py-2 ${
					activeTab === "journees"
						? "text-primary font-bold"
						: "text-primary/30"
				}`}
			>
				<div className="flex flex-col items-center gap-2">
					<Calendar size={20} />
					<span className="text-xs">Agenda</span>
				</div>
			</Button>
			<Button
				variant={"ghost"}
				size={"icon_rounded_large"}
				onClick={() => onTabChange("dashboard")}
				className={`bg-transparent flex-1 flex flex-col items-center justify-center gap-2 py-2 ${
					activeTab === "dashboard"
						? "text-primary font-bold"
						: "text-primary/30"
				}`}
			>
				<div className="flex flex-col items-center gap-2">
					<ChartPie size={20} />
					<span className="text-xs">
						Statistique
					</span>
				</div>
			</Button>
		</div>
	);
}
