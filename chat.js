// Vercel serverless function: /api/chat
// Configure OPENAI_API_KEY in Vercel Project Settings > Environment Variables.
// Never put the API key in index.html or commit it to GitHub.
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: "Missing OPENAI_API_KEY" });
  const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
  const safeMessages = messages
    .filter(m => ["user", "assistant"].includes(m?.role) && typeof m?.content === "string")
    .slice(-16)
    .map(m => ({ role: m.role, content: m.content.slice(0, 4000) }));
  if (!safeMessages.length) return res.status(400).json({ error: "No messages" });
  try {
    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        instructions: "Eres Donarbustin AI, un asistente útil, amable y claro que habla español. Ayuda con preguntas generales, estudio, escritura, programación y proyectos web. No afirmes ser ChatGPT ni OpenAI; eres el asistente de la web Donarbustin. Si no sabes algo, dilo. Mantén respuestas apropiadas para un público joven.",
        input: safeMessages.map(m => ({ role: m.role, content: [{ type: "input_text", text: m.content }] })),
        max_output_tokens: 700
      })
    });
    const data = await upstream.json();
    if (!upstream.ok) {
      console.error("OpenAI API error", upstream.status, data?.error?.message || "");
      return res.status(502).json({ error: "AI provider error" });
    }
    const answer = data.output_text || (data.output || []).flatMap(x => x.content || []).filter(x => x.type === "output_text").map(x => x.text).join("\n");
    if (!answer) return res.status(502).json({ error: "Empty response" });
    return res.status(200).json({ reply: answer });
  } catch (e) {
    console.error("Chat endpoint failed", e);
    return res.status(500).json({ error: "Server error" });
  }
}
