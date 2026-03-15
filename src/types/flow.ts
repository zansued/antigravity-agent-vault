export interface Tool {
  name: string;
  description: string;
  // O tipo de execução pode variar, aqui simplificado para uma função genérica.
  // Poderíamos ter tipos mais específicos para cada ferramenta (LLM, Shell, etc.)
  execute: (params: Record<string, any>) => Promise<any>;
  type: 'llm' | 'shell' | 'file' | 'supabase' | 'custom';
}

export interface Step {
  toolName: string;
  parameters: Record<string, any>;
  nextStep?: string; // Define qual step executar em seguida
  condition?: (result: any) => boolean; // Para lógica condicional
}

export interface Flow {
  name: string;
  description: string;
  steps: Record<string, Step>; // Mapeia um nome de step para a sua definição
  startStep: string; // Nome do step inicial do flow
}
