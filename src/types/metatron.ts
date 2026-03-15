export type MetatronNode = { 
  id?: string; 
  name: string; 
  type: string; 
  metadata?: any 
};

export type MetatronLink = { 
  sourceName: string; 
  targetName: string; 
  relationType: string 
};

export type WeaveResult = { 
  nodes: MetatronNode[]; 
  links: MetatronLink[] 
};
