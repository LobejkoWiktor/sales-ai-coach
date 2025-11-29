export type UserRole = "sales-rep" | "manager";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Offer {
  id: string;
  name: string;
  description: string;
  tags: string[];
  isActive: boolean;
  materials: Material[];
  createdAt: string;
  updatedAt: string;
}

export interface Material {
  id: string;
  label: string;
  url: string;
}

export type ClientType =
  | "cfo-decisive"
  | "small-business-owner"
  | "it-director"
  | "corporate-buyer";

export type DifficultyLevel = "easy" | "medium" | "hard";

export type ConversationGoal =
  | "schedule-demo"
  | "close-sale"
  | "qualify-lead";

export interface TrainingPreset {
  id: string;
  name: string;
  description: string;
  offerId: string;
  clientType: ClientType;
  difficulty: DifficultyLevel;
  goal?: ConversationGoal;
  createdAt: string;
  updatedAt: string;
}

export interface TrainingConfig {
  selectedOffers: string[];
  clientType: ClientType;
  difficulty: DifficultyLevel;
  goal?: ConversationGoal;
  isPreset: boolean;
  presetId?: string;
  presetName?: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  tags: string[];
  offerId: string;
  trigger?: string;
}

export interface Message {
  id: string;
  role: "client" | "rep";
  content: string;
  timestamp: string;
}

export interface TrainingSession {
  id: string;
  date: string;
  config: TrainingConfig;
  score: number;
  metrics: {
    productKnowledge: number;
    needsAnalysis: number;
    valueArgumentation: number;
  };
  usedInsights: Insight[];
  messages: Message[];
  feedback: {
    strengths: string[];
    improvements: string[];
  };
}

export interface ChatSessionPayload {
  userId: string;
  title: string;
  difficulty: string;
  isOwnConfiguration: boolean;
  clientDescription: string;
  constraints: string;
  goal: string;
}
