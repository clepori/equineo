"use client";

import Image from "next/image";
import { BadgeHelp } from "lucide-react";
import { Label } from "@/ui/label";
import { useState } from "react";
import type {
	JourneeCourseRow,
	CourseWithDetailsRow,
} from "@/types/queryTypes";
import { Button } from "@/ui/button";
import { CourseDetailDialog } from "@/components/dialogs/ConditionsCourseDialog";

type ChevauxHeaderProps = {
	course?: CourseWithDetailsRow | null;
	journee?: JourneeCourseRow | null;
	nbPartants?: number;
	loading?: boolean;
	className?: string;
};

function getTypeCourseImage(type_course?: string) {
	switch (type_course) {
		case "Galop":
			return "/images/type-course/Galop.svg";
		case "Trot":
			return "/images/type-course/Trot.svg";
		case "Stock":
			return "/images/type-course/Stock.svg";
		case "Trial":
		case "Animation":
			return "/images/type-course/Galop.svg";
		default:
			return "/images/type-course/Galop.svg";
	}
}

function formatPrixXPF(prix?: number | string | null): string {
	if (!prix) return "";
	const prixNum = typeof prix === "string" ? parseFloat(prix) : prix;
	return (
		prixNum.toLocaleString("fr-FR", { maximumFractionDigits: 0 }) +
		" XPF"
	);
}

export default function ChevauxHeader({
	course,
	nbPartants,
	loading,
	className = "",
}: ChevauxHeaderProps) {
	const [openDetailDialog, setOpenDetailDialog] = useState(false);

	return (
		<>
			<CourseDetailDialog
				open={openDetailDialog}
				onOpenChange={setOpenDetailDialog}
				course={course}
			/>

			<div
				className={`w-full flex flex-col items-center justify-end text-center ${className}`}
			>
				{loading ? (
					<div className="w-full flex justify-center items-center py-8 text-gray-500">
						Chargement…
					</div>
				) : (
					<div className="w-full flex flex-col items-start justify-center gap-1">
						<div className="flex items-center gap-3">
							<Button
								variant={"gray"}
								size={
									"icon_rounded_large"
								}
								className="font-bold text-[5vw]"
							>
								{
									course?.course_code
								}
							</Button>
							<Label className="flex items-start text-gray-800 text-[6vw] font-bold uppercase underline underline-offset-2">
								{course
									? `${
											course.course_type ??
											""
									  } ${
											course.course_numero ??
											""
									  }`
									: ""}
							</Label>
						</div>
						<Label className="w-full flex items-start font-bold text-[5vw] text-primary pt-2">
							{course?.course_nom ??
								""}
						</Label>
						<Label className="w-full flex items-start text-[3.5vw] text-gray-800">
							{course?.course_heure
								? `Départ à ${new Date(
										course.course_heure
								  ).toLocaleTimeString(
										"fr-FR",
										{
											timeZone: "Pacific/Noumea",
											hour: "2-digit",
											minute: "2-digit",
											hour12: false,
										}
								  )}`
								: ""}
						</Label>
						<div className="w-full flex items-end justify-between gap-0 pr-[2vw] pb-[2vh]">
							<div className="flex flex-col items-start gap-0">
								<Label
									className={`w-full flex justify-start text-[3.5vw] text-gray-800 ${
										[
											"Galop",
											"Trot",
										].includes(
											course?.type_course ??
												""
										)
											? ""
											: "invisible"
									}`}
								>
									{
										course?.type_course
									}{" "}
									sur{" "}
									{
										course?.course_distance
									}{" "}
									mètres
								</Label>
								<Label className="w-full flex justify-start text-[3.5vw] text-gray-800">
									Prix :{" "}
									{formatPrixXPF(
										course?.course_prix
									)}
								</Label>
								<div className="flex items-center gap-2">
									<Label className="text-[3.5vw] text-gray-800">
										Conditions
										de
										course
									</Label>
									<BadgeHelp
										className="text-gray-800 cursor-pointer opacity-80"
										size={
											14
										}
										onClick={() =>
											setOpenDetailDialog(
												true
											)
										}
									/>
								</div>
								<Label className="w-full flex justify-start text-[3.5vw] text-primary font-semibold">
									{nbPartants ??
										0}{" "}
									chevaux
									partants
								</Label>
							</div>
							<div className="h-[15vw] w-[15vw] flex flex-col items-end justify-center gap-2">
								<Image
									src="/images/logo-pmu.svg"
									alt="logo pmu"
									width={
										30
									}
									height={
										25
									}
									className={`object-contain ${
										course?.course_pmu ==
										1
											? ""
											: "invisible"
									}`}
								/>
								<Image
									src={getTypeCourseImage(
										course?.type_course
									)}
									alt="type_course"
									width={
										40
									}
									height={
										40
									}
									className="object-contain"
									priority
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
