"use client";

import Image from "next/image";
import { BadgeHelp } from "lucide-react";
import { Label } from "@/ui/label";
import { useState } from "react";
import SocieteDetailsDialog from "@/components/dialogs/SocieteDetailsDialog";
import EquipeTechniqueDialog from "@/components/dialogs/EquipeTechniqueDialog";
import type { JourneeCourseRow } from "@/types/queryTypes"; // <- Typage réel

type CoursesHeaderProps = {
	journee?: JourneeCourseRow | null;
	loading?: boolean;
	nbCourses?: number;
	nbAnimations?: number;
	className?: string;
};

export default function CoursesHeader({
	journee,
	loading,
	nbCourses,
	nbAnimations,
	className = "",
}: CoursesHeaderProps) {
	const [openSocieteDialog, setOpenSocieteDialog] = useState(false);
	const [openEquipeDialog, setOpenEquipeDialog] = useState(false);

	const logoPath = journee?.societe_abrege
		? `/images/societes/${journee.societe_abrege}.svg`
		: "/images/societes/default.svg";

	return (
		<>
			<SocieteDetailsDialog
				open={openSocieteDialog}
				onOpenChange={setOpenSocieteDialog}
				societeId={journee?.societe_id ?? undefined}
			/>
			<EquipeTechniqueDialog
				open={openEquipeDialog}
				onOpenChange={setOpenEquipeDialog}
				journeeId={journee?.journee_id}
			/>
			<div
				className={`w-full flex flex-col items-center justify-end text-center ${className}`}
			>
				<div className="w-full flex flex-col items-start justify-center">
					<div className="w-[70vw] flex items-center gap-2">
						<Label className="text-[3.5vw] font-bold">
							{journee?.societe_nom ??
								""}
						</Label>
						<BadgeHelp
							className="text-primary cursor-pointer mt-[2px]"
							size={14}
							onClick={() =>
								setOpenSocieteDialog(
									true
								)
							}
						/>
					</div>
					<Label className="w-full flex items-start text-[6vw] font-bold uppercase underline underline-offset-2">
						{journee?.journee_id
							? `Réunion ${journee.journee_id}`
							: ""}
					</Label>
					<Label className="w-full flex items-start text-[3.2vw] text-gray-800">
						{"Hippodrome "}
						{journee?.hippodrome_nom || ""}
					</Label>
					<Label className="w-full flex items-start text-[3.2vw] text-gray-800">
						{journee?.hippodrome_commune ||
							""}
					</Label>
					<div className="w-full flex items-end justify-between gap-0 pr-[2vw] pb-[2vh]">
						<div className="flex flex-col items-start gap-0">
							<Label className="w-full flex justify-start text-[3.5vw] text-gray-800">
								{loading
									? "…"
									: `${
											nbCourses ??
											0
									  } course${
											nbCourses &&
											nbCourses >
												1
												? "s"
												: ""
									  }${
											nbAnimations
												? ` - ${nbAnimations} animation${
														nbAnimations >
														1
															? "s"
															: ""
												  }`
												: ""
									  }`}
							</Label>
							<div className="flex items-center gap-2">
								<Label className="text-[3.5vw] text-gray-800">
									Équipe
									technique
								</Label>
								<BadgeHelp
									className="text-gray-800 cursor-pointer opacity-80"
									size={
										14
									}
									onClick={() =>
										setOpenEquipeDialog(
											true
										)
									}
								/>
							</div>
						</div>
						<div className="h-[15vw] w-[15vw] flex items-center justify-center">
							<Image
								src={logoPath}
								alt={
									journee?.societe_nom ??
									"Société"
								}
								width={60}
								height={60}
								className="object-contain"
								onError={(
									e
								) => {
									// @ts-expect-error: Next.js Image onError is not fully typed; fallback for missing SVG.
									e.target.src =
										"/images/societes/default.svg";
								}}
								priority
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
