"use client";

import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/ui/accordion";
import type { CourseChevalDetailsRow } from "@/types/queryTypes";
// Importe le JSON simulant la liste des partants pour la course 1 :
import chevauxData from "@/datas/chevaux.json";
import { Label } from "@/ui/label";
import Image from "next/image";
import { FlagIcon } from "../FlagCountry";

type Props = {
	chevaux?: CourseChevalDetailsRow[];
	loading?: boolean;
};

// Correction ici : on prend bien les params !

export default function ChevauxAccordionList({
	chevaux = chevauxData,
	loading = false,
}: Props) {
	return (
		<div className="w-[95vw] pt-1 overflow-y-auto mb-[2vh]">
			<Accordion
				type="single"
				collapsible
				className="w-full bg-white/80 rounded-md px-[3vw]"
			>
				{loading ? (
					<AccordionItem value="loading">
						<AccordionTrigger>
							Chargement…
						</AccordionTrigger>
					</AccordionItem>
				) : chevaux.length === 0 ? (
					<AccordionItem value="none">
						<AccordionTrigger>
							Aucun cheval trouvé
						</AccordionTrigger>
					</AccordionItem>
				) : (
					chevaux.map((c) => (
						<AccordionItem
							value={String(
								c.course_cheval_id
							)}
							key={c.course_cheval_id}
						>
							<AccordionTrigger className="no-underline active:no-underline hover:no-underline">
								<div className="w-full flex items-start gap-2">
									<div className="bg-primary text-white rounded-full flex items-center justify-center w-[10vw] h-[10vw] font-bold text-[5vw]">
										{
											c.cheval_tapis
										}
									</div>
									<div className="w-[85%] flex items-start justify-between -mt-1">
										<div className="w-full flex flex-col">
											<Label className="text-[4.5vw] font-bold text-primary">
												{
													c.cheval_nom
												}
												{c.cheval_pays &&
													c.cheval_pays.toUpperCase() !==
														"NC" && (
														<FlagIcon
															iso={
																c.cheval_pays
															}
															api="circle"
															size={
																18
															}
														/>
													)}
											</Label>
											<div className="w-full flex items-center justify-between">
												<Label className="text-[4vw] sm:text-[3.5vw] text-gray-800 pb-2">
													{
														c.cheval_sexe_nom
													}
													{
														" • "
													}
													{
														c.cheval_age
													}
													{
														" ans • "
													}
													{
														c.cheval_robe
													}
												</Label>
												<Label className="text-[4vw] sm:text-[3.5vw] text-primary font-bold">
													Corde{" "}
													{
														c.cheval_corde
													}
												</Label>
											</div>
											<div className="w-full flex items-center justify-between">
												<Label className="text-[4vw] sm:text-[3.5vw] text-gray-800">
													{c.jockey_pays && (
														<FlagIcon
															iso={
																c.jockey_pays
															}
															api="circle"
															size={
																16
															}
														/>
													)}{" "}
													{
														c.jockey_civilite
													}{" "}
													{
														c.jockey_nom
													}{" "}
													{
														c.jockey_prenom
													}
												</Label>
												<div className="flex items-center gap-1 text-right">
													<Label className="text-[4vw] sm:text-[3.5vw] text-gray-800">
														{
															c.cheval_poids
														}
														kg
													</Label>
													<Label className="text-[3.2vw] sm:text-[2.8vw] text-gray-800">
														(
														{
															c.cheval_poids_comp
														}
														kg)
													</Label>
												</div>
											</div>
										</div>
									</div>
								</div>
							</AccordionTrigger>
							<AccordionContent className="w-full pl-[12vw] pr-[6vw] flex flex-col items-start no-underline active:no-underline hover:no-underline">
								<div className="w-full flex items-start justify-between">
									<div className="w-[30%]">
										<Image
											src={`/images/casaques/${c.proprietaire_nom} ${c.proprietaire_prenom}.svg`}
											alt={`Casaque de ${c.proprietaire_nom} ${c.proprietaire_prenom}`}
											width={
												60
											}
											height={
												50
											}
											className="inline-block mr-1 align-middle"
										/>
									</div>
									<div className="w-[70%] flex flex-col gap-1 text-[3.5vw] sm:text-[3vw] text-gray-800">
										<div>
											<p className="font-semibold text-primary">
												Naisseur :
											</p>{" "}
											<p>
												{
													c.naisseur_civilite
												}{" "}
												{
													c.naisseur_nom
												}{" "}
												{
													c.naisseur_prenom
												}
											</p>
										</div>
										<div>
											<p className="font-semibold text-primary">
												Entraîneur :
											</p>{" "}
											<p>
												{
													c.entraineur_civilite
												}{" "}
												{
													c.entraineur_nom
												}{" "}
												{
													c.entraineur_prenom
												}
											</p>
										</div>
										<div>
											<p className="font-semibold text-primary">
												Propriétaires :
											</p>{" "}
											<p>
												{
													c.proprietaires
												}
											</p>
										</div>
									</div>
								</div>
								<div className="w-full flex flex-col items-start gap-1 pt-2 border-t mt-2">
									<div className="flex flex-col gap-0.5 text-[3.5vw] sm:text-[3vw] text-gray-800">
										<div className="flex items-center gap-1">
											<span className="font-semibold text-primary">
												Père :
											</span>{" "}
											{
												c.cheval_pere
											}{" "}
											{c.cheval_pere_pays &&
												c.cheval_pere_pays.toUpperCase() !==
													"NC" && (
													<FlagIcon
														iso={
															c.cheval_pere_pays
														}
														api="circle"
														size={
															16
														}
													/>
												)}
										</div>
										<div className="flex items-center gap-1 text-[3.5vw] sm:text-[3vw] text-gray-800">
											<span className="font-semibold  text-primary">
												Mère :
											</span>{" "}
											{
												c.cheval_mere
											}{" "}
											{c.cheval_mere_pays &&
												c.cheval_mere_pays.toUpperCase() !==
													"NC" && (
													<FlagIcon
														iso={
															c.cheval_mere_pays
														}
														api="circle"
														size={
															16
														}
													/>
												)}
										</div>
									</div>
									<div className="text-[3.5vw] sm:text-[3vw] text-gray-800">
										<p className="font-semibold text-primary">
											Derniers
											résultats
											:
										</p>{" "}
										<p>
											{
												c.proprietaires
											}
										</p>
									</div>
								</div>
							</AccordionContent>
						</AccordionItem>
					))
				)}
			</Accordion>
		</div>
	);
}
