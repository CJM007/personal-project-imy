export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const formattedMonth = month.toString().padStart(2, "0");
  const formattedDay = day.toString().padStart(2, "0");

  try {
    if (!config.historyApiId || !config.historyApiKey) {
      return {
        error: true,
        message: "History API credentials not configured",
        facts: [],
      };
    }

    const response = await fetch(
      `https://cn.apihz.cn/api/zici/today.php?id=${config.historyApiId}&key=${config.historyApiKey}&m=${formattedMonth}&d=${formattedDay}`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "Nuxt-App",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();

    if (data.code === 200) {
      const chineseText = `${data.y}年: ${data.title}`;

      const translateResponse = await fetch(
        "https://translate.googleapis.com/translate_a/single",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client: "gtx",
            sl: "zh",
            tl: "en",
            dt: "t",
            q: chineseText,
          }),
        },
      );

      if (!translateResponse.ok) {
        return {
          date: `${formattedMonth}/${formattedDay}`,
          year: data.y,
          originalChinese: chineseText,
          event: data.title,
          description: data.content || data.title,
          keywords: data.keyword,
          hasEvents: true,
          translationNote: "Original Chinese (translation unavailable)",
        };
      }

      const translateData = await translateResponse.json();

      const translatedText = translateData[0]?.[0]?.[0] || data.title;

      return {
        date: `${formattedMonth}/${formattedDay}`,
        year: data.y,
        originalChinese: chineseText,
        event: translatedText,
        description: translatedText,
        keywords: data.keyword,
        hasEvents: true,
        translator: "Google Translate",
      };
    } else {
      return {
        date: `${formattedMonth}/${formattedDay}`,
        message: "No historical events found for today",
        hasEvents: false,
      };
    }
  } catch (error: any) {
    console.error("History API error:", error);

    if (process.dev) {
      return {
        date: `${new Date().getMonth() + 1}/${new Date().getDate()}`,
        year: "2024",
        event: "Error",
        description: "Error",
        hasEvents: true,
        isSample: true,
      };
    }

    return {
      error: true,
      message: error.message,
      facts: [],
    };
  }
});
