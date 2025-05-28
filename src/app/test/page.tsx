"use client";

import * as React from "react";
import { motion, PanInfo } from "framer-motion";

// Données en dur pour test
const data = [
	{ id: 1, titre: "Journée 1", date: "2025-05-31" },
	{ id: 2, titre: "Journée 2", date: "2025-06-14" },
	{ id: 3, titre: "Journée 3", date: "2025-06-28" },
];

export default function DemoCarousel() {
	const [current, setCurrent] = React.useState(0);
	const [exitX, setExitX] = React.useState(0);
	const nb = data.length;

	function handleDragEnd(
		e: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo
	) {
		if (Math.abs(info.offset.x) > 100) {
			setExitX(info.offset.x);
			setTimeout(() => {
				if (info.offset.x < 0)
					setCurrent((prev) => (prev + 1) % nb);
				else setCurrent((prev) => (prev - 1 + nb) % nb);
				setExitX(0);
			}, 200);
		}
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh]">
			<div className="relative w-[90vw] max-w-md h-60">
				{data.map((d, i) => {
					if (i !== current) return null;
					return (
						<motion.div
							key={d.id}
							className="absolute w-full h-full bg-white rounded-xl flex items-center justify-center shadow-lg"
							drag="x"
							dragConstraints={{
								left: 0,
								right: 0,
							}}
							dragElastic={0.7}
							onDragEnd={
								handleDragEnd
							}
							initial={{
								scale: 0.95,
								opacity: 0,
							}}
							animate={{
								scale: 1,
								opacity: 1,
								x: exitX,
							}}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 20,
							}}
						>
							<div className="text-center">
								<div className="text-lg font-bold">
									{
										d.titre
									}
								</div>
								<div className="text-gray-500">
									{d.date}
								</div>
							</div>
						</motion.div>
					);
				})}
			</div>
			<div className="flex gap-2 mt-4">
				{data.map((_, i) => (
					<div
						key={i}
						className={`w-2 h-2 rounded-full ${
							i === current
								? "bg-blue-500"
								: "bg-gray-300"
						}`}
					/>
				))}
			</div>
		</div>
	);
}
