import { fileURLToPath } from 'node:url';

export default {
	//...,
	external: [
		'@apollo/client', 'react-router-dom',
		fileURLToPath(
			new URL(
				import.meta.url
			)
		),
		/node_modules/
	]
};