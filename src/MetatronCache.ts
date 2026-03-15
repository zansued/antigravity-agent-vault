import * as fs from 'fs';
import * as path from 'path';
import { createHash } from 'crypto';
import { Logger } from './utils/logger';

export class MetatronCache {
  private cachePath: string;
  private cache: Record<string, any> = {};
  private saveTimeout: NodeJS.Timeout | null = null;

  constructor(basePath: string) {
    this.cachePath = path.join(basePath, 'metatron-cache.json');
    this.loadCache();
  }

  private loadCache() {
    if (fs.existsSync(this.cachePath)) {
      try {
        this.cache = JSON.parse(fs.readFileSync(this.cachePath, 'utf-8'));
      } catch (e) {
        Logger.warn('Falha ao ler cache. Inicializando vazio.');
        this.cache = {};
      }
    }
  }

  private saveCache() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    
    this.saveTimeout = setTimeout(() => {
      try {
        fs.writeFile(this.cachePath, JSON.stringify(this.cache, null, 2), (err) => {
           if (err) Logger.error('Erro ao salvar cache no disco:', err);
        });
      } catch (e) {
        Logger.error('Erro de serialização no cache:', e);
      }
    }, 1000); 
  }

  private getHash(text: string): string {
    return createHash('md5').update(text).digest('hex');
  }

  public get(text: string): any | null {
    const hash = this.getHash(text);
    return this.cache[hash] || null;
  }

  public set(text: string, result: any) {
    const hash = this.getHash(text);
    this.cache[hash] = result;
    this.saveCache();
  }

  public clear() {
    this.cache = {};
    if (this.saveTimeout) clearTimeout(this.saveTimeout);
    fs.writeFileSync(this.cachePath, JSON.stringify(this.cache, null, 2));
  }
}
