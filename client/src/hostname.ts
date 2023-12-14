const host = (import.meta.env.VITE_HOST || '192.168.4.1') as string;
const port = import.meta.env.VITE_PORT || '80';
export default `${host}:${port}`;
