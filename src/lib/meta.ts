import type { SQLiteDBConnection } from "@capacitor-community/sqlite";

/**
 * Exécute une requête SQL sur la base SQLite (Promise style)
 */
export function executeSqlPromise(
	db: SQLiteDBConnection,
	sql: string,
	params: (string | number | null)[] = []
): Promise<{ values?: Record<string, unknown>[] }> {
	return db.query(sql, params);
}

/**
 * Récupère la dernière date de synchronisation pour une table.
 */
export async function getLastSyncDate(
	db: SQLiteDBConnection,
	table: string
): Promise<string | undefined> {
	const res = await executeSqlPromise(
		db,
		"SELECT lastSyncDate FROM meta WHERE tableName = ?",
		[table]
	);
	const row = res.values && res.values[0];
	// TS typé mais flexible pour tous backends SQLite compatibles Capacitor
	return row?.lastSyncDate as string | undefined;
}

/**
 * Met à jour la dernière date de synchronisation pour une table.
 */
export async function setLastSyncDate(
	db: SQLiteDBConnection,
	table: string,
	lastSyncDate: string
): Promise<void> {
	await executeSqlPromise(db, "DELETE FROM meta WHERE tableName = ?", [
		table,
	]);
	await executeSqlPromise(
		db,
		"INSERT INTO meta (tableName, lastSyncDate) VALUES (?, ?)",
		[table, lastSyncDate]
	);
}

/**
 * Crée la table meta si elle n'existe pas.
 */
export async function createMetaTableIfNotExists(
	db: SQLiteDBConnection
): Promise<void> {
	await executeSqlPromise(
		db,
		`
		CREATE TABLE IF NOT EXISTS meta (
			tableName TEXT PRIMARY KEY,
			lastSyncDate TEXT
		)
		`
	);
}
