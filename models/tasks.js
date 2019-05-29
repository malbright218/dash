module.exports = function (sequelize, DataTypes) {
    var Tasks = sequelize.define("Tasks", {
        textBody: {
            type: DataTypes.TEXT,
            len: [1]
        },
        taskStatus: {
            type: DataTypes.TEXT
        }
    });

    Tasks.associate = function (models) {
        Tasks.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Tasks;
}