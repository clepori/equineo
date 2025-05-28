"use client";

import Image from "next/image";
import { Button } from "@/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChevauxHeader from "@/components/chevaux/ChevauxHeader";
import type {
	JourneeCourseRow,
	CourseWithDetailsRow,
	CourseChevalDetailsRow,
} from "@/types/queryTypes";
import ChevauxCarouselList from "../chevaux/ChevauxCarouselList";
import ChevauxAccordionList from "../chevaux/ChevauxAccordionList";
import { ChevauxViewToggle } from "../chevaux/ChevauxViewToggle";
import { getOrCreateDbConnection } from "@/lib/sqlite";
import {
	getCourseById,
	getJourneeCourseById,
	getCoursesChevauxByCourseId,
} from "@/lib/query";

type ChevauxView = "carousel" | "accordion";

export default function ChevauxPage() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const idStr = searchParams.get("id_course");
	const courseId = idStr ? Number(idStr) : undefined;

	const [loading, setLoading] = useState(true);
	const [course, setCourse] = useState<CourseWithDetailsRow | null>(null);
	const [journee, setJournee] = useState<JourneeCourseRow | null>(null);
	const [chevaux, setChevaux] = useState<CourseChevalDetailsRow[]>([]);
	const [view, setView] = useState<ChevauxView>("carousel");

	useEffect(() => {
		let cancelled = false;
		async function fetchData() {
			if (!courseId) {
				setCourse(null);
				setChevaux([]);
				setJournee(null);
				setLoading(false);
				return;
			}
			setLoading(true);
			const db = await getOrCreateDbConnection();
			const c = await getCourseById(db, courseId);
			const ch = await getCoursesChevauxByCourseId(
				db,
				courseId
			);
			const j = c?.journee_id
				? await getJourneeCourseById(db, c.journee_id)
				: null;
			if (!cancelled) {
				setCourse(c);
				setChevaux(ch);
				setJournee(j);
				setLoading(false);
			}
		}
		fetchData();
		return () => {
			cancelled = true;
		};
	}, [courseId]);

	return (
		<div className="flex flex-col justify-start items-center h-screen w-screen overflow-hidden relative">
			<Image
				src="/images/screen.png"
				alt="fond-application"
				fill
				className="object-fill absolute inset-0 -z-50"
				priority
			/>
			<div className="w-full px-[8vw] pt-[8vw] pb-[4vw]">
				<Button
					variant={"primary"}
					size={"icon_rounded_medium"}
					className="shadow-xl"
					onClick={() => router.back()}
				>
					<ArrowLeft />
				</Button>
			</div>
			<div className="w-full px-[8vw] pb-[0vh]">
				<ChevauxHeader
					course={course}
					journee={journee}
					nbPartants={chevaux.length}
					loading={loading}
				/>
			</div>
			<div className="flex justify-end w-full pb-4 pr-[8vw]">
				<ChevauxViewToggle
					view={view}
					onToggle={setView}
				/>
			</div>
			{view === "carousel" ? (
				<ChevauxCarouselList
					chevaux={chevaux}
					loading={loading}
				/>
			) : (
				<ChevauxAccordionList
					chevaux={chevaux}
					loading={loading}
				/>
			)}
		</div>
	);
}
