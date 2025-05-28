export type Civilites = {
	id: number;
	nom: string;
	abrege: string;
	createdAt: string;
	updatedAt: string;
};

export type Fonctions = {
	id: number;
	nom: string;
	createdAt: string;
	updatedAt: string;
};

export type Pays = {
	id: number;
	nom: string;
	code_pays: string;
	code_iso: string;
	createdAt: string;
	updatedAt: string;
};

export type AttachesLangue = {
	id: number;
	nom: string;
	icone?: string;
	createdAt: string;
	updatedAt: string;
};

export type Oeilleres = {
	id: number;
	nom: string;
	icone?: string;
	createdAt: string;
	updatedAt: string;
};

export type Ferrages = {
	id: number;
	nom: string;
	icone?: string;
	createdAt: string;
	updatedAt: string;
};

export type SexesChevaux = {
	id: number;
	nom: string;
	abrege: string;
	createdAt: string;
	updatedAt: string;
};

export type TypesCourses = {
	id: number;
	type: string;
	unite_depart?: string;
	createdAt: string;
	updatedAt: string;
};

export type Societes = {
	id: number;
	nom: string;
	abrege: string;
	createdAt: string;
	updatedAt: string;
};

export type SocietesMembres = {
	id: number;
	id_civilite: number;
	civilite?: Civilites;
	nom: string;
	prenom: string;
	id_fonction: number;
	fonction?: Fonctions;
	id_societe: number;
	societes?: Societes;
	createdAt: string;
	updatedAt: string;
};

export type Hippodromes = {
	id: number;
	nom: string;
	commune: string;
	sens: string;
	longueur: number;
	createdAt: string;
	updatedAt: string;
};

export type Proprietaires = {
	id: number;
	id_civilite: number;
	civilite?: Civilites;
	nom: string;
	prenom?: string;
	createdAt: string;
	updatedAt: string;
};
export type Entraineurs = Proprietaires;
export type Naisseurs = Proprietaires;

export type Jockeys = {
	id: number;
	id_civilite: number;
	civilite?: Civilites;
	nom: string;
	prenom?: string;
	id_pays?: number;
	pays?: Pays;
	createdAt: string;
	updatedAt: string;
};

export type Chevaux = {
	id: number;
	nom: string;
	age: number;
	robe: string;
	id_sexe: number;
	id_pays?: number;
	pays?: Pays;
	pere?: string;
	mere?: string;
	id_pays_pere?: number;
	pays_pere?: Pays;
	id_pays_mere?: number;
	pays_mere?: Pays;
	id_proprietaire: number;
	proprietaires?: Proprietaires;
	id_entraineur?: number;
	entraineurs?: Entraineurs;
	id_naisseur?: number;
	naisseurs?: Naisseurs;
	proprietaires_legaux?: string;
	createdAt: string;
	updatedAt: string;
};

export type JourneesCourses = {
	id: number;
	id_societe: number;
	societe?: Societes;
	id_hippodrome: number;
	hippodrome?: Hippodromes;
	date: string;
	statut: string;
	createdAt: string;
	updatedAt: string;
};

export type EtFonctions = {
	id: number;
	nom: string;
	createdAt: string;
	updatedAt: string;
};

export type EtMembres = {
	id: number;
	id_civilite: number;
	civilite?: Civilites;
	nom: string;
	prenom: string;
	createdAt: string;
	updatedAt: string;
};

export type JourneesEtMembres = {
	id: number;
	id_journee_course: number;
	journee_course?: JourneesCourses;
	id_fonction: number;
	fonction?: EtFonctions;
	id_et_membre: number;
	et_membre?: EtMembres;
	createdAt: string;
	updatedAt: string;
};

export type Courses = {
	id: number;
	id_journee_course: number;
	journees_courses?: JourneesCourses;
	id_type_course: number;
	types_courses?: Pick<TypesCourses, "id" | "type" | "unite_depart">;
	ordre: number;
	type: "Course" | "Animation";
	num?: number;
	code: string;
	nom: string;
	heure: string;
	distance?: number;
	donnateur?: string;
	prix?: number;
	condition_1?: string;
	condition_2?: string;
	pmu: boolean;
	createdAt: string;
	updatedAt: string;
};

export type CoursesChevaux = {
	id: number;
	id_course: number;
	id_cheval: number;
	tapis: number;
	id_jockey: number;
	poids: number;
	poids_comp?: number;
	corde?: number;
	id_oeillere?: number;
	id_attache_langue?: number;
	id_ferrage?: number;
	resultat: number;
	gains?: number;
	temps?: string;
	ecart?: string;
	course?: Pick<Courses, "id" | "nom">;
	chevaux?: Pick<Chevaux, "id" | "nom">;
	jockeys?: Jockeys;
	oeilleres?: Oeilleres;
	ferrages?: Ferrages;
	attaches_langue?: AttachesLangue;
	createdAt: string;
	updatedAt: string;
};
