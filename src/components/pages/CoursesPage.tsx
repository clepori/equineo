"use client";

import Image from "next/image";
import { Button } from "@/ui/button";
import { ArrowLeft } from "lucide-react";
import CoursesStackList from "../courses/CoursesStackList";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getOrCreateDbConnection } from "@/lib/sqlite";
import { getJourneeCourseById, getCoursesWithDetails } from "@/lib/query";
import type {
	JourneeCourseRow,
	CourseWithDetailsRow,
} from "@/types/queryTypes";
import CoursesHeader from "../courses/CoursesHeader";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function CoursesPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const isTablet = useMediaQuery("(min-width: 640px)");

	// Récupère l'id de la journée courante (depuis l'URL)
	const idStr = searchParams.get("id_journee_course");
	const journeeId = idStr ? Number(idStr) : undefined;

	const [loading, setLoading] = useState(true);
	const [courses, setCourses] = useState<CourseWithDetailsRow[]>([]);
	const [journee, setJournee] = useState<JourneeCourseRow | null>(null);

	useEffect(() => {
		if (!journeeId) {
			setCourses([]);
			setJournee(null);
			setLoading(false);
			return;
		}
		let cancelled = false;
		(async () => {
			setLoading(true);
			const db = await getOrCreateDbConnection();
			const j = await getJourneeCourseById(db, journeeId);
			const cs = await getCoursesWithDetails(db, journeeId);
			if (!cancelled) {
				setJournee(j);
				setCourses(cs);
				setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [journeeId]);

	return (
		<div className="flex flex-col justify-start items-center h-screen w-screen overflow-hidden relative">
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
			<div className="w-full px-[8vw] pt-[8vw] pb-[4vw]">
				<Button
					variant={"primary"}
					size={"icon_rounded_medium"}
					className="shadow-xl"
					onClick={() =>
						router.push("/journees-courses")
					}
				>
					<ArrowLeft />
				</Button>
			</div>
			<div className="w-full px-[8vw] pb-[0vh]">
				<CoursesHeader
					journee={journee}
					loading={loading}
					nbCourses={
						courses.filter(
							(c) =>
								c.course_type?.toLowerCase() ===
								"course"
						).length
					}
					nbAnimations={
						courses.filter(
							(c) =>
								c.course_type?.toLowerCase() ===
								"animation"
						).length
					}
				/>
			</div>
			<CoursesStackList courses={courses} loading={loading} />
		</div>
	);
}
