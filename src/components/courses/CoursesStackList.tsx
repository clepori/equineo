"use client";

import Link from "next/link";
import Image from "next/image";
import { Label } from "@/ui/label";
import { CourseWithDetailsRow } from "@/types/queryTypes";
import { CourseStatus } from "./CourseStatus";
import { ContainerScroll, CardSticky } from "@/ui/cardStack";
import { cn } from "@/lib/utils";

// Utils
function formatHeureNC(isoString?: string) {
	if (!isoString) return "—";
	try {
		const d = new Date(isoString);
		const options: Intl.DateTimeFormatOptions = {
			timeZone: "Pacific/Noumea",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		};
		const frTime = d.toLocaleTimeString("fr-FR", options);
		const [hh, mm] = frTime.split(":");
		return `${hh}h${mm}`;
	} catch {
		return "—";
	}
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

function getTypeCourseClass(type_course?: string) {
	return type_course === "Animation" ? "invisible" : "";
}

function hasPMU(course: CourseWithDetailsRow) {
	return !!course.course_pmu;
}

type Props = {
	courses: CourseWithDetailsRow[];
	loading: boolean;
};

export default function CoursesStackList({ courses, loading }: Props) {
	return (
		<div>
			{/* SCROLLABLE CONTAINER - hauteur à ajuster selon ton layout */}
			<div className="w-full h-[71vh] sm:h-[64vh] overflow-y-auto overscroll-contain pb-4">
				<ContainerScroll className="contents">
					{loading ? (
						<CardSticky
							index={0}
							className="w-[90vw] mx-auto flex items-center justify-center text-gray-500 bg-white/80"
						>
							Chargement…
						</CardSticky>
					) : courses.length === 0 ? (
						<CardSticky
							index={0}
							className="w-[90vw] mx-auto flex items-center justify-center text-gray-400 bg-white/80"
						>
							Aucune course trouvée.
						</CardSticky>
					) : (
						courses.map((c, i) => (
							<CardSticky
								key={
									c.course_id
								}
								index={i}
								incrementY={40}
								incrementZ={5}
								className="w-[90vw] mx-auto my-3 rounded-lg border bg-white/90 shadow-xl transition-all hover:scale-[1.025] hover:shadow-2xl"
							>
								<Link
									href={`/chevaux?id_course=${c.course_id}`}
									className="block w-full h-full"
									tabIndex={
										0
									}
								>
									{/* Header */}
									<div className="flex justify-between items-center">
										<div className="text-center text-[4vw] font-bold w-[25%] rounded-tl-md rounded-br-md flex items-center justify-center bg-primary text-white">
											R
											{
												c.journee_id
											}{" "}
											-{" "}
											{c.course_code ??
												c.course_numero}
										</div>
										<Label className="font-bold text-[3.5vw] pr-2 mt-0.5 text-primary">
											Départ
											à{" "}
											{formatHeureNC(
												c.course_heure
											)}
										</Label>
									</div>
									{/* Corps */}
									<div className="w-full flex flex-col items-start justify-between px-4 py-2">
										<div className="w-full flex justify-between items-center">
											<Label className="text-[3.5vw]">
												{
													c.course_type
												}{" "}
												{
													c.course_numero
												}
											</Label>
											<Label className="text-center text-[3.5vw]">
												{[
													"Galop",
													"Trot",
												].includes(
													c.type_course ??
														""
												) ? (
													<>
														{
															c.type_course
														}{" "}
														sur{" "}
														{
															c.course_distance
														}{" "}
														m
													</>
												) : (
													<span className="invisible">
														{
															c.type_course
														}{" "}
														sur{" "}
														{
															c.course_distance
														}{" "}
														m
													</span>
												)}
											</Label>
										</div>
										<Label className="w-full text-[5vw] font-semibold text-primary">
											{
												c.course_nom
											}
										</Label>
									</div>
									{/* Footer/infos */}
									<div className="flex items-center justify-start gap-2 pl-4 pb-0">
										<Image
											src={getTypeCourseImage(
												c.type_course
											)}
											alt="type-course"
											height={
												25
											}
											width={
												25
											}
											className={cn(
												"object-contain relative z-10",
												getTypeCourseClass(
													c.type_course
												)
											)}
											draggable={
												false
											}
											priority
										/>
										{hasPMU(
											c
										) && (
											<Image
												src="/images/logo-pmu.svg"
												alt="logo-pmu"
												height={
													20
												}
												width={
													34
												}
												className="object-contain relative z-10"
												draggable={
													false
												}
												priority
											/>
										)}
									</div>
									<div className="w-full justify-end flex items-center -mt-2.5 px-0 pb-0">
										<CourseStatus
											dateISO={
												c.course_heure
											}
										/>
									</div>
								</Link>
							</CardSticky>
						))
					)}
				</ContainerScroll>
			</div>
		</div>
	);
}
