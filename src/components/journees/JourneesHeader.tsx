import { Label } from "@/ui/label";

export default function JourneesHeader() {
	return (
		<div className="w-full bg-gray-200 flex flex-col items-center justify-end text-center py-[3vh] shadow-xl">
			<div className="w-full flex flex-col items-center justify-center">
				<div className="w-full flex flex-col items-center justify-center">
					<div className="w-full flex flex-col items-center justify-between gap-0">
						<Label className="text-[6vw] text-primary font-bold text-center">
							CALENDRIER 2025
						</Label>
						<Label className="text-[6vw] text-primary font-bold text-center">
							DES COURSES HIPPIQUES
						</Label>
					</div>
				</div>
			</div>
		</div>
	);
}
