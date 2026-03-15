"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetatronCache = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const crypto_1 = require("crypto");
const logger_1 = require("./utils/logger");
class MetatronCache {
    cachePath;
    cache = {};
    saveTimeout = null;
    constructor(basePath) {
        this.cachePath = path.join(basePath, 'metatron-cache.json');
        this.loadCache();
    }
    loadCache() {
        if (fs.existsSync(this.cachePath)) {
            try {
                this.cache = JSON.parse(fs.readFileSync(this.cachePath, 'utf-8'));
            }
            catch (e) {
                logger_1.Logger.warn('Falha ao ler cache. Inicializando vazio.');
                this.cache = {};
            }
        }
    }
    saveCache() {
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }
        this.saveTimeout = setTimeout(() => {
            try {
                fs.writeFile(this.cachePath, JSON.stringify(this.cache, null, 2), (err) => {
                    if (err)
                        logger_1.Logger.error('Erro ao salvar cache no disco:', err);
                });
            }
            catch (e) {
                logger_1.Logger.error('Erro de serialização no cache:', e);
            }
        }, 1000);
    }
    getHash(text) {
        return (0, crypto_1.createHash)('md5').update(text).digest('hex');
    }
    get(text) {
        const hash = this.getHash(text);
        return this.cache[hash] || null;
    }
    set(text, result) {
        const hash = this.getHash(text);
        this.cache[hash] = result;
        this.saveCache();
    }
    clear() {
        this.cache = {};
        if (this.saveTimeout)
            clearTimeout(this.saveTimeout);
        fs.writeFileSync(this.cachePath, JSON.stringify(this.cache, null, 2));
    }
}
exports.MetatronCache = MetatronCache;
