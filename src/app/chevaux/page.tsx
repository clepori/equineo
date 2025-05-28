"use client";

import { Suspense } from "react";
import ChevauxPage from "@/components/pages/ChevauxPage";

export default function CoursesChevauxPage() {
	return (
		<Suspense fallback={<div>Chargement…</div>}>
			<ChevauxPage />
		</Suspense>
	);
}
