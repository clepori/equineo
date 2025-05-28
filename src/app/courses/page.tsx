"use client";

import { Suspense } from "react";
import CoursesPage from "@/components/pages/CoursesPage";

export default function CoursesPageWrapper() {
	return (
		<Suspense
			fallback={
				<div className="p-4 text-center">
					Chargement…
				</div>
			}
		>
			<CoursesPage />
		</Suspense>
	);
}
