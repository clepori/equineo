import {
	CapacitorSQLite,
	SQLiteConnection,
	SQLiteDBConnection,
} from "@capacitor-community/sqlite";

// Singleton pour la connexion
let sqlite: SQLiteConnection | null = null;
let db: SQLiteDBConnection | null = null;

export const DB_NAME = "equineo.db";

// Tables à créer (fixes + dynamiques)
export const TABLES_SQL: string[] = [
	// Tables fixes
	`CREATE TABLE IF NOT EXISTS civilites (id INTEGER PRIMARY KEY, nom TEXT NOT NULL, abrege TEXT NOT NULL, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS fonctions (id INTEGER PRIMARY KEY, nom TEXT NOT NULL, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS pays (id INTEGER PRIMARY KEY, nom TEXT NOT NULL, code_pays TEXT NOT NULL, code_iso TEXT NOT NULL, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS oeilleres (id INTEGER PRIMARY KEY, nom TEXT NOT NULL, icone TEXT, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS attaches_langue (id INTEGER PRIMARY KEY, nom TEXT NOT NULL, icone TEXT, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS ferrages (id INTEGER PRIMARY KEY, nom TEXT NOT NULL, icone TEXT, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS sexes_chevaux (id INTEGER PRIMARY KEY, nom TEXT NOT NULL, abrege TEXT NOT NULL, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS types_courses (id INTEGER PRIMARY KEY, type TEXT NOT NULL, unite_depart TEXT, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)`,

	// Tables dynamiques
	`CREATE TABLE IF NOT EXISTS societes (id INTEGER PRIMARY KEY, nom TEXT NOT NULL, abrege TEXT NOT NULL, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS societes_membres (id INTEGER PRIMARY KEY, id_civilite INTEGER NOT NULL, nom TEXT NOT NULL, prenom TEXT NOT NULL, id_fonction INTEGER NOT NULL, id_societe INTEGER NOT NULL, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS hippodromes (id INTEGER PRIMARY KEY, nom TEXT NOT NULL, commune TEXT NOT NULL, sens TEXT NOT NULL, longueur INTEGER NOT NULL, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS et_fonctions (id INTEGER PRIMARY KEY, nom TEXT NOT NULL, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS et_membres (id INTEGER PRIMARY KEY, id_civilite INTEGER NOT NULL, nom TEXT NOT NULL, prenom TEXT NOT NULL, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS proprietaires (id INTEGER PRIMARY KEY, id_civilite INTEGER NOT NULL, nom TEXT NOT NULL, prenom TEXT, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS entraineurs (id INTEGER PRIMARY KEY, id_civilite INTEGER NOT NULL, nom TEXT NOT NULL, prenom TEXT, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS naisseurs (id INTEGER PRIMARY KEY, id_civilite INTEGER NOT NULL, nom TEXT NOT NULL, prenom TEXT, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS jockeys (id INTEGER PRIMARY KEY, id_civilite INTEGER NOT NULL, nom TEXT NOT NULL, prenom TEXT, id_pays INTEGER, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS chevaux (id INTEGER PRIMARY KEY, nom TEXT NOT NULL, age INTEGER NOT NULL, robe TEXT NOT NULL, id_sexe INTEGER NOT NULL, id_pays INTEGER, pere TEXT, mere TEXT, id_pays_pere INTEGER, id_pays_mere INTEGER, id_proprietaire INTEGER NOT NULL, proprietaires_legaux TEXT, id_entraineur INTEGER, id_naisseur INTEGER, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS journees_courses (id INTEGER PRIMARY KEY, id_societe INTEGER NOT NULL, id_hippodrome INTEGER NOT NULL, date TEXT NOT NULL, statut TEXT NOT NULL, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS journees_et_membres (id INTEGER PRIMARY KEY, id_journee_course INTEGER NOT NULL, id_fonction INTEGER NOT NULL, id_et_membre INTEGER NOT NULL, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS courses (id INTEGER PRIMARY KEY, id_journee_course INTEGER NOT NULL, id_type_course INTEGER NOT NULL, ordre INTEGER NOT NULL, type TEXT NOT NULL, num INTEGER, code TEXT, nom TEXT NOT NULL, heure TEXT NOT NULL, distance INTEGER, donnateur TEXT, prix INTEGER, condition_1 TEXT, condition_2 TEXT, pmu INTEGER NOT NULL, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)`,
	`CREATE TABLE IF NOT EXISTS courses_chevaux (id INTEGER PRIMARY KEY, id_course INTEGER NOT NULL, tapis INTEGER NOT NULL, id_cheval INTEGER NOT NULL, corde INTEGER, id_jockey INTEGER NOT NULL, poids INTEGER NOT NULL, poids_comp INTEGER, id_oeillere INTEGER, id_attache_langue INTEGER, id_ferrage INTEGER, resultat INTEGER, gains TEXT, temps TEXT, ecart TEXT, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)`,
];

// Table de suivi de synchro
export const TABLE_UPDATE_SQL = `
  CREATE TABLE IF NOT EXISTS equineo_update (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_name TEXT NOT NULL,
    nb_ouverture INTEGER DEFAULT 0,
    date_synchronisation TEXT
  )
`;

// Connexion à la base (unique, offline friendly)
export async function getOrCreateDbConnection(): Promise<SQLiteDBConnection> {
	if (db) return db;
	if (!sqlite) sqlite = new SQLiteConnection(CapacitorSQLite);
	db = await sqlite.createConnection(
		DB_NAME,
		false,
		"no-encryption",
		1,
		false
	);
	await db.open();
	return db;
}

// Crée toutes les tables si besoin, sans jamais bloquer en offline
export async function createTablesIfNeeded(): Promise<void> {
	const db = await getOrCreateDbConnection();
	try {
		await db.execute(TABLE_UPDATE_SQL); // Suivi en premier
		for (const sql of TABLES_SQL) {
			try {
				await db.execute(sql);
			} catch (err) {
				console.warn(
					"Table déjà existante ou erreur SQL bénigne :",
					err
				);
			}
		}
		console.info(
			"Toutes les tables SQLite sont prêtes (offline OK)."
		);
	} catch (err) {
		console.error(
			"Erreur critique lors de la création des tables SQLite : ",
			err
		);
		// Ici tu pourrais afficher un toast Sonner, ou simplement logger
	}
}

// Ferme la connexion SQLite proprement
export async function closeDbConnection(): Promise<void> {
	if (db) {
		await db.close();
		db = null;
	}
}

// Supprime la BDD locale (reset complet)
export async function deleteDb(): Promise<void> {
	if (db) {
		await db.close();
		db = null;
	}
	await CapacitorSQLite.deleteDatabase({
		database: DB_NAME,
	});
}
