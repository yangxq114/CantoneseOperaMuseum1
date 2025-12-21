import { GoogleGenAI } from "@google/genai";
import { PlayData } from "../types";

// Initialize the Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCharacterInsight = async (play: PlayData, characterName: string): Promise<string>  => {
  try {
    const prompt = `
      You are an expert curator of Cantonese Opera. 
      The user is looking at the character "${characterName}" from the opera "${play.title}" (${play.titleEn}).
      
      Provide a concise, engaging, and culturally rich 1-paragraph biography or analysis of this character. 
      Focus on their role type (Sheng, Dan, etc.), their motivation, and their tragic or comedic significance in the play.
      Keep it under 150 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No insight available at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The curator is currently unavailable. Please try again later.";
  }
};

export const getLyricInterpretation = async (play: PlayData, lyric: string): Promise<string> => {
   try {
    const prompt = `
      You are an expert on Chinese literature and Cantonese Opera.
      Analyze the following lyric from "${play.title}":
      "${lyric}"
      
      Explain the imagery, metaphors, or emotional subtext used here. Why is this line famous?
      Keep it brief (under 100 words).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No interpretation available.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to retrieve interpretation.";
  }
}
