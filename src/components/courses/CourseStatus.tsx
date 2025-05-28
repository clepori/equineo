import { Label } from "@/ui/label";
import { useEffect, useState } from "react";

// Formatage du compte à rebours (mm min. ss sec.)
export function formatCountdown(ms: number) {
	const totalSec = Math.max(0, Math.floor(ms / 1000));
	const min = Math.floor(totalSec / 60);
	const sec = totalSec % 60;
	return `${min.toString().padStart(2, "0")} min. ${sec
		.toString()
		.padStart(2, "0")} sec.`;
}

// Statut dynamique de la course
export function CourseStatus({ dateISO }: { dateISO?: string }) {
	const [now, setNow] = useState<Date>(new Date());

	useEffect(() => {
		const timer = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	if (!dateISO) {
		return (
			<div className="text-center text-[3.5vw] px-3 py-0.5 rounded-br-sm rounded-tl-sm flex items-center justify-center bg-gray-400 text-gray-800">
				Statut inconnu
			</div>
		);
	}

	// dateCourse est un objet Date en UTC
	const dateCourse = new Date(dateISO);

	// now est aussi en heure locale, donc la soustraction fonctionne parfaitement
	const diffMs = dateCourse.getTime() - now.getTime();
	const diffSec = diffMs / 1000;

	let label = "";
	let colorClass = "";

	if (isNaN(diffMs)) {
		label = "";
		colorClass = "invisible";
	} else if (diffSec > 20 * 60) {
		label = "Prochaine course";
		colorClass = "bg-gray-100 text-gray-400";
	} else if (diffSec > 10 * 60) {
		label = "Prochaine course";
		colorClass = "bg-cyan-200 text-primary";
	} else if (diffSec > 2 * 60) {
		label = "Départ dans " + formatCountdown(diffMs);
		colorClass = "bg-yellow-300 text-black";
	} else if (diffSec > 0) {
		label = "Départ imminent : " + formatCountdown(diffMs);
		colorClass = "bg-orange-500 text-white";
	} else if (diffSec > -8 * 60) {
		label = "En cours";
		colorClass = "bg-green-600 text-white";
	} else {
		label = "Terminée";
		colorClass = "bg-red-500 text-white";
	}

	return (
		<Label
			className={`text-center text-[3.5vw] px-3 py-0.5 rounded-br-sm rounded-tl-sm flex items-center justify-center ${colorClass}`}
		>
			{label}
		</Label>
	);
}
