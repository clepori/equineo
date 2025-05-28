import { API_URL } from "./urlApi";
import { TABLES_FIXES, TABLES_DYNAMIQUES } from "./syncTables";
import type { SQLiteDBConnection } from "@capacitor-community/sqlite";
import type {
	Civilites,
	Fonctions,
	Pays,
	Oeilleres,
	AttachesLangue,
	Ferrages,
	SexesChevaux,
	TypesCourses,
	Societes,
	SocietesMembres,
	Hippodromes,
	Proprietaires,
	Entraineurs,
	Naisseurs,
	Jockeys,
	Chevaux,
	JourneesCourses,
	Courses,
	CoursesChevaux,
	EtFonctions,
	EtMembres,
	JourneesEtMembres,
} from "@/types/allStructureTypes";

// --- UTILITAIRE GÉNÉRIQUE ---
async function insertRows<T>(
	db: SQLiteDBConnection,
	sql: string,
	data: T[],
	paramBuilder: (row: T) => (string | number | null)[]
): Promise<void> {
	for (const row of data) {
		await db.run(sql, paramBuilder(row));
	}
}

// === TABLES FIXES ===
export async function insertCivilites(
	db: SQLiteDBConnection,
	data: Civilites[]
): Promise<void> {
	const sql = `INSERT OR REPLACE INTO civilites (id, nom, abrege, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?);`;
	return insertRows(db, sql, data, (row) => [
		row.id,
		row.nom,
		row.abrege,
		row.createdAt,
		row.updatedAt,
	]);
}
export async function insertFonctions(
	db: SQLiteDBConnection,
	data: Fonctions[]
): Promise<void> {
	const sql = `INSERT OR REPLACE INTO fonctions (id, nom, createdAt, updatedAt) VALUES (?, ?, ?, ?);`;
	return insertRows(db, sql, data, (row) => [
		row.id,
		row.nom,
		row.createdAt,
		row.updatedAt,
	]);
}
export async function insertPays(
	db: SQLiteDBConnection,
	data: Pays[]
): Promise<void> {
	const sql = `INSERT OR REPLACE INTO pays (id, nom, code_pays, code_iso, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?);`;
	return insertRows(db, sql, data, (row) => [
		row.id,
		row.nom,
		row.code_pays,
		row.code_iso,
		row.createdAt,
		row.updatedAt,
	]);
}
export async function insertOeilleres(
	db: SQLiteDBConnection,
	data: Oeilleres[]
): Promise<void> {
	const sql = `INSERT OR REPLACE INTO oeilleres (id, nom, icone, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?);`;
	return insertRows(db, sql, data, (row) => [
		row.id,
		row.nom,
		row.icone ?? null,
		row.createdAt,
		row.updatedAt,
	]);
}
export async function insertAttachesLangue(
	db: SQLiteDBConnection,
	data: AttachesLangue[]
): Promise<void> {
	const sql = `INSERT OR REPLACE INTO attaches_langue (id, nom, icone, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?);`;
	return insertRows(db, sql, data, (row) => [
		row.id,
		row.nom,
		row.icone ?? null,
		row.createdAt,
		row.updatedAt,
	]);
}
export async function insertFerrages(
	db: SQLiteDBConnection,
	data: Ferrages[]
): Promise<void> {
	const sql = `INSERT OR REPLACE INTO ferrages (id, nom, icone, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?);`;
	return insertRows(db, sql, data, (row) => [
		row.id,
		row.nom,
		row.icone ?? null,
		row.createdAt,
		row.updatedAt,
	]);
}
export async function insertSexesChevaux(
	db: SQLiteDBConnection,
	data: SexesChevaux[]
): Promise<void> {
	const sql = `INSERT OR REPLACE INTO sexes_chevaux (id, nom, abrege, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?);`;
	return insertRows(db, sql, data, (row) => [
		row.id,
		row.nom,
		row.abrege,
		row.createdAt,
		row.updatedAt,
	]);
}
export async function insertTypesCourses(
	db: SQLiteDBConnection,
	data: TypesCourses[]
): Promise<void> {
	const sql = `INSERT OR REPLACE INTO types_courses (id, type, unite_depart, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?);`;
	return insertRows(db, sql, data, (row) => [
		row.id,
		row.type,
		row.unite_depart ?? null,
		row.createdAt,
		row.updatedAt,
	]);
}

// === TABLES DYNAMIQUES ===
export async function insertSocietes(
	db: SQLiteDBConnection,
	data: Societes[]
): Promise<void> {
	const sql = `INSERT OR REPLACE INTO societes (id, nom, abrege, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?);`;
	return insertRows(db, sql, data, (row) => [
		row.id,
		row.nom,
		row.abrege,
		row.createdAt,
		row.updatedAt,
	]);
}
export async function insertSocietesMembres(
	db: SQLiteDBConnection,
	data: SocietesMembres[]
): Promise<void> {
	const sql = `INSERT OR REPLACE INTO societes_membres (id, id_civilite, nom, prenom, id_fonction, id_societe, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
	return insertRows(db, sql, data, (row) => [
		row.id,
		row.id_civilite,
		row.nom,
		row.prenom,
		row.id_fonction,
		row.id_societe,
		row.createdAt,
		row.updatedAt,
	]);
}
export async function insertHippodromes(
	db: SQLiteDBConnection,
	data: Hippodromes[]
): Promise<void> {
	const sql = `INSERT OR REPLACE INTO hippodromes (id, nom, commune, sens, longueur, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?);`;
	return insertRows(db, sql, data, (row) => [
		row.id,
		row.nom,
		row.commune,
		row.sens,
		row.longueur,
		row.createdAt,
		row.updatedAt,
	]);
}
export async function insertEtFonctions(
	db: SQLiteDBConnection,
	data: EtFonctions[]
): Promise<void> {
	const sql = `INSERT OR REPLACE INTO et_fonctions (id, nom, createdAt, updatedAt) VALUES (?, ?, ?, ?);`;
	return insertRows(db, sql, data, (row) => [
		row.id,
		row.nom,
		row.createdAt,
		row.updatedAt,
	]);
}
export async function insertEtMembres(
	db: SQLiteDBConnection,
	data: EtMembres[]
): Promise<void> {
	const sql = `INSERT OR REPLACE INTO et_membres (id, id_civilite, nom, prenom, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?);`;
	return insertRows(db, sql, data, (row) => [
		row.id,
		row.id_civilite,
		row.nom,
		row.prenom,
		row.createdAt,
		row.updatedAt,
	]);
}
export async function insertProprietaires(
	db: SQLiteDBConnection,
	data: Proprietaires[]
): Promise<void> {
	const sql = `INSERT OR REPLACE INTO proprietaires (id, id_civilite, nom, prenom, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?);`;
	return insertRows(db, sql, data, (row) => [
		row.id,
		row.id_civilite,
		row.nom,
		row.prenom ?? null,
		row.createdAt,
		row.updatedAt,
	]);
}
export async function insertEntraineurs(
	db: SQLiteDBConnection,
	data: Entraineurs[]
): Promise<void> {
	const sql = `INSERT OR REPLACE INTO entraineurs (id, id_civilite, nom, prenom, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?);`;
	return insertRows(db, sql, data, (row) => [
		row.id,
		row.id_civilite,
		row.nom,
		row.prenom ?? null,
		row.createdAt,
		row.updatedAt,
	]);
}
export async function insertNaisseurs(
	db: SQLiteDBConnection,
	data: Naisseurs[]
): Promise<void> {
	const sql = `INSERT OR REPLACE INTO naisseurs (id, id_civilite, nom, prenom, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?);`;
	return insertRows(db, sql, data, (row) => [
		row.id,
		row.id_civilite,
		row.nom,
		row.prenom ?? null,
		row.createdAt,
		row.updatedAt,
	]);
}
export async function insertJockeys(
	db: SQLiteDBConnection,
	data: Jockeys[]
): Promise<void> {
	const sql = `INSERT OR REPLACE INTO jockeys (id, id_civilite, nom, prenom, id_pays, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?);`;
	return insertRows(db, sql, data, (row) => [
		row.id,
		row.id_civilite,
		row.nom,
		row.prenom ?? null,
		row.id_pays ?? null,
		row.createdAt,
		row.updatedAt,
	]);
}
export async function insertChevaux(
	db: SQLiteDBConnection,
	data: Chevaux[]
): Promise<void> {
	const sql = `INSERT OR REPLACE INTO chevaux (id, nom, age, robe, id_sexe, id_pays, pere, mere, id_pays_pere, id_pays_mere, id_proprietaire, proprietaires_legaux, id_entraineur, id_naisseur, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
	return insertRows(db, sql, data, (row) => [
		row.id,
		row.nom,
		row.age,
		row.robe,
		row.id_sexe,
		row.id_pays ?? null,
		row.pere ?? null,
		row.mere ?? null,
		row.id_pays_pere ?? null,
		row.id_pays_mere ?? null,
		row.id_proprietaire,
		row.proprietaires_legaux ?? null,
		row.id_entraineur ?? null,
		row.id_naisseur ?? null,
		row.createdAt,
		row.updatedAt,
	]);
}
export async function insertJourneesCourses(
	db: SQLiteDBConnection,
	data: JourneesCourses[]
): Promise<void> {
	const sql = `INSERT OR REPLACE INTO journees_courses (id, id_societe, id_hippodrome, date, statut, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?);`;
	return insertRows(db, sql, data, (row) => [
		row.id,
		row.id_societe,
		row.id_hippodrome,
		row.date,
		row.statut,
		row.createdAt,
		row.updatedAt,
	]);
}
export async function insertJourneesEtMembres(
	db: SQLiteDBConnection,
	data: JourneesEtMembres[]
): Promise<void> {
	const sql = `INSERT OR REPLACE INTO journees_et_membres (id, id_journee_course, id_fonction, id_et_membre, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?);`;
	return insertRows(db, sql, data, (row) => [
		row.id,
		row.id_journee_course,
		row.id_fonction,
		row.id_et_membre,
		row.createdAt,
		row.updatedAt,
	]);
}
export async function insertCourses(
	db: SQLiteDBConnection,
	data: Courses[]
): Promise<void> {
	const sql = `INSERT OR REPLACE INTO courses (id, id_journee_course, id_type_course, ordre, type, num, code, nom, heure, distance, donnateur, prix, condition_1, condition_2, pmu, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
	return insertRows(db, sql, data, (row) => [
		row.id,
		row.id_journee_course,
		row.id_type_course,
		row.ordre,
		row.type,
		row.num ?? null,
		row.code ?? null,
		row.nom,
		row.heure ?? null,
		row.distance ?? null,
		row.donnateur ?? null,
		row.prix ?? null,
		row.condition_1 ?? null,
		row.condition_2 ?? null,
		row.pmu ? 1 : 0,
		row.createdAt,
		row.updatedAt,
	]);
}
export async function insertCoursesChevaux(
	db: SQLiteDBConnection,
	data: CoursesChevaux[]
): Promise<void> {
	const sql = `INSERT OR REPLACE INTO courses_chevaux (id, id_course, tapis, id_cheval, corde, id_jockey, poids, poids_comp, id_oeillere, id_attache_langue, id_ferrage, resultat, gains, temps, ecart, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
	return insertRows(db, sql, data, (row) => [
		row.id,
		row.id_course,
		row.tapis,
		row.id_cheval,
		row.corde ?? null,
		row.id_jockey,
		row.poids,
		row.poids_comp ?? null,
		row.id_oeillere ?? null,
		row.id_attache_langue ?? null,
		row.id_ferrage ?? null,
		row.resultat ?? null,
		row.gains ?? null,
		row.temps ?? null,
		row.ecart ?? null,
		row.createdAt,
		row.updatedAt,
	]);
}

// -- GESTION SYNCHRO ---
export async function getLastSyncDate(
	db: SQLiteDBConnection,
	table: string
): Promise<string | null> {
	const res = await db.query(
		`SELECT date_synchronisation FROM equineo_update WHERE table_name = ?`,
		[table]
	);
	return res.values?.[0]?.date_synchronisation ?? null;
}

export async function setLastSyncDate(
	db: SQLiteDBConnection,
	table: string,
	date: string
): Promise<void> {
	const exist = await db.query(
		`SELECT id FROM equineo_update WHERE table_name = ?`,
		[table]
	);
	if (exist.values && exist.values.length > 0) {
		await db.run(
			`UPDATE equineo_update SET date_synchronisation = ?, nb_ouverture = nb_ouverture + 1 WHERE table_name = ?`,
			[date, table]
		);
	} else {
		await db.run(
			`INSERT INTO equineo_update (table_name, nb_ouverture, date_synchronisation) VALUES (?, 1, ?)`,
			[table, date]
		);
	}
}

// Synchro d'une table (offline-friendly)
export async function syncTableData<T>(
	db: SQLiteDBConnection,
	tableKey: string,
	insertFn: (db: SQLiteDBConnection, data: T[]) => Promise<void>
): Promise<void> {
	const lastSync = await getLastSyncDate(db, tableKey);
	let url = `${API_URL}/sync/${tableKey}`;
	if (lastSync) {
		url += `?updatedAfter=${encodeURIComponent(lastSync)}`;
	}

	let data: T[] = [];
	let online = false;
	try {
		const res = await fetch(url);
		if (!res.ok) throw new Error("Erreur de réseau ou backend");
		data = await res.json();
		online = true;
	} catch {
		console.warn(
			`[SYNC][${tableKey}] Offline ou backend indisponible. Pas de synchro, données locales seulement.`
		);
	}

	// N’insère que si online
	if (online && data.length > 0) {
		await insertFn(db, data);
		const newSyncDate =
			(data as { updatedAt?: string }[])[0]?.updatedAt ??
			new Date().toISOString();
		await setLastSyncDate(db, tableKey, newSyncDate);
	}
}

// Synchro complète (offline-first, jamais bloquante)
export async function syncAllTables(
	db: SQLiteDBConnection,
	onProgress?: (percent: number, table: string) => void
): Promise<void> {
	const allTables = [...TABLES_FIXES, ...TABLES_DYNAMIQUES];
	const tableCount = allTables.length;
	for (let i = 0; i < tableCount; i++) {
		const tableKey = allTables[i] as keyof typeof insertFunctions;
		const insertFn = insertFunctions[tableKey] as (
			db: SQLiteDBConnection,
			data: unknown[]
		) => Promise<void>;
		if (typeof insertFn === "function") {
			await syncTableData(db, tableKey, insertFn);
		} else {
			console.warn(
				`Pas de fonction d'insertion pour la table : ${tableKey}`
			);
		}
		if (onProgress) {
			onProgress(
				Math.round(((i + 1) / tableCount) * 100),
				tableKey
			);
		}
	}
}

export async function syncDynamicTablesOnly(
	db: SQLiteDBConnection,
	onProgress?: (percent: number, table: string) => void
): Promise<void> {
	const tableCount = TABLES_DYNAMIQUES.length;
	for (let i = 0; i < tableCount; i++) {
		const tableKey = TABLES_DYNAMIQUES[
			i
		] as keyof typeof insertFunctions;
		const insertFn = insertFunctions[tableKey] as (
			db: SQLiteDBConnection,
			data: unknown[]
		) => Promise<void>;
		if (typeof insertFn === "function") {
			await syncTableData(db, tableKey, insertFn);
		} else {
			console.warn(
				`Pas de fonction d'insertion pour la table : ${tableKey}`
			);
		}
		if (onProgress) {
			onProgress(
				Math.round(((i + 1) / tableCount) * 100),
				tableKey
			);
		}
	}
}

// Map table → fonction d’insertion, typé proprement
const insertFunctions = {
	civilites: insertCivilites,
	fonctions: insertFonctions,
	pays: insertPays,
	oeilleres: insertOeilleres,
	attaches_langue: insertAttachesLangue,
	ferrages: insertFerrages,
	sexes_chevaux: insertSexesChevaux,
	types_courses: insertTypesCourses,
	societes: insertSocietes,
	societes_membres: insertSocietesMembres,
	hippodromes: insertHippodromes,
	et_fonctions: insertEtFonctions,
	et_membres: insertEtMembres,
	proprietaires: insertProprietaires,
	entraineurs: insertEntraineurs,
	naisseurs: insertNaisseurs,
	jockeys: insertJockeys,
	chevaux: insertChevaux,
	journees_courses: insertJourneesCourses,
	journees_et_membres: insertJourneesEtMembres,
	courses: insertCourses,
	courses_chevaux: insertCoursesChevaux,
} as const;
