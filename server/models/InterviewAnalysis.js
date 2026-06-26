const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    skills: [String],

    projects: [String],

    technologies: [String],

    hrQuestions: [String],

    technicalQuestions: [String],

    projectQuestions: [String]

}, { timestamps: true });

module.exports = mongoose.model("InterviewAnalysis", analysisSchema);