declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'dev' | 'prod' | 'debug';
			PORT: string;
			HOST: string;
			VITE_HOST: string;
			VITE_PORT: string;
			SESSION_SECRET: string;
			ADMIN_USERNAME: string;
			ADMIN_PASSWORD: string;
		}
	}
}

export {};
