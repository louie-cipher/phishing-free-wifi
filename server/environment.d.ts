declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'dev' | 'prod' | 'debug';
			PORT: string;
			HOST: string;
			FRONTEND_HOST: string;
			FRONTEND_PORT: string;
			SESSION_SECRET: string;
			ADMIN_USERNAME: string;
			ADMIN_PASSWORD: string;
		}
	}
}

export {};
