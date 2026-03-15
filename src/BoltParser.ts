import { Artifact, ArtifactAction } from './types';

export class BoltParser {
  /** Extrai artefatos e ações de <boltArtifact id="..." title="...">...</boltArtifact> */
  public static parse(content: string): Artifact[] {
    const artifacts: Artifact[] = [];
    const artifactRegex = /<boltArtifact\s+id="([^"]+)"\s+title="([^"]+)">([\s\S]*?)<\/boltArtifact>/g;
    
    let artifactMatch;
    while ((artifactMatch = artifactRegex.exec(content)) !== null) {
      const [_, id, title, innerContent] = artifactMatch;
      artifacts.push({ id, title, actions: this.parseActions(innerContent) });
    }
    return artifacts;
  }

  /** Extrai ações <boltAction type="file|shell" filePath="...">...</boltAction> */
  private static parseActions(innerContent: string): ArtifactAction[] {
    const actions: ArtifactAction[] = [];
    const actionRegex = /<boltAction\s+type="([^"]+)"(?:\s+filePath="([^"]+)")?>([\s\S]*?)<\/boltAction>/g;

    let actionMatch;
    while ((actionMatch = actionRegex.exec(innerContent)) !== null) {
      const [_, type, filePath, content] = actionMatch;
      actions.push({
        type: type as 'file' | 'shell',
        filePath: filePath || undefined,
        content: content.trim()
      });
    }
    return actions;
  }
}
