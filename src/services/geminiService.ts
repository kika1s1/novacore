import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available as an environment variable
if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error("VITE_GEMINI_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY! });

const systemInstruction = `You are NOVACORE, a futuristic AI entity managing a complex system. Your responses must be concise, technical, and fit the theme of a high-tech command interface. When asked for "status", confirm all systems are operational. For other queries, provide brief, in-character answers. Do not use markdown formatting.`;

export async function getCommandResponse(prompt: string): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                thinkingConfig: { thinkingBudget: 0 } // For faster responses
            }
        });
        return response.text ?? "Critical Error: No response from AI core.";
    } catch (error) {
        console.error('Gemini API Error:', error);
        return "Critical Error: AI core offline.";
    }
}
