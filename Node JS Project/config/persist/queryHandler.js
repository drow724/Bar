import sequelize from './mysql/database.js';
import { QueryTypes } from 'sequelize';
import errors from '../models/core/errors.js';

async function executeQuery({ sql, type, option = {} }) {
	if (typeof option !== 'object') {
		throw new errors.TypeError();
	}

	try {
		const options = Object.assign(option, { type });

		return await sequelize.query(sql, options);
	} catch (e) {
		throw new errors.DbError(e.message);
	}
}

async function createQuery(sql, option) {
	return await executeQuery({ sql, option, type: QueryTypes.INSERT });
}

async function updateQuery(sql, option) {
	return await executeQuery({ sql, option, type: QueryTypes.UPDATE });
}

async function upsertQuery(sql, option) {
	return await executeQuery({ sql, option, type: QueryTypes.UPSERT });
}

async function deleteQuery(sql, option) {
	return await executeQuery({ sql, option, type: QueryTypes.DELETE });
}

async function selectQuery(sql, option) {
	return await executeQuery({ sql, option, type: QueryTypes.SELECT });
}

export {
	createQuery,
	updateQuery,
	upsertQuery,
	deleteQuery,
	selectQuery,
};
