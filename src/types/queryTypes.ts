export type JourneeCourseRow = {
	journee_id: number;
	societe_id: number | null;
	societe_abrege: string | null;
	societe_nom: string | null;
	journee_date: string;
	journee_statut: string;
	hippodrome_nom: string | null;
	hippodrome_commune: string | null;
	hippodrome_sens: string | null;
	hippodrome_longueur: number | null;
};

export type SocieteDetailsRow = {
	societe_id: number;
	societe_nom: string;
	societe_abrege: string;
	id_membre_fonction: number | null;
	membre_civilite: string | null;
	membre_nom: string | null;
	membre_prenom: string | null;
	membre_fonction: string | null;
};

export type JourneeEquipeTechniqueRow = {
	journee_id: number;
	id_et_membre_fonction: number | null;
	et_membre_civilite: string | null;
	et_membre_nom: string | null;
	et_membre_prenom: string | null;
	et_membre_fonction: string | null;
};

export type CourseWithDetailsRow = {
	course_id: number;
	journee_id: number | null;
	type_course: string;
	type_unite_depart: string | null;
	course_ordre: number | null;
	course_type: string | null;
	course_numero: number | null;
	course_code: string | null;
	course_nom: string | null;
	course_heure: string;
	course_distance: number | null;
	course_donnateur: string | null;
	course_prix: number | null;
	course_condition1: string | null;
	course_condition2: string | null;
	course_pmu: number | null;
	societe_abrege: string | null;
	societe_nom: string | null;
	hippodrome_nom: string | null;
	hippodrome_commune: string | null;
	hippodrome_sens: string | null;
	hippodrome_longueur: number | null;
};

export type CourseChevalDetailsRow = {
	course_cheval_id: number;
	course_id: number;
	cheval_tapis: number | null;
	cheval_nom: string | null;
	cheval_pays: string | null;
	cheval_sexe_nom: string | null;
	cheval_sexe_abrege: string | null;
	cheval_age: number | null;
	cheval_robe: string | null;
	cheval_pere: string | null;
	cheval_pere_pays: string | null;
	cheval_mere: string | null;
	cheval_mere_pays: string | null;
	cheval_corde: number | null;
	jockey_id: number | null;
	cheval_poids: number | null;
	cheval_poids_comp: number | null;
	cheval_oeillere: number | null;
	cheval_att_langue: number | null;
	cheval_ferrage: number | null;
	cheval_resultat: number | null;
	cheval_gains: number | null;
	cheval_temps: string | null;
	cheval_ecart: string | null;
	proprietaire_civilite: string | null;
	proprietaire_nom: string | null;
	proprietaire_prenom: string | null;
	proprietaires: string | null;
	entraineur_civilite: string | null;
	entraineur_nom: string | null;
	entraineur_prenom: string | null;
	naisseur_civilite: string | null;
	naisseur_nom: string | null;
	naisseur_prenom: string | null;
	jockey_civilite: string | null;
	jockey_nom: string | null;
	jockey_prenom: string | null;
	jockey_pays: string | null;
};
