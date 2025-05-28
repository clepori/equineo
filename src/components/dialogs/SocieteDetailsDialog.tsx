"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import Image from "next/image";
import type { SocieteDetailsRow } from "@/types/queryTypes";
import { getOrCreateDbConnection } from "@/lib/sqlite";
import { getSocieteDetails } from "@/lib/query";
import { Label } from "@/ui/label";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	societeId?: number;
};

export default function SocieteDetailsDialog({
	open,
	onOpenChange,
	societeId,
}: Props) {
	const [loading, setLoading] = useState(false);
	const [details, setDetails] = useState<SocieteDetailsRow[]>([]);

	useEffect(() => {
		if (!open || !societeId) return;
		setLoading(true);
		let cancelled = false;
		(async () => {
			const db = await getOrCreateDbConnection();
			const data = await getSocieteDetails(db, societeId);
			if (!cancelled) {
				setDetails(data);
				setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [open, societeId]);

	const societe = details[0];

	// Regroupement par fonction (garde la logique)
	const membresParFonction = details
		.filter((m) => m.membre_nom)
		.reduce((acc, m) => {
			if (!m.membre_fonction) return acc;
			if (!acc[m.membre_fonction])
				acc[m.membre_fonction] = [];
			acc[m.membre_fonction].push(m);
			return acc;
		}, {} as Record<string, SocieteDetailsRow[]>);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="w-[85vw] h-[80vh] sm:h-[95vh] p-0 border-none opacity-90">
				<Image
					src="/images/screen-dialog.png"
					alt="fond-application"
					fill
					className="object-contain object-bottom absolute inset-0 bottom-0 top-auto -z-50 rounded-md pointer-events-none select-none"
					priority
				/>
				<DialogHeader className="flex flex-col items px-6 pt-6 pb-0">
					<DialogTitle className="flex flex-col items-center">
						{societe && (
							<>
								<Image
									src={
										societe.societe_abrege
											? `/images/societes/${societe.societe_abrege}.svg`
											: "/images/societes/default.svg"
									}
									alt={
										societe.societe_nom ||
										"Logo"
									}
									width={
										60
									}
									height={
										60
									}
									className="mb-2 object-contain rounded-full"
									priority
								/>
								<div className="text-[5vw] font-bold text-primary">
									{
										societe.societe_nom
									}
								</div>
								<div className="text-[4vw] text-gray-800 mb-1 pt-2">
									{
										societe.societe_abrege
									}
								</div>
							</>
						)}
					</DialogTitle>
					<div className="flex flex-col items-center gap-0 pt-2">
						{loading ? (
							<div className="text-gray-400 py-4">
								Chargement des
								membres…
							</div>
						) : details.length === 0 ? (
							<div className="text-gray-400 py-4">
								Aucun membre
								renseigné
							</div>
						) : (
							<ul className="flex flex-col gap-1 w-full overflow-y-auto items-center justify-center text-center">
								{Object.entries(
									membresParFonction
								).map(
									([
										fonction,
										membres,
									]) => (
										<li
											key={
												fonction
											}
										>
											<Label className="w-full flex items-center justify-center text-primary text-[3.5vw] font-semibold text-center">
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
															<Label className="text-primary text-[3.5vw] text-center text-gray-800">
																{
																	m.membre_civilite
																}{" "}
																{
																	m.membre_prenom
																}{" "}
																{
																	m.membre_nom
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
						)}
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
