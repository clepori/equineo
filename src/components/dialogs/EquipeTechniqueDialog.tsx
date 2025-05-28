"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import Image from "next/image";
import { Label } from "@/ui/label";
import type { JourneeEquipeTechniqueRow } from "@/types/queryTypes";
import { getOrCreateDbConnection } from "@/lib/sqlite";
import { getEquipeTechniqueByJournee } from "@/lib/query";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	journeeId?: number;
};

export default function EquipeTechniqueDialog({
	open,
	onOpenChange,
	journeeId,
}: Props) {
	const [loading, setLoading] = useState(false);
	const [details, setDetails] = useState<JourneeEquipeTechniqueRow[]>([]);

	useEffect(() => {
		if (!open || !journeeId) return;
		setLoading(true);
		let cancelled = false;
		(async () => {
			const db = await getOrCreateDbConnection();
			const data = await getEquipeTechniqueByJournee(
				db,
				journeeId
			);
			if (!cancelled) {
				setDetails(data);
				setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [open, journeeId]);

	// Regroupement par fonction
	const membresParFonction = details
		.filter((m) => m.et_membre_nom)
		.reduce((acc, m) => {
			if (!m.et_membre_fonction) return acc;
			if (!acc[m.et_membre_fonction])
				acc[m.et_membre_fonction] = [];
			acc[m.et_membre_fonction].push(m);
			return acc;
		}, {} as Record<string, JourneeEquipeTechniqueRow[]>);

	// 2 colonnes équilibrées
	const fonctions = Object.entries(membresParFonction);
	const mid = Math.ceil(fonctions.length / 2);
	const columns = [fonctions.slice(0, mid), fonctions.slice(mid)];

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="w-[85vw] h-[85vh] sm:h-[95vh] p-0 border-none opacity-90">
				<Image
					src="/images/screen-dialog.png"
					alt="fond-application"
					fill
					className="object-contain object-bottom absolute inset-0 bottom-0 top-auto -z-50 rounded-md pointer-events-none select-none"
					priority
				/>
				<DialogHeader className="flex flex-col items-center px-6 pt-6 pb-0">
					<DialogTitle className="text-[5vw] font-bold text-primary">
						Équipe technique
					</DialogTitle>
					<div className="flex flex-col items-center justify-start gap-2 w-full">
						{loading ? (
							<div className="text-gray-400 py-4">
								Chargement de
								l&apos;équipe…
							</div>
						) : details.length === 0 ? (
							<div className="text-gray-400 py-4">
								Aucun membre
								renseigné
							</div>
						) : (
							<div className="w-full gap-x-4 pt-2">
								{columns.map(
									(
										col,
										colIdx
									) => (
										<ul
											key={
												colIdx
											}
											className="flex flex-col gap-0"
										>
											{col.map(
												([
													fonction,
													membres,
												]) => (
													<li
														key={
															fonction
														}
													>
														<Label className="w-full flex items-center justify-center gap-2 text-primary text-[3.2vw] sm:text-[2.8vw] font-semibold">
															{
																fonction
															}
														</Label>
														<ul className="w-full gap-x-2 text-center pb-1">
															{membres.map(
																(
																	m,
																	idx
																) => (
																	<li
																		key={
																			idx
																		}
																		className="w-full flex flex-row items-center justify-center gap-0.5"
																	>
																		<Label className="text-primary text-[3.2vw] sm:text-[2.8vw] text-center text-gray-800">
																			{
																				m.et_membre_civilite
																			}{" "}
																			{
																				m.et_membre_prenom
																			}{" "}
																			{
																				m.et_membre_nom
																			}
																		</Label>
																	</li>
																)
															)}
														</ul>
													</li>
												)
											)}
										</ul>
									)
								)}
							</div>
						)}
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
