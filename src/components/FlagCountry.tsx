import Image from "next/image";

type FlagApi = "flagcdn" | "circle" | "flagpack";

interface FlagIconProps {
	iso?: string;
	api?: FlagApi;
	size?: number;
}

export function FlagIcon({ iso, api = "flagcdn", size = 24 }: FlagIconProps) {
	const code =
		!iso || iso.toUpperCase() === "NC" ? "fr" : iso.toLowerCase();

	let src = "";
	if (api === "flagcdn") {
		src = `https://flagcdn.com/${size}x${Math.round(
			(size * 3) / 4
		)}/${code}.png`;
	} else if (api === "circle") {
		src = `https://hatscripts.github.io/circle-flags/flags/${code}.svg`;
	} else if (api === "flagpack") {
		src = `https://unpkg.com/flagpack@latest/dist/flags/${code}.svg`;
	}

	return (
		<Image
			src={src}
			alt={iso === "NC" ? "France" : iso || ""}
			width={size}
			height={
				api === "circle"
					? size
					: Math.round((size * 3) / 4)
			}
			className={`inline-block object-contain border border-gray-200 ${
				api === "circle" ? "rounded-full" : "rounded-sm"
			}`}
		/>
	);
}
