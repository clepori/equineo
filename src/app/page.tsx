"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/ui/progress";
import { LogoEquineo } from "@/ui/logo/equineo";
import { Label } from "@/ui/label";
import { createTablesIfNeeded, getOrCreateDbConnection } from "@/lib/sqlite";
import { syncAllTables, syncDynamicTablesOnly } from "@/lib/syncData";
import { toast } from "sonner";
import Image from "next/image";

export default function LoadingPage() {
	const router = useRouter();
	const [progress, setProgress] = useState(0);
	const [step, setStep] = useState("Démarrage d’EQUINEO...");
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const start = async () => {
			try {
				setStep("Connexion à la base locale...");
				setProgress(10);

				setStep("Création de la base et des tables...");
				setProgress(20);
				await createTablesIfNeeded();

				setStep("Préparation de la synchronisation...");
				setProgress(25);

				const db = await getOrCreateDbConnection();

				// Détecte si 1ère synchro ou non
				const res = await db.query(
					"SELECT COUNT(*) as count FROM equineo_update"
				);
				const equineoUpdateRows =
					res.values?.[0]?.count ?? 0;

				const onProgress = (pct: number) => {
					setStep(
						`Synchronisation des données... (${pct}%)`
					);
					setProgress(25 + Math.round(pct * 0.6));
				};

				if (
					!equineoUpdateRows ||
					equineoUpdateRows === 0
				) {
					setStep(
						"Synchronisation initiale (toutes les données)..."
					);
					await syncAllTables(db, onProgress);
				} else {
					setStep(
						"Synchronisation des données récentes..."
					);
					await syncDynamicTablesOnly(
						db,
						onProgress
					);
				}

				setStep("Chargement de l'environnement...");
				setProgress(95);

				setStep("Application prête !");
				setProgress(100);

				setTimeout(() => {
					router.push("/journees-courses");
				}, 700);
			} catch (err: unknown) {
				const message =
					err instanceof Error
						? err.message
						: typeof err === "string"
						? err
						: "Erreur inconnue.";
				console.error(err);
				setError(
					"Erreur lors de la création des tables SQLite ou de la synchronisation."
				);
				setStep("Erreur lors du chargement !");
				setProgress(100);
				toast.error(
					"Impossible de créer la base locale ou de synchroniser.",
					{
						description: message,
					}
				);
			}
		};
		start();
	}, [router]);

	return (
		<div className="relative z-10 flex flex-col items-center justify-between w-full h-[95vh] overflow-hidden">
			{/* Header */}
			<div className="flex flex-col items-center pt-[5vh]">
				<LogoEquineo className="w-[60vw] md:w-[30vw] max-w-xs md:max-w-sm" />
			</div>

			{/* Zone centrale (image décorative, prend tout l'espace restant, collée à droite) */}
			<div className="relative flex-1 w-full flex items-end justify-end">
				<div className="relative w-full h-full min-h-[150px]">
					<Image
						src="/images/fond.svg"
						alt="fond-application-mobile"
						fill
						className="object-cover object-left h-full w-full select-none pointer-events-none -scale-x-100"
						priority
						draggable={false}
					/>
				</div>
			</div>

			{/* Footer Progress */}
			<div className="w-full flex flex-col items-center pt-[2vh] pb-[3vh] z-10">
				<Label className="text-center text-sm text-primary mb-1">
					{step}
				</Label>
				<Progress
					value={progress}
					className="h-5 w-[80vw] max-w-md rounded-full bg-gray-100"
				/>
				{error && (
					<span className="text-xs text-red-500">
						{error}
					</span>
				)}
			</div>
		</div>
	);
}
