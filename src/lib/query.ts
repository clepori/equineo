import {
	CourseChevalDetailsRow,
	CourseWithDetailsRow,
	JourneeCourseRow,
	JourneeEquipeTechniqueRow,
	SocieteDetailsRow,
} from "@/types/queryTypes";
import { getOrCreateDbConnection } from "./sqlite";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";

// -----------------------------------------------------------------------------
// Tables génériques & utilitaires
// -----------------------------------------------------------------------------

export async function getAllTableNames(): Promise<string[]> {
	const db = await getOrCreateDbConnection();
	const res = await db.query(
		`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'`
	);
	return (res.values ?? []).map((row: { name: string }) => row.name);
}

export async function getEquineoUpdate() {
	const db = await getOrCreateDbConnection();
	const res = await db.query("SELECT * FROM equineo_update ORDER BY id");
	return res.values || [];
}

export async function getAllRowsFromTable(
	tableName: string
): Promise<Record<string, unknown>[]> {
	const db = await getOrCreateDbConnection();
	const res = await db.query(`SELECT * FROM ${tableName}`);
	return res.values || [];
}

// -----------------------------------------------------------------------------
// JOURNEES COURSES
// -----------------------------------------------------------------------------

export async function getAllJourneesCourses(
	db: SQLiteDBConnection
): Promise<JourneeCourseRow[]> {
	const sql = `
	  SELECT
	    jc.id AS journee_id,
	    s.id AS societe_id,
	    s.abrege AS societe_abrege,
	    s.nom AS societe_nom,
	    jc.date AS journee_date,
	    jc.statut AS journee_statut,
	    h.nom AS hippodrome_nom,
	    h.commune AS hippodrome_commune,
	    h.sens AS hippodrome_sens,
	    h.longueur AS hippodrome_longueur
	  FROM journees_courses jc
	  LEFT JOIN societes s ON jc.id_societe = s.id
	  LEFT JOIN hippodromes h ON jc.id_hippodrome = h.id
	  ORDER BY jc.date ASC
	`;

	const res = await db.query(sql);
	return res.values as JourneeCourseRow[];
}

export async function getJourneeCourseById(
	db: SQLiteDBConnection,
	journeeId: number
): Promise<JourneeCourseRow | null> {
	const sql = `
	  SELECT
	    jc.id AS journee_id,
	    s.id AS societe_id,
	    s.abrege AS societe_abrege,
	    s.nom AS societe_nom,
	    jc.date AS journee_date,
	    jc.statut AS journee_statut,
	    h.nom AS hippodrome_nom,
	    h.commune AS hippodrome_commune,
	    h.sens AS hippodrome_sens,
	    h.longueur AS hippodrome_longueur
	  FROM journees_courses jc
	  LEFT JOIN societes s ON jc.id_societe = s.id
	  LEFT JOIN hippodromes h ON jc.id_hippodrome = h.id
	  WHERE jc.id = ?
	  LIMIT 1
	`;
	const res = await db.query(sql, [journeeId]);
	const row = (res.values ?? [])[0] as JourneeCourseRow | undefined;
	return row || null;
}

// -----------------------------------------------------------------------------
// SOCIETES (détail avec membres et fonctions)
// -----------------------------------------------------------------------------

export async function getSocieteDetails(
	db: SQLiteDBConnection,
	societeId?: number
): Promise<SocieteDetailsRow[]> {
	const sql = `
		SELECT 
			s.id AS societe_id,
			s.nom AS societe_nom,
			s.abrege AS societe_abrege,
			f.id AS id_membre_fonction,
			c.abrege AS membre_civilite,
			sm.nom AS membre_nom,
			sm.prenom AS membre_prenom,
			f.nom AS membre_fonction
		FROM societes s
		LEFT JOIN societes_membres sm ON sm.id_societe = s.id
		LEFT JOIN civilites c ON sm.id_civilite = c.id
		LEFT JOIN fonctions f ON sm.id_fonction = f.id
		${societeId ? "WHERE s.id = ?" : ""}
		ORDER BY f.id, sm.nom
	`;
	const params = societeId ? [societeId] : [];
	const res = await db.query(sql, params);
	return (res.values ?? []) as SocieteDetailsRow[];
}

// -----------------------------------------------------------------------------
// EQUIPE TECHNIQUE
// -----------------------------------------------------------------------------

export async function getEquipeTechniqueByJournee(
	db: SQLiteDBConnection,
	journeeId?: number
): Promise<JourneeEquipeTechniqueRow[]> {
	const sql = `
		SELECT
			jem.id_journee_course AS journee_id,
			jem.id_fonction AS id_et_membre_fonction,
			c.abrege AS et_membre_civilite,
			m.nom AS et_membre_nom,
			m.prenom AS et_membre_prenom,
			f.nom AS et_membre_fonction
		FROM journees_et_membres jem
		LEFT JOIN et_membres m ON jem.id_et_membre = m.id
		LEFT JOIN civilites c ON m.id_civilite = c.id
		LEFT JOIN et_fonctions f ON jem.id_fonction = f.id
		${journeeId ? "WHERE jem.id_journee_course = ?" : ""}
		ORDER BY jem.id_fonction, m.nom
	`;
	const params = journeeId ? [journeeId] : [];
	const res = await db.query(sql, params);
	return (res.values ?? []) as JourneeEquipeTechniqueRow[];
}

// -----------------------------------------------------------------------------
// COURSES
// -----------------------------------------------------------------------------

export async function getCoursesWithDetails(
	db: SQLiteDBConnection,
	idJourneeCourse?: number
): Promise<CourseWithDetailsRow[]> {
	const sql = `
		SELECT
			c.id AS course_id,
			c.id_journee_course AS journee_id,
			tc.type AS type_course,
			tc.unite_depart AS type_unite_depart,
			c.ordre AS course_ordre,
			c.type AS course_type,
			c.num AS course_numero,
			c.code AS course_code,
			c.nom AS course_nom,
			c.heure AS course_heure,
			c.distance AS course_distance,
			c.donnateur AS course_donnateur,
			c.prix AS course_prix,
			c.condition_1 AS course_condition1,
			c.condition_2 AS course_condition2,
			c.pmu AS course_pmu,
			s.abrege AS societe_abrege,
			s.nom AS societe_nom,
			h.nom AS hippodrome_nom,
			h.commune AS hippodrome_commune,
			h.sens AS hippodrome_sens,
			h.longueur AS hippodrome_longueur
		FROM courses c
		LEFT JOIN types_courses tc ON c.id_type_course = tc.id
		LEFT JOIN journees_courses jc ON c.id_journee_course = jc.id
		LEFT JOIN societes s ON jc.id_societe = s.id
		LEFT JOIN hippodromes h ON jc.id_hippodrome = h.id
		${idJourneeCourse ? "WHERE c.id_journee_course = ?" : ""}
		ORDER BY c.ordre
	`;
	const params = idJourneeCourse ? [idJourneeCourse] : [];
	const res = await db.query(sql, params);
	return (res.values ?? []) as CourseWithDetailsRow[];
}

export async function getCourseById(
	db: SQLiteDBConnection,
	courseId: number
): Promise<CourseWithDetailsRow | null> {
	const sql = `
		SELECT
			c.id AS course_id,
			c.id_journee_course AS journee_id,
			tc.type AS type_course,
			tc.unite_depart AS type_unite_depart,
			c.ordre AS course_ordre,
			c.type AS course_type,
			c.num AS course_numero,
			c.code AS course_code,
			c.nom AS course_nom,
			c.heure AS course_heure,
			c.distance AS course_distance,
			c.donnateur AS course_donnateur,
			c.prix AS course_prix,
			c.condition_1 AS course_condition1,
			c.condition_2 AS course_condition2,
			c.pmu AS course_pmu,
			s.abrege AS societe_abrege,
			s.nom AS societe_nom,
			h.nom AS hippodrome_nom,
			h.commune AS hippodrome_commune,
			h.sens AS hippodrome_sens,
			h.longueur AS hippodrome_longueur
		FROM courses c
		LEFT JOIN types_courses tc ON c.id_type_course = tc.id
		LEFT JOIN journees_courses jc ON c.id_journee_course = jc.id
		LEFT JOIN societes s ON jc.id_societe = s.id
		LEFT JOIN hippodromes h ON jc.id_hippodrome = h.id
		WHERE c.id = ?
		LIMIT 1
	`;
	const res = await db.query(sql, [courseId]);
	const row = (res.values ?? [])[0] as CourseWithDetailsRow | undefined;
	return row || null;
}

// -----------------------------------------------------------------------------
// COURSES CHEVAUX
// -----------------------------------------------------------------------------

export async function getCoursesChevauxByCourseId(
	db: SQLiteDBConnection,
	courseId: number
): Promise<CourseChevalDetailsRow[]> {
	const sql = `
		SELECT
			cc.id AS course_cheval_id,
			cc.id_course AS course_id,
			cc.tapis AS cheval_tapis,
			ch.nom AS cheval_nom,
			p_cheval.code_iso AS cheval_pays,
			sx.nom AS cheval_sexe_nom,
			sx.abrege AS cheval_sexe_abrege,
			ch.age AS cheval_age,
			ch.robe AS cheval_robe,
			ch.pere AS cheval_pere,
			p_pere.code_iso AS cheval_pere_pays,
			ch.mere AS cheval_mere,
			p_mere.code_iso AS cheval_mere_pays,
			cc.corde AS cheval_corde,
			cc.id_jockey AS jockey_id,
			cc.poids AS cheval_poids,
			cc.poids_comp AS cheval_poids_comp,
			cc.id_oeillere AS cheval_oeillere,
			cc.id_attache_langue AS cheval_att_langue,
			cc.id_ferrage AS cheval_ferrage,
			cc.resultat AS cheval_resultat,
			cc.gains AS cheval_gains,
			cc.temps AS cheval_temps,
			cc.ecart AS cheval_ecart,
			c_pro.abrege AS proprietaire_civilite,
			p.nom AS proprietaire_nom,
			p.prenom AS proprietaire_prenom,
			ch.proprietaires_legaux AS proprietaires,
			c_ent.abrege AS entraineur_civilite,
			e.nom AS entraineur_nom,
			e.prenom AS entraineur_prenom,
			c_nai.abrege AS naisseur_civilite,
			n.nom AS naisseur_nom,
			n.prenom AS naisseur_prenom,
			c_joc.abrege AS jockey_civilite,
			j.nom AS jockey_nom,
			j.prenom AS jockey_prenom,
			p_joc.code_iso AS jockey_pays
		FROM courses_chevaux cc
		LEFT JOIN chevaux ch ON cc.id_cheval = ch.id
		LEFT JOIN sexes_chevaux sx ON ch.id_sexe = sx.id
		LEFT JOIN pays p_cheval ON ch.id_pays = p_cheval.id
		LEFT JOIN pays p_pere ON ch.id_pays_pere = p_pere.id
		LEFT JOIN pays p_mere ON ch.id_pays_mere = p_mere.id
		LEFT JOIN proprietaires p ON ch.id_proprietaire = p.id
		LEFT JOIN civilites c_pro ON p.id_civilite = c_pro.id
		LEFT JOIN entraineurs e ON ch.id_entraineur = e.id
		LEFT JOIN civilites c_ent ON e.id_civilite = c_ent.id
		LEFT JOIN naisseurs n ON ch.id_naisseur = n.id
		LEFT JOIN civilites c_nai ON n.id_civilite = c_nai.id
		LEFT JOIN jockeys j ON cc.id_jockey = j.id
		LEFT JOIN civilites c_joc ON j.id_civilite = c_joc.id
		LEFT JOIN pays p_joc ON j.id_pays = p_joc.id
		WHERE cc.id_course = ?
		ORDER BY cc.tapis ASC
	`;

	const res = await db.query(sql, [courseId]);
	return (res.values ?? []) as CourseChevalDetailsRow[];
}
