"use client";

import { useState } from "react";
import { Button } from "@/ui/button";
import { CourseDetailDialog } from "@/components/dialogs/ConditionsCourseDialog"; // <- ce dialog-là tu l'as déjà fait
import SocieteDetailsDialog from "@/components/dialogs/SocieteDetailsDialog";
import EquipeTechniqueDialog from "@/components/dialogs/EquipeTechniqueDialog";
import coursesData from "@/datas/courses_1.json";

// Societe et Equipe Technique : adaptent à l'import de tes fichiers/dossiers
// (les exemples de JSON sont fournis ci-dessus)
// import societeData from "@/datas/societe_1.json";
// import equipeTechData from "@/datas/equipe_technique_1.json";

export default function TestPage() {
	const [openCourse, setOpenCourse] = useState(false);
	const [openSociete, setOpenSociete] = useState(false);
	const [openEquipe, setOpenEquipe] = useState(false);

	const course = Array.isArray(coursesData)
		? coursesData[0]
		: coursesData;
	const societeId = 1;
	const journeeId = 1;

	return (
		<div className="flex flex-col gap-5 items-center justify-center min-h-[60vh]">
			<Button
				size="small"
				onClick={() => setOpenCourse(true)}
			>
				Afficher le détail de la course
			</Button>
			<Button
				size="small"
				variant="secondary"
				onClick={() => setOpenSociete(true)}
			>
				Afficher la société
			</Button>
			<Button
				size="small"
				variant="secondary"
				onClick={() => setOpenEquipe(true)}
			>
				Afficher l’équipe technique
			</Button>

			<CourseDetailDialog
				open={openCourse}
				onOpenChange={setOpenCourse}
				course={course}
			/>
			<SocieteDetailsDialog
				open={openSociete}
				onOpenChange={setOpenSociete}
				societeId={societeId}
			/>
			<EquipeTechniqueDialog
				open={openEquipe}
				onOpenChange={setOpenEquipe}
				journeeId={journeeId}
			/>
		</div>
	);
}
