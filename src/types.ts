export type Action = {
  id: string;
  type: 'CMD_RUN' | 'FILE_WRITE' | 'FILE_READ' | 'BROWSE';
  payload: any;
  timestamp: string;
};

export type Observation = {
  id: string;
  actionId: string;
  type: 'CMD_OUTPUT' | 'FILE_CONTENT' | 'BROWSER_SNAPSHOT' | 'ERROR';
  content: string;
  error?: string;
  timestamp: string;
};

export type AgentState = 'IDLE' | 'RUNNING' | 'PAUSED' | 'AWAITING_USER' | 'FINISHED' | 'ERROR';

export interface EventStream {
  publishAction(action: Omit<Action, 'id' | 'timestamp'>): Promise<string>;
  publishObservation(observation: Omit<Observation, 'id' | 'timestamp'>): Promise<string>;
  getHistory(): Promise<(Action | Observation)[]>;
  subscribe(callback: (event: Action | Observation) => void): () => void;
}

export type ArtifactAction = {
  type: 'file' | 'shell';
  filePath?: string;
  content: string;
};

export type Artifact = {
  id: string;
  title: string;
  actions: ArtifactAction[];
};
