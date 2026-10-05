export type TutorMode = 'phenomenon-to-concept' | 'concept-to-phenomenon';

export interface StepDefinition {
  stepNumber: number;
  id: string;
  title: string;
  shortDesc: string;
  instructionPrompt: string;
  badgeText: string;
  roleHint: string;
}

export interface MistakeRecord {
  id: string;
  timestamp: string;
  conceptOrPhenomenon: string;
  naiveBelief: string;
  psychologicalReason: string;
  counterexample: string;
  cognitiveTrapName: string;
  correction: string;
  heuristicRule: string;
  domain: string;
  stepContext: number;
}

export interface CrossDomainConnection {
  domain: string;
  analogy: string;
  underlyingMechanism: string;
  wikilink: string;
}

export interface SessionData {
  id: string;
  mode: TutorMode;
  title: string;
  domain: string;
  currentStep: number;
  createdAt: string;
  updatedAt: string;
  // Mode 1: Phenomenon -> Concept
  phenomenon?: string;
  userExplanation?: string;
  patterns?: string;
  mechanism?: string;
  officialConcept?: string;
  feynmanExplanation?: string;
  stressTestAnswer?: string;
  repairedModel?: string;
  // Mode 2: Concept -> Phenomenon
  concept?: string;
  examplesExplored?: string[];
  delayedTransferAnswer?: string;
  // Shared
  mistakes: MistakeRecord[];
  crossDomainConnections: CrossDomainConnection[];
  messages: Array<{
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: string;
    stepContext: number;
  }>;
  obsidianMarkdown?: string;
}

export interface ModelComparisonCriteria {
  id: string;
  name: string;
  description: string;
  weight: number;
}

export interface AIModelProfile {
  id: 'gemini' | 'notebooklm' | 'chatgpt' | 'claude';
  name: string;
  company: string;
  coreStrengths: string[];
  weaknesses: string[];
  scores: Record<string, number>; // criterionId -> score (1-10)
  socraticFidelityVerdict: string;
  mistakeTrackingCapability: string;
  obsidianIntegrationScore: string;
  verdictForThisMethod: string;
  idealRoleInPipeline: string;
  recommendedWorkflow: string;
}
