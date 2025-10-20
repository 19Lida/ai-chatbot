import axios from "axios";

export async function getBotResponse(userText,history=[]) {
  const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
  const endpoint = "https://openrouter.ai/api/v1/chat/completions";

  try {
    const response = await axios.post(
      endpoint,
      {
        model: "z-ai/glm-4.5-air:free", 
        messages: [
          {
            role: "system",
            content:
              "Ти дружній помічник, який відповідає коротко і зрозуміло українською.",
          },
          ...history,
          { role: "user", content: userText },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    console.log("✅ Відповідь OpenRouter:", response.data);

    const reply = response.data?.choices?.[0]?.message?.content?.trim();

    if (!reply || reply === "<s>" || reply === "</s>") {
      return "Готово ✅ Але, здається, я не отримав змістовної відповіді 😅";
    }

    return reply;
  } catch (error) {
    console.error("❌ Помилка при зверненні до OpenRouter:", error);
    if (error.response) {
      console.log("📡 Код помилки:", error.response.status);
      console.log("📄 Деталі:", error.response.data);
    }
    return "Сталася помилка 😢. Перевір ключ або модель.";
  }
}