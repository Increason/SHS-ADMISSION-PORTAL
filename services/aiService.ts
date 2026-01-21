
import { GoogleGenAI } from "@google/genai";
import { Student } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateAdmissionsIntelligence(students: Student[], revenue: number) {
  const summary = students.map(s => ({
    name: s.name,
    class: s.class,
    status: {
      cheat: s.cheat,
      form: s.form,
      payment: s.payment,
      bio: s.bioData,
      transcript: s.transcript,
      rector: s.rectorReview
    }
  }));

  const prompt = `
    As an AI Admissions Consultant for a Senior High School, analyze the following real-time admission data:
    Total Students Registered: ${students.length}
    Total Revenue Collected: GH₵ ${revenue}
    
    Student Data Summary: ${JSON.stringify(summary)}

    Please provide:
    1. A brief executive summary of the current cycle.
    2. Identification of any bottlenecks (e.g., many students stuck at transcript entry).
    3. Enrollment trends based on classes.
    4. A recommendation for the Rector to speed up the process.

    Keep the response professional, concise, and formatted in Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Unable to connect to AI Cloud Services at this moment.";
  }
}
