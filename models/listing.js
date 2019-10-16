module.exports = function(sequelize, DataTypes) {
    var Job = sequelize.define("Job", {
        jobNo: {type: DataTypes.INTEGER},
        customer: {type: DataTypes.STRING},
        createdDate: {type: DataTypes.DATEONLY},
        createdBy: {type: DataTypes.STRING},
        csr: {type: DataTypes.STRING},
        sheets: {type: DataTypes.INTEGER},
        rollSize: {type: DataTypes.DECIMAL(10,4)},
        chopSize: {type: DataTypes.DECIMAL(10,4)},
        optimumRoll: {type: DataTypes.DECIMAL(10,4)},
        flute: {type: DataTypes.STRING},
        topSheet: {type: DataTypes.STRING},
        medium: {type: DataTypes.STRING},
        liner: {type: DataTypes.STRING},
        mill: {type: DataTypes.STRING},
        lays: {type: DataTypes.INTEGER},
        newJob: {type: DataTypes.STRING},
        coating: {type: DataTypes.STRING},
        doneCutting: {type: DataTypes.STRING},
        oktoClose: {type: DataTypes.STRING},
        closedby: {type: DataTypes.STRING},
        closedDate: {type: DataTypes.DATEONLY},
        analyzedBy: {type: DataTypes.STRING},
        comments: {type: DataTypes.STRING},
        needsAnalysis: {type: DataTypes.STRING}
    })

    return Job;
}