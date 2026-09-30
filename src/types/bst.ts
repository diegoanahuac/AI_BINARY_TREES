export interface BSTNode {
  id: string;
  word: string;
  count: number;
  rawWords: string[];
  left: BSTNode | null;
  right: BSTNode | null;
  level: number;
  isLeaf: boolean;
  isInternal: boolean;
  isRoot: boolean;
  // Visual layout coordinates for SVG rendering
  x?: number;
  y?: number;
}

export interface TreeMetrics {
  totalWords: number;
  uniqueNodes: number;
  duplicateCount: number;
  leafNodes: number;
  internalNodes: number;
  height: number;
  maxDepth: number;
  isDegenerate: boolean;
  balanceScore: number;
}

export interface Traversals {
  inorder: { word: string; count: number }[];
  preorder: { word: string; count: number }[];
  postorder: { word: string; count: number }[];
  levelOrder: { level: number; nodes: { word: string; count: number }[] }[];
}

export interface TestCase {
  id: number;
  title: string;
  input: string;
  aspect: string;
  category: 'standard' | 'edge_case_ai';
  description: string;
  expectedTokens: string[];
  expectedInorder?: string[];
  verificationNote: string;
  pertinenceAnalysis?: {
    isPertinent: boolean;
    pertinenceLevel: 'Muy Alta' | 'Alta' | 'Media' | 'Baja';
    reason: string;
    riskMitigated: string;
  };
}

export interface InteractionRecord {
  id: number;
  topic: string;
  prompt: string;
  aiResponse: string;
  used: 'Sí' | 'No' | 'Parcial';
  modifications: string;
  justification: string;
}

export interface SanitizationOptions {
  toLowerCase: boolean;
  removePunctuation: boolean;
  normalizeAccentsForComparison: boolean; // if true, 'árbol' and 'arbol' count as same or compared cleanly
  spanishLocaleSort: boolean;
}
