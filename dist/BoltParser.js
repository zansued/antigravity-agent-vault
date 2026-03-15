"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoltParser = void 0;
class BoltParser {
    /** Extrai artefatos e ações de <boltArtifact id="..." title="...">...</boltArtifact> */
    static parse(content) {
        const artifacts = [];
        const artifactRegex = /<boltArtifact\s+id="([^"]+)"\s+title="([^"]+)">([\s\S]*?)<\/boltArtifact>/g;
        let artifactMatch;
        while ((artifactMatch = artifactRegex.exec(content)) !== null) {
            const [_, id, title, innerContent] = artifactMatch;
            artifacts.push({ id, title, actions: this.parseActions(innerContent) });
        }
        return artifacts;
    }
    /** Extrai ações <boltAction type="file|shell" filePath="...">...</boltAction> */
    static parseActions(innerContent) {
        const actions = [];
        const actionRegex = /<boltAction\s+type="([^"]+)"(?:\s+filePath="([^"]+)")?>([\s\S]*?)<\/boltAction>/g;
        let actionMatch;
        while ((actionMatch = actionRegex.exec(innerContent)) !== null) {
            const [_, type, filePath, content] = actionMatch;
            actions.push({
                type: type,
                filePath: filePath || undefined,
                content: content.trim()
            });
        }
        return actions;
    }
}
exports.BoltParser = BoltParser;
