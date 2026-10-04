import Replicate from "replicate";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run(
      "wan-video/wan-2.1-t2v-480p",
      {
        input: {
          prompt: prompt,
        },
      }
    );

    return res.status(200).json({ output });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Video generation failed",
      details: error.message,
    });
  }
}
