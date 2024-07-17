module.exports = (sequelize, DataTypes) => {
    ServiceRequest = sequelize.define("service_request", {
        description: { type: DataTypes.STRING, allowNull: true },
        callRegisterDate: { type: DataTypes.DATE, allowNull: false },
        attendedOn: { type: DataTypes.DATE, allowNull: false },
        type: { type: DataTypes.STRING, allowNull: true },
        completedOn: { type: DataTypes.DATE, allowNull: false },
        document1: { type: DataTypes.STRING, allowNull: false },
        document2: { type: DataTypes.STRING, allowNull: false },
        document3: { type: DataTypes.STRING, allowNull: false },
    }
    );
    return ServiceRequest;
}