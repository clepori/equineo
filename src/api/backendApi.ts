// src/api/BackendApi.ts
import { API_URL } from "@/lib/urlApi";
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

// Helper générique pour fetch
async function fetchApi<T>(endpoint: string): Promise<T[]> {
	const res = await fetch(`${API_URL}/sync/${endpoint}`);
	if (!res.ok) throw new Error(`API error: ${endpoint}`);
	return res.json();
}

// Tables fixes
export const getAllCivilites = () => fetchApi<Civilites>("civilites");
export const getAllFonctions = () => fetchApi<Fonctions>("fonctions");
export const getAllPays = () => fetchApi<Pays>("pays");
export const getAllOeilleres = () => fetchApi<Oeilleres>("oeilleres");
export const getAllAttachesLangue = () =>
	fetchApi<AttachesLangue>("attaches_langue");
export const getAllFerrages = () => fetchApi<Ferrages>("ferrages");
export const getAllSexesChevaux = () => fetchApi<SexesChevaux>("sexes_chevaux");
export const getAllTypesCourses = () => fetchApi<TypesCourses>("types_courses");

// Tables dynamiques
export const getAllSocietes = () => fetchApi<Societes>("societes");
export const getAllSocietesMembres = () =>
	fetchApi<SocietesMembres>("societes_membres");
export const getAllHippodromes = () => fetchApi<Hippodromes>("hippodromes");
export const getAllEtFonctions = () => fetchApi<EtFonctions>("et_fonctions");
export const getAllEtMembres = () => fetchApi<EtMembres>("et_membres");
export const getAllProprietaires = () =>
	fetchApi<Proprietaires>("proprietaires");
export const getAllEntraineurs = () => fetchApi<Entraineurs>("entraineurs");
export const getAllNaisseurs = () => fetchApi<Naisseurs>("naisseurs");
export const getAllJockeys = () => fetchApi<Jockeys>("jockeys");
export const getAllChevaux = () => fetchApi<Chevaux>("chevaux");
export const getAllJourneesCourses = () =>
	fetchApi<JourneesCourses>("journees_courses");
export const getAllJourneesEtMembres = () =>
	fetchApi<JourneesEtMembres>("journees_et_membres");
export const getAllCourses = () => fetchApi<Courses>("courses");
export const getAllCoursesChevaux = () =>
	fetchApi<CoursesChevaux>("courses_chevaux");
