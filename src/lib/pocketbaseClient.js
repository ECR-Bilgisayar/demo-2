import PocketBase from 'pocketbase';

const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL;
const pb = pocketbaseUrl ? new PocketBase(pocketbaseUrl) : null;
export const isPocketbaseEnabled = Boolean(pb);
export default pb;
