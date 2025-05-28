"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Label } from "@/ui/label";
import { JourneeCourseRow } from "@/types/queryTypes";
import Image from "next/image";

interface JourneeCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
	journees: JourneeCourseRow[];
	showArrows?: boolean;
}

function getStatutBadgeClass(statut: string) {
	switch (statut) {
		case "Programmée":
			return "bg-gray-400 text-gray-900";
		case "Terminée":
			return "bg-red-500 text-white";
		case "Décalée":
			return "bg-gray-50 text-red-500 border-t border-l border-red-500";
		case "En cours":
			return "bg-gray-100 text-primary";
		case "Validée":
			return "bg-primary text-white";
		default:
			return "bg-primary text-white";
	}
}

const JourneeCarousel = React.forwardRef<HTMLDivElement, JourneeCarouselProps>(
	({ className, journees, showArrows = true, ...props }, ref) => {
		const router = useRouter();
		const initialIndex = React.useMemo(() => {
			const enCours = journees.findIndex(
				(j) => j.journee_statut === "En cours"
			);
			if (enCours !== -1) return enCours;
			const validee = journees.findIndex(
				(j) => j.journee_statut === "Validée"
			);
			if (validee !== -1) return validee;
			return 0;
		}, [journees]);

		const [currentIndex, setCurrentIndex] =
			React.useState(initialIndex);
		const [exitX, setExitX] = React.useState<number>(0);

		React.useEffect(() => {
			setCurrentIndex(initialIndex);
		}, [initialIndex]);

		const handleDragEnd = (
			event: MouseEvent | TouchEvent | PointerEvent,
			info: PanInfo
		) => {
			if (info.offset.x > 100 && currentIndex > 0) {
				setExitX(info.offset.x);
				setTimeout(() => {
					setCurrentIndex((prev) =>
						Math.max(prev - 1, 0)
					);
					setExitX(0);
				}, 200);
			} else if (
				info.offset.x < -100 &&
				currentIndex < journees.length - 1
			) {
				setExitX(info.offset.x);
				setTimeout(() => {
					setCurrentIndex((prev) =>
						Math.min(
							prev + 1,
							journees.length - 1
						)
					);
					setExitX(0);
				}, 200);
			}
		};

		function formatDateLong(iso: string) {
			const date = new Date(iso);
			return date.toLocaleDateString("fr-FR", {
				weekday: "long",
				day: "2-digit",
				month: "long",
				year: "numeric",
			});
		}

		return (
			<div
				ref={ref}
				className={cn(
					"h-[48vh] sm:h-[60vh] w-full flex items-start justify-center",
					className
				)}
				{...props}
			>
				<div className="relative w-[75vw] h-[45vh] sm:h-[55vh]">
					{journees.map((journee, index) => {
						const isCurrentCard =
							index === currentIndex;
						const isPrevCard =
							index ===
							currentIndex - 1;
						const isNextCard =
							index ===
							currentIndex + 1;
						const isProgrammée =
							journee.journee_statut ===
							"Programmée";

						if (
							!isCurrentCard &&
							!isPrevCard &&
							!isNextCard
						)
							return null;

						let customY = 24,
							customX = 0,
							customScale = 0.92,
							customOpacity = 0.72,
							customRotate = 0;

						if (isPrevCard) {
							customX = -60;
							customY = 25;
							customScale = 0.93;
							customOpacity = 0.3;
							customRotate = -8;
						}
						if (isNextCard) {
							customX = 70;
							customY = 40;
							customScale = 0.93;
							customOpacity = 0.5;
							customRotate = 8;
						}
						if (isCurrentCard) {
							customX = exitX;
							customY = 0;
							customScale = 1;
							customOpacity =
								isProgrammée
									? 0.6
									: 1;
							customRotate =
								exitX / 20;
						}

						return (
							<motion.div
								key={
									journee.journee_id
								}
								className={cn(
									"absolute w-full h-full rounded-xl cursor-grab active:cursor-grabbing",
									"bg-white shadow-xl flex flex-col pt-12 transition-all",
									isCurrentCard &&
										(isProgrammée
											? "cursor-not-allowed select-none"
											: "cursor-pointer")
								)}
								style={{
									zIndex: isCurrentCard
										? 3
										: isPrevCard
										? 2
										: 1,
									opacity: customOpacity, // Opacité appliquée ici !
								}}
								drag={
									isCurrentCard
										? "x"
										: false
								}
								dragConstraints={{
									left: 0,
									right: 0,
								}}
								dragElastic={
									0.7
								}
								onDragEnd={
									isCurrentCard
										? handleDragEnd
										: undefined
								}
								initial={{
									scale: customScale,
									opacity: customOpacity,
									x: customX,
									y: customY,
									rotate: customRotate,
								}}
								animate={{
									scale: customScale,
									opacity: customOpacity,
									x: customX,
									y: customY,
									rotate: customRotate,
								}}
								transition={{
									type: "spring",
									stiffness: 500,
									damping: 50,
								}}
								onClick={
									isCurrentCard &&
									!isProgrammée
										? () =>
												router.push(
													`/courses?id_journee_course=${journee.journee_id}`
												)
										: undefined
								}
								tabIndex={
									isCurrentCard &&
									!isProgrammée
										? 0
										: -1
								}
								role={
									isCurrentCard &&
									!isProgrammée
										? "button"
										: undefined
								}
								aria-label={
									isCurrentCard &&
									!isProgrammée
										? `Accéder à la journée ${journee.journee_id}`
										: undefined
								}
							>
								{/* Logo société en overlap */}
								<div className="absolute left-1/2 -translate-x-1/2 -top-10 z-20">
									<Image
										src={
											journee.societe_abrege
												? `/images/societes/${journee.societe_abrege}.svg`
												: "/images/societes/default.svg"
										}
										alt={
											journee.societe_nom ||
											""
										}
										width={
											96
										}
										height={
											96
										}
										className="w-24 h-24 object-contain"
										onError={(
											e
										) => {
											const target =
												e.target as HTMLImageElement;
											target.src =
												"/images/societes/default.svg";
										}}
									/>
								</div>

								{/* Flèches */}
								{showArrows &&
									isCurrentCard && (
										<div className="absolute inset-x-0 top-2 flex justify-between p-4">
											<Button
												variant="secondary"
												size="icon_rounded_small"
												className={cn(
													"text-2xl select-none cursor-pointer text-gray-300 hover:text-gray-400 dark:text-muted-foreground dark:hover:text-primary",
													currentIndex ===
														0 &&
														"opacity-40 pointer-events-none"
												)}
												onClick={(
													e
												) => {
													e.stopPropagation();
													if (
														currentIndex >
														0
													)
														setCurrentIndex(
															currentIndex -
																1
														);
												}}
											>
												<ArrowLeft
													size={
														18
													}
												/>
											</Button>
											<Button
												variant="secondary"
												size="icon_rounded_small"
												className={cn(
													"text-2xl select-none cursor-pointer text-gray-300 hover:text-gray-400 dark:text-muted-foreground dark:hover:text-primary",
													currentIndex ===
														journees.length -
															1 &&
														"opacity-40 pointer-events-none"
												)}
												onClick={(
													e
												) => {
													e.stopPropagation();
													if (
														currentIndex <
														journees.length -
															1
													)
														setCurrentIndex(
															currentIndex +
																1
														);
												}}
											>
												<ArrowRight
													size={
														18
													}
												/>
											</Button>
										</div>
									)}

								<div className="flex-1 px-[6vw] py-[6vw] flex flex-col items-center justify-between gap-3">
									<Label className="text-[5vw] font-semibold text-gray-800 text-center px-[2vw]">
										{
											journee.societe_nom
										}
									</Label>
									<p className="text-center text-[5.5vw] text-primary font-bold">
										{formatDateLong(
											journee.journee_date
										)}
									</p>
									<div className="text-[4vw] mt-2 text-gray-800 dark:text-gray-300 text-center flex flex-col gap-3">
										<div>
											<p className="font-bold">
												Hippodrome
											</p>
											<p>
												{
													journee.hippodrome_nom
												}
											</p>
											<p className="text-[3.5vw]">
												{
													journee.hippodrome_commune
												}
											</p>
										</div>
										<div>
											<p className="font-bold">
												Longueur
											</p>
											{
												journee.hippodrome_longueur
											}{" "}
											mètres
											<p className="text-[3.5vw]">
												Corde
												à{" "}
												{
													journee.hippodrome_sens
												}
											</p>
										</div>
									</div>
									<div
										className={cn(
											"font-bold text-center rounded-full py-2 w-[60%]",
											getStatutBadgeClass(
												journee.journee_statut
											)
										)}
									>
										{
											journee.journee_statut
										}
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		);
	}
);
JourneeCarousel.displayName = "JourneeCarousel";

export { JourneeCarousel };
