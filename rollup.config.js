import { fileURLToPath } from 'node:url';

export default {
	//...,
	external: [
		'@apollo/client',
		fileURLToPath(
			new URL(
				import.meta.url
			)
		),
		/node_modules/
	]
};