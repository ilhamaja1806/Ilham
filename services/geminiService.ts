
import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
Anda adalah AI Personal Stylist dari JTRIFT. JTRIFT adalah brand jaket lokal Indonesia yang berfokus pada streetwear, varsity, dan vintage.
Bantu pelanggan menemukan jaket yang sesuai.

Katalog Produk (Gunakan ID ini untuk rekomendasi):
${JSON.stringify(PRODUCTS.map(p => ({ id: p.id, name: p.name, price: p.price, category: p.category, description: p.description })))}

Tugas Anda:
1. Analisis keinginan pengguna (misal: "Jaket keren buat motoran", "Varsity yang vintage").
2. Berikan narasi gaya yang trendy (Gunakan 'Bro', 'Sis', 'Keren parah').
3. JIKA ada produk yang relevan di katalog, sertakan ID-nya dalam array 'recommendedProductIds'. Maksimal 3 produk.
4. Output HARUS dalam format JSON.

Format JSON Output:
{
  "text": "String narasi gaya Anda",
  "recommendedProductIds": ["ID1", "ID2"]
}
`;

export const getStylistResponse = async (userMessage: string, history: { role: 'user' | 'model', text: string }[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 800,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            recommendedProductIds: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["text"]
        }
      }
    });

    try {
      const data = JSON.parse(response.text || '{}');
      return {
        text: data.text || "Ada lagi yang bisa saya bantu?",
        productIds: data.recommendedProductIds || []
      };
    } catch (e) {
      return { text: response.text || "Maaf, sistem sedang sibuk.", productIds: [] };
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "Maaf, sepertinya saya sedang istirahat sejenak. Silakan tanya lagi nanti ya!", productIds: [] };
  }
};
