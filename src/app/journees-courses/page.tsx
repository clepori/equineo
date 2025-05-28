"use client";

import { JourneeCarousel } from "@/components/journees/JourneesCarousel";
import JourneesTabs from "@/components/journees/JourneesTabs";
import { getAllJourneesCourses } from "@/lib/query";
import { getOrCreateDbConnection } from "@/lib/sqlite";
import { JourneeCourseRow } from "@/types/queryTypes";
import { Label } from "@/ui/label";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function JourneesCoursesPage() {
	const isTablet = useMediaQuery("(min-width: 640px)");
	const [tab, setTab] = useState<"journees" | "dashboard">("journees");
	const [journees, setJournees] = useState<JourneeCourseRow[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let cancelled = false;
		(async () => {
			const db = await getOrCreateDbConnection();
			const data = await getAllJourneesCourses(db);
			if (!cancelled) {
				setJournees(data);
				setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<div className="flex flex-col justify-start items-center h-screen w-screen overflow-hidden relative">
			{/* FOND d'écran optimisé */}
			{isTablet ? (
				<Image
					src="/images/screen-tablet.png"
					alt="fond-application-tablette"
					fill
					className="object-fill absolute inset-0 -z-50"
					priority
				/>
			) : (
				<Image
					src="/images/screen.png"
					alt="fond-application-mobile"
					fill
					className="object-fill absolute inset-0 -z-50"
					priority
				/>
			)}
			<div className="w-full px-[10vw] pt-[25vw] sm:pt-[15vw] pb-[1vh]">
				<Label className="text-[5vw] font-bold">
					COURSES HIPPIQUES
				</Label>
				<Label className="text-[9vw] font-bold text-primary -mt-[1vh]">
					SAISON 2025
				</Label>
				<div className="pt-[3vh] flex">
					<JourneesTabs
						activeTab={tab}
						onTabChange={setTab}
					/>
				</div>
			</div>
			<div className="w-full flex-1 flex items-center justify-center">
				{tab === "journees" ? (
					loading ? (
						<div className="text-lg text-muted-foreground py-16">
							Chargement des journées…
						</div>
					) : journees.length > 0 ? (
						<JourneeCarousel
							journees={journees}
						/>
					) : (
						<div className="text-center text-muted-foreground text-lg py-16">
							Aucune journée à
							afficher.
						</div>
					)
				) : (
					<div className="p-4 bg-white text-center text-xs text-muted-foreground rounded-lg shadow">
						Page en développement
					</div>
				)}
			</div>
		</div>
	);
}
