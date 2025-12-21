export enum PlayId {
  DI_NV_HUA = 'di_nv_hua',
  ZI_CHAI_JI = 'zi_chai_ji',
  HONG_MEI_JI = 'hong_mei_ji',
}

export interface CharacterNode {
  id: string;
  name: string;
  nameEn: string;
  roleType: string;
  group: number;
}

export interface CharacterLink {
  source: string;
  target: string;
  relation: string;
  value: number;
}

export interface LyricSegment {
  original: string;
  vernacular: string;
  english: string;
  speaker: string;
}

export interface TimelineEvent {
  year?: string;
  sceneTitle: string;
  description: string;
}

export interface EasterEgg {
  triggerIcon: string;
  title: string;
  content: string;
  hint: string;
}

export interface Review {
  id: string;
  user: string;
  content: string;
  date: string;
  rating: number;
}

export interface PlayData {
  id: PlayId;
  title: string;
  titleEn: string;
  themeColor: string;
  coverImage: string;
  intro: {
    zh: string;
    en: string;
  };
  characters: {
    nodes: CharacterNode[];
    links: CharacterLink[];
  };
  lyrics: LyricSegment[];
  timeline: TimelineEvent[];
  easterEgg: EasterEgg;
  reviews: Review[];
}

export enum MapLayerType {
  DRAMATIC = 'DRAMATIC',
  REAL = 'REAL',
}

export interface MapMarker {
  id: string;
  type: MapLayerType;
  name: string;
  nameEn: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  category: string;
  categoryEn: string;
  description: string;
  plays?: PlayId[];
  lyrics?: string;
  culturalInsight: string;
  subMarkers?: MapMarker[]; // For city-level detail maps
  role?: string; // For sub-markers (e.g. "City Role", "Theatre Role")
  functions?: string; // For sub-markers
  significance?: string; // For sub-markers
  period?: string; // Historical time period
}

export interface AIResponseState {
  loading: boolean;
  content: string | null;
  error: string | null;
}