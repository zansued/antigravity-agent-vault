const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
  white: "\x1b[37m"
};

export const Logger = {
  info: (msg: string, ...args: any[]) => {
    console.log(`${colors.bold}${colors.cyan}✨ [Metatron]${colors.reset} ${colors.white}${msg}${colors.reset}`, ...args);
  },
  success: (msg: string, ...args: any[]) => {
    console.log(`${colors.bold}${colors.magenta}🔮 [Metatron]${colors.reset} ${colors.green}${msg}${colors.reset}`, ...args);
  },
  warn: (msg: string, ...args: any[]) => {
    console.log(`${colors.bold}${colors.yellow}⚠️ [Metatron]${colors.reset} ${colors.yellow}${msg}${colors.reset}`, ...args);
  },
  error: (msg: string, ...args: any[]) => {
    console.log(`${colors.bold}${colors.red}❌ [Metatron]${colors.reset} ${colors.red}${msg}${colors.reset}`, ...args);
  },
  dim: (msg: string, ...args: any[]) => {
    console.log(`${colors.dim}${colors.cyan}   ↳ ${msg}${colors.reset}`, ...args);
  },
  divider: () => {
    console.log(`\n${colors.dim}${colors.magenta}⚚ ───────────────────────────────────────────────────────────── ⚚${colors.reset}\n`);
  }
};
