export type Page = 'dashboard' | 'team' | 'matches' | 'stats' | 'training' | 'chat' | 'toko' | 'profil';

export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface Player {
  id: number;
  name: string;
  number: number;
  position: string;
  stats: {
    totalPoints: number;
    aces: number;
    blocks: number;
    errors: number;
    efficiency: number;
  };
}

export interface Team {
  id: number;
  name: string;
  category: string;
  roster: Player[];
}

export enum MatchStatus {
  UPCOMING = 'UPCOMING',
  COMPLETED = 'COMPLETED'
}

export interface Match {
  id: number;
  teamA: string;
  teamB: string;
  date: string;
  time: string;
  location: string;
  status: MatchStatus;
  result?: {
    teamAScore: number;
    teamBScore: number;
  };
}

export enum DrillDifficulty {
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  BEGINNER = 'Beginner'
}

export interface Drill {
  id: number;
  title: string;
  category: 'Attacking' | 'Defense' | 'Serving' | 'Setting';
  description: string;
  difficulty: DrillDifficulty;
  duration: number; // in minutes
  playerCount: string;
}

export interface TrainingSession {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    notes?: string;
}

export interface ChatMessage {
  id: number;
  senderId: number; // 0 for current user
  senderName: string;
  text: string;
  timestamp: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
  rating: number;
}

export interface BeginnerGuide {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  steps: { title: string; detail: string }[];
}