 function message(questions){
    return [
            {
                role: "user",
                content: `
                    You are an experienced software engineering interviewer.

                    The candidate has completed the interview.

                    For each question:
                    - Give feedback.
                    - Give a score from 0-10.

                    Then provide an overall evaluation.

                    IMPORTANT:
                    - Return ONLY a valid JSON object.
                    - Do NOT wrap the JSON in \`\`\`json or \`\`\` code fences.
                    - Do NOT include any explanations, notes, or extra text.
                    - The response must start with '{' and end with '}'.
                    - Every field must always be present.
                    Return ONLY valid JSON.

                    Do not use markdown.
                    The response must be parseable by JSON.parse().

                    The "improvements" field must be a JSON array of strings.

                    Return ONLY valid JSON in this format:

                    {
                        "questions":[
                            {
                                "feedback":"...",
                                "score":8,
                                "idealAnswer": "..."
                            }
                        ],

                        "overallReport":{
                            "communication":8,
                            "technical":7,
                            "confidence":9,
                            "strengths":[
                                "...",
                                "..."
                            ],
                            "improvements":[
                                "...",
                                "..."
                            ],
                            "summary":"..."
                        }
                    }
                    Interview:${JSON.stringify(questions)}
                    `
            }

        ]
}

  
module.exports=message  