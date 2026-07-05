const mongoose = require("mongoose");

const interviewSessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    questions: [
        {
            question_type: {
                type: String,
                required: true
            },

            question: {
                type: String,
                required: true
            },

            answer: {
                type: String,
                default: ""
            },

            feedback: {
                type: String,
                default: ""
            },
            idealAnswer:{
                type: String,
                default: ""
            },
            score: {
                type: Number,
                default: 0
            },
        }
    ],

    totalQuestions: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: ["ongoing", "completed"],
        default: "ongoing"
    },

    overallReport: {
        communication: {
            type: Number,
            default: 0
        },
        technical: {
            type: Number,
            default: 0
        },
        confidence: {
            type: Number,
            default: 0
        },
        strengths: {
            type: [String],
            default: []
        },
        improvements: {
            type: [String],
            default: []
        },
        summary: {
            type: String,
            default: ""
        }
    },
    
}, {
    timestamps: true
});

// timestamps: true option tells Mongoose to automatically add two fields to every document:
// {
//     createdAt: Date,
//     updatedAt: Date
// }
module.exports = mongoose.model("InterviewSession", interviewSessionSchema);