// module.exports = {
//     up: (queryInterface, Sequelize) => {
//         return Promise.all([
//             queryInterface.addColumn('doctor_infor', 'specialtyId', {
//                 type: Sequelize.INTERGER,

//             }),
//             queryInterface.addColumn('doctor_infor', 'clinicId', {
//                 type: Sequelize.INTERGER,

//             }),
//         ])
//     },
//     down: (queryInterface, Sequelize) => {
//         return Promise.all([
//             queryInterface.addColumn('doctor_infor', 'specialtyId'),
//             queryInterface.addColumn('doctor_infor', 'clinicId'),
//         ])
//     },

//     // down: (queryInterface, Sequelize) => {
//     //     return Promise.all([
//     //         queryInterface.changeColumn('doctor_infor', 'image', {
//     //             type: Sequelize.STRING,
//     //             allowNull: true,
//     //         })
//     //     ])
//     // }
// };

// If you want to add multiple columns to the same table, wrap everything in a Promise.all() and put the columns you'd like to add within an array:

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
                'doctor_infor',
                'specialtyId',
                {
                    type: Sequelize.INTEGER
                }
            ),
            queryInterface.addColumn(
                'doctor_infor',
                'clinicId',
                {
                    type: Sequelize.INTEGER
                }
            ),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('tableName', 'columnName1'),
            queryInterface.removeColumn('tableName', 'columnName2')
        ]);
    }
};