import dotenv from 'dotenv';

dotenv.config();

const {
	MYSQL_URL,
	MYSQL_USERNAME,
	MYSQL_PASSWORD,
	MYSQL_HOST,
	MYSQL_DATABASE,
} = process.env;

export default {
	MYSQL_URL,
	MYSQL_USERNAME,
	MYSQL_PASSWORD,
	MYSQL_HOST,
	MYSQL_DATABASE,
};
