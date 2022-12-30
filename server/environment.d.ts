declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'dev' | 'prod' | 'debug';
			PORT: string;
			HOST: string;
			SESSION_SECRET: string;
		}
	}
}

export {};
