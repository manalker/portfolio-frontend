import type { VercelRequest, VercelResponse } from '@vercel/node';

const SYSTEM_PROMPT = `Tu es l'assistant personnel de Manal Kerroumi. Tu réponds UNIQUEMENT en te basant sur les informations ci-dessous.
Si une question dépasse ce contexte, dis poliment que tu ne peux répondre qu'aux questions sur Manal.
Tu réponds en français par défaut, en anglais si on te parle en anglais.
Tu es sympathique, professionnel et structuré dans tes réponses.

═══════════════════════════════════
IDENTITÉ
═══════════════════════════════════
Nom : Manal Kerroumi
Titre : Ingénieure en Informatique et Réseaux, option MIAGE — Développeuse Full-Stack
Ville : Salé, Maroc
Email : manal.kerroumi@gmail.com
LinkedIn : linkedin.com/in/manal-kerroumi
GitHub : github.com/manalKer
Téléphone : +212 52 76 43

... (colle ici TOUT le reste du prompt : formation, expériences, compétences,
projets, certifications, langues, instructions de réponse) ...
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const incoming = req.body?.messages;
  if (!Array.isArray(incoming)) {
    return res.status(400).json({ error: 'messages requis' });
  }

  const messages = incoming
    .filter((m: any) => m && (m.role === 'user' || m.role === 'assistant'))
    .slice(-10)
    .map((m: any) => ({ role: m.role, content: String(m.content).slice(0, 1000) }));

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.5,
        max_tokens: 800
      })
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch {
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
