"use client";

import { useState, useRef } from "react";
import type { CourseChevalDetailsRow } from "@/types/queryTypes";
import chevauxData from "@/datas/chevaux.json";
import { Label } from "@/ui/label";
import Image from "next/image";
import { FlagIcon } from "../FlagCountry";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

type Props = {
	chevaux?: CourseChevalDetailsRow[];
	loading?: boolean; // tu peux le garder si tu veux afficher "Chargement...", sinon retire complètement
};

function sanitizeFileName(nom?: string | null, prenom?: string | null) {
	return `${nom ?? ""} ${prenom ?? ""}`
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-zA-Z0-9 _-]/g, "")
		.replace(/\s+/g, " ")
		.trim();
}

export default function ChevauxCarouselList({ chevaux = chevauxData }: Props) {
	const [current, setCurrent] = useState(0);
	const max = chevaux.length - 1;
	const dragging = useRef(false);

	// Handler typé (plus de "any")
	const handleDragEnd = (
		_: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo
	) => {
		const threshold = 60; // px
		if (info.offset.y < -threshold && current < max) {
			setCurrent((i) => i + 1);
		} else if (info.offset.y > threshold && current > 0) {
			setCurrent((i) => i - 1);
		}
	};

	// Cards visibles (celle du centre + celle du dessus/dessous si dispo)
	const getDisplayChevaux = () => {
		const arr = [];
		if (current > 0) arr.push({ ...chevaux[current - 1], pos: -1 });
		arr.push({ ...chevaux[current], pos: 0 });
		if (current < max)
			arr.push({ ...chevaux[current + 1], pos: 1 });
		return arr;
	};

	return (
		<div className="relative w-full h-[70vh] flex flex-col items-start justify-start select-none pt-[3vh]">
			<AnimatePresence initial={false}>
				{getDisplayChevaux().map((c) => (
					<motion.div
						key={c.course_cheval_id}
						initial={{
							scale:
								c.pos === 0
									? 1
									: 0.95,
							y:
								c.pos === -1
									? -60
									: c.pos ===
									  1
									? 60
									: 0,
							opacity:
								c.pos === 0
									? 1
									: 0.65,
							zIndex:
								c.pos === 0
									? 20
									: 10,
						}}
						animate={{
							scale:
								c.pos === 0
									? 1
									: 0.95,
							y:
								c.pos === -1
									? -40
									: c.pos ===
									  1
									? 385
									: 0,
							opacity:
								c.pos === 0
									? 1
									: 0.5,
							zIndex:
								c.pos === 0
									? 20
									: 10,
						}}
						exit={{
							opacity: 0,
							scale: 0.8,
							y: 0,
						}}
						transition={{
							type: "spring",
							stiffness: 500,
							damping: 50,
						}}
						className={`absolute left-1/2 -translate-x-1/2 w-[90vw]`}
						style={{
							pointerEvents:
								c.pos === 0
									? "auto"
									: "none",
							boxShadow:
								c.pos === 0
									? "0 4px 32px 0 rgba(0,0,0,0.12)"
									: "0 1px 6px 0 rgba(0,0,0,0.08)",
						}}
						drag={c.pos === 0 ? "y" : false}
						dragConstraints={{
							top: 0,
							bottom: 0,
						}}
						dragElastic={0.6}
						onDragStart={() =>
							(dragging.current =
								true)
						}
						onDragEnd={(event, info) => {
							handleDragEnd(
								event,
								info
							);
							setTimeout(
								() =>
									(dragging.current =
										false),
								180
							);
						}}
					>
						{/* --- CARD UI --- */}
						<div
							className={`rounded-md border bg-white/95 transition-all ${
								c.pos === 0
									? "scale-100 shadow-xl"
									: "scale-95 opacity-80"
							}`}
						>
							{/* HEADER */}
							<div className="w-full flex flex-col items-start px-[4vw] py-[3vw]">
								<div className="text-center text-[4vw] font-bold rounded-tl-sm rounded-br-sm flex items-center justify-center bg-primary text-white w-[20vw] -mt-[3vw] -ml-[4vw] absolute">
									TAPIS{" "}
									{
										c.cheval_tapis
									}
								</div>
								<div className="w-full flex justify-between items-center">
									<Label className="w-full flex items-center justify-end font-bold text-[4vw] sm:text-[3.5vw] text-primary">
										Corde{" "}
										{
											c.cheval_corde
										}
									</Label>
								</div>
								<div className="w-full flex items-center">
									<div className="w-[20%]">
										<Image
											src={`/images/casaques/${sanitizeFileName(
												c.proprietaire_nom,
												c.proprietaire_prenom
											)}.svg`}
											alt={`Casaque de ${c.proprietaire_nom} ${c.proprietaire_prenom}`}
											width={
												40
											}
											height={
												50
											}
											className="inline-block mr-1 align-middle"
										/>
									</div>
									<div className="w-full flex flex-col">
										<Label className="text-[5vw] sm:text-[4.5vw] font-bold text-primary">
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
															20
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
										</div>
									</div>
								</div>
								<div className="w-full flex flex-col mt-1 text-gray-800">
									<Label className="text-[4vw] sm:text-[3.5vw] font-semibold ">
										Jockey :
									</Label>
									<div className="w-full flex items-center justify-between">
										<Label className="text-[4vw] sm:text-[3.5vw] text-gray-800">
											{c.jockey_pays && (
												<FlagIcon
													iso={
														c.jockey_pays
													}
													api="circle"
													size={
														14
													}
												/>
											)}
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
							{/* INFOS ADDITIONNELLES */}
							<div className="w-full flex flex-col items-start gap-1  px-[4vw] pt-[3vw] border-t">
								<div className="flex flex-col gap-0.5 text-gray-800 text-[3.5vw] sm:text-[3vw]">
									<div className="flex items-center gap-1">
										<span className="font-semibold">
											Père :
										</span>{" "}
										{
											c.cheval_pere
										}
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
									<div className="flex items-center gap-1">
										<span className="font-semibold">
											Mère :
										</span>{" "}
										{
											c.cheval_mere
										}
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
							</div>
							<div className="w-full flex items-start justify-between px-[4vw] pt-[3vw] border-t mt-2 gap-3">
								<div className="w-full grid grid-cols-2 gap-1 text-[3.5vw] sm:text-[3vw] text-gray-800">
									<div>
										<p className="font-semibold">
											Naisseur :
										</p>
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
										<p className="font-semibold">
											Entraîneur :
										</p>
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
									<div className="col-span-2">
										<p className="font-semibold">
											Propriétaires :
										</p>
										<p>
											{
												c.proprietaires
											}
										</p>
									</div>
								</div>
							</div>
							<div className="w-full flex flex-col items-start gap-1  px-[4vw] pt-[3vw] border-t mt-2 pb-[3vw]">
								<div className=" text-[3.5vw] sm:text-[3vw] text-gray-800">
									<p className="font-semibold">
										Derniers
										résultats
										:
									</p>
									<p>
										{
											c.proprietaires
										}
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}
