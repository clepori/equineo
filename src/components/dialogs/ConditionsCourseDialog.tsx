"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Label } from "@/ui/label";
import Image from "next/image";
import type { CourseWithDetailsRow } from "@/types/queryTypes";

function formatPrixXPF(prix?: number | string | null): string {
	if (!prix) return "";
	const prixNum = typeof prix === "string" ? parseFloat(prix) : prix;
	return (
		prixNum.toLocaleString("fr-FR", { maximumFractionDigits: 0 }) +
		" XPF"
	);
}
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

type Props = {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	course: CourseWithDetailsRow | null | undefined;
};

export function CourseDetailDialog({ open, onOpenChange, course }: Props) {
	if (!course) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="w-[85vw] h-[55vh] p-0 border-none opacity-90">
				<Image
					src="/images/screen-dialog.png"
					alt="fond-application"
					fill
					className="object-contain object-bottom absolute inset-0 bottom-0 top-auto -z-50 rounded-md pointer-events-none select-none"
					priority
				/>
				<DialogHeader className="flex flex-col items px-6 pt-6 pb-0">
					<div className="flex items-center gap-2">
						<Image
							src={getTypeCourseImage(
								course.type_course
							)}
							alt="type_course"
							width={60}
							height={60}
							className="object-contain"
						/>
					</div>
					<div className="flex items-center gap-2">
						<DialogTitle className="text-primary text-[5vw]">
							{course.course_nom}
						</DialogTitle>
					</div>
					<div className="flex flex-col items-start gap-0 pt-2">
						<Label className="text-[3.5vw] text-gray-800">
							<span className="text-primary font-semibold">
								Prix :
							</span>{" "}
							{formatPrixXPF(
								course?.course_prix
							)}
						</Label>
						<Label className="text-[2.8vw] italic text-gray-600">
							(
							{[0.5, 0.25, 0.15, 0.1]
								.map((taux) =>
									Math.round(
										(course?.course_prix as number) *
											taux
									).toLocaleString()
								)
								.join(" / ")}
							)
						</Label>
						<Label className="text-[2.8vw] italic text-gray-600">
							si 8 et + (
							{[
								0.5, 0.23, 0.14,
								0.08, 0.05,
							]
								.map((taux) =>
									Math.round(
										(course?.course_prix as number) *
											taux
									).toLocaleString()
								)
								.join(" / ")}
							)
						</Label>
						<Label className="text-[3.5vw] text-primary font-semibold pt-1">
							{"Course financée par "}
							{
								course.course_donnateur
							}
						</Label>
					</div>
					<div className="flex flex-col items-start justify-start gap-1 pt-2">
						<Label className="font-semibold text-primary">
							Conditions :
						</Label>
						<Label className="text-[3.5vw] text-gray-800 text-justify">
							{
								course.course_condition1
							}
						</Label>
						{course.course_condition2 && (
							<Label className="text-[3.5vw] text-gray-800">
								{
									course.course_condition2
								}
							</Label>
						)}
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
