import { NextResponse } from "next/server";
const pdfParse = require("pdf-parse");

// OpenRouter configurations
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const rawModel = process.env.OPENROUTER_TEXT_MODEL || "google/gemini-2.5-flash";
const MODEL = rawModel.endsWith("-api") ? rawModel.replace("-api", "") : rawModel;

const extractStructuredData = async (text: string) => {
  const schema = {
    personal_info: { name: "string", email: "string", phone: "string", role: "string" },
    experience: [{ company: "string", role: "string", duration: "string", description: "string" }],
    education: [{ institution: "string", degree: "string", year: "string" }],
    skills: ["string"],
    projects: [{ name: "string", description: "string" }]
  };
  
  const systemPrompt = `You are an expert data extractor. Always return valid JSON EXACTLY matching this schema with no markdown formatting: ${JSON.stringify(schema)}`;
  const prompt = `Extract data from this text:\n${text}`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ]
    })
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("OpenRouter Extraction Error:", errorText);
    throw new Error("Failed to extract data: " + errorText);
  }
  const data = await res.json();
  const rawContent = data.choices[0].message.content;
  
  try {
    return JSON.parse(rawContent);
  } catch (e) {
    const match = rawContent.match(/```json\n([\s\S]*?)\n```/);
    if (match) return JSON.parse(match[1]);
    return {};
  }
};

const transformResume = async (parsedData: any, universe: string) => {
  const systemPrompt = `You are an AI tasked with transforming a professional resume into an alternate universe reality: ${universe}. Preserve the exact structure and meaning, but change terminology, tone, and descriptions to fit perfectly into the ${universe} theme. Return valid JSON matching the provided structure. Do not use markdown blocks, just raw JSON.`;
  const prompt = `Transform the following resume:\n${JSON.stringify(parsedData)}`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ]
    })
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("OpenRouter Transform Error:", errorText);
    throw new Error("Failed to transform data: " + errorText);
  }
  const data = await res.json();
  const rawContent = data.choices[0].message.content;
  
  try {
    return JSON.parse(rawContent);
  } catch (e) {
    const match = rawContent.match(/```json\n([\s\S]*?)\n```/);
    if (match) return JSON.parse(match[1]);
    return parsedData; // fallback
  }
};

export async function POST(request: Request) {
  try {
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const universe = formData.get("universe") as string;

    if (!file || !universe) {
      return NextResponse.json({ error: "Missing file or universe" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    let rawText = "";
    if (file.type === "application/pdf") {
      const pdfData = await pdfParse(buffer);
      rawText = pdfData.text;
    } else {
      rawText = buffer.toString("utf-8");
    }

    if (!rawText.trim()) {
      return NextResponse.json({ error: "Could not extract text from file" }, { status: 400 });
    }

    // 1. Parse Original Resume
    const original_resume = await extractStructuredData(rawText);
    
    // 2. Transform into Target Universe
    const transformed_resume = await transformResume(original_resume, universe);
    
    // Assign generic themes for the demo if none provided by AI
    transformed_resume.theme = transformed_resume.theme || "bg-zinc-950 text-zinc-300 border-zinc-800";
    transformed_resume.accent = transformed_resume.accent || "text-zinc-100";

    return NextResponse.json({
      original_resume,
      transformed_resume,
      universe
    });
  } catch (err: any) {
    console.error("Generate Variant Error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
