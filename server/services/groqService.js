const groq = require('../config/groq')

async function GroqService(message) {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: message,
            model: "llama-3.3-70b-versatile",
        });

        return chatCompletion.choices[0]?.message?.content || "";
    } catch (error) {
        console.error("Groq API Error:", error);
        return "Something went wrong.";
    }
}


// async function main(message) {
//     const chatCompletion = await getGroqChatCompletion(message);
//     // Print the completion returned by the LLM.
//     //console.log(chatCompletion.choices[0]?.message?.content || "");
//     return chatCompletion.choices[0]?.message?.content || "";
// }

// async function getGroqChatCompletion(message) {
//     return groq.chat.completions.create({
//         messages: message,
//         model: "llama-3.3-70b-versatile",
//     });
// }

module.exports=GroqService

