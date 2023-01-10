import Sequelize from 'sequelize';

const sequelize = new Sequelize(
	'BAR',
	'bar',
	'!!Aa119562',
	{
		host: '146.56.38.5',
		dialect: 'mysql',
		operatorsAliases: false,
		pool: {
			max: 5,
			min: 1,
			acquire: 10000,
			idle: 10000,
		},
	},
);

export default sequelize;
