
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get("OPENAI_API_KEY");
const giphyApiKey = Deno.env.get("GIPHY_API_KEY");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, course, language, userName, progress, previousMessages } = await req.json();

    // Define system prompt based on course and language
    let systemPrompt = "";
    let searchTerm = "";
    
    if (course === 'digital-marketing') {
      systemPrompt = `You are Digital Mama, a Nigerian digital marketing expert with a boss-lady vibe. You teach people how to make money online with digital marketing. 
      You have tech-savvy aunty energy that no dey carry last. Your style is to roast but also hype up your students.
      You love using emojis, making TikTok references, and using "Ajebo/Ajekpako" banter.
      You're excited about empowering Nigerians to earn money online. If the user completes quizzes successfully, hint that you might reward them with free data.`;
      
      // For welcome messages, include Aki and Pawpaw
      if (message.includes('introduce yourself') || message.includes('Say hello')) {
        searchTerm = "aki and pawpaw nigerian comedy";
      } else {
        searchTerm = "naija digital funny woman";
      }
    } else if (course === 'pastry-biz') {
      systemPrompt = `You are Baker Amara, a Nigerian pastry business expert with a soft-spoken but sassy personality. You teach people how to start and grow profitable baking businesses.
      You're the "sweet tooth auntie" from church that bakes magic. You laugh at baking fails, but will correct with love.
      You use food slang like "Ya batter dey misbehave o!" and you're passionate about helping Nigerians turn their baking skills into businesses.`;
      
      // For welcome messages, include Aki and Pawpaw
      if (message.includes('introduce yourself') || message.includes('Say hello')) {
        searchTerm = "aki and pawpaw nigerian comedy";
      } else {
        searchTerm = "naija auntie baking";
      }
    } else if (course === 'importation') {
      systemPrompt = `You are Uncle Musa, a Nigerian importation business expert with igboro man vibes. You teach people how to import and sell products profitably.
      You're a sharp hustler from Lagos with Dubai plug. You're brutally honest, motivational, and streetwise.
      You will mock users if they slack, but you'll ginger them to sell. You're passionate about helping Nigerians start successful import businesses.`;
      
      // For welcome messages, include Aki and Pawpaw
      if (message.includes('introduce yourself') || message.includes('Say hello')) {
        searchTerm = "aki and pawpaw nigerian comedy";
      } else {
        searchTerm = "naija hustle funny man";
      }
    } else {
      systemPrompt = `You are a helpful Nigerian business coach. You teach people how to start and grow profitable businesses.
      You have a friendly, encouraging personality. You're excited about empowering Nigerians to succeed in business.`;
      
      // For welcome messages, include Aki and Pawpaw
      if (message.includes('introduce yourself') || message.includes('Say hello')) {
        searchTerm = "aki and pawpaw nigerian comedy";
      } else {
        searchTerm = "naija business";
      }
    }
    
    // Use pidgin as default if no language is specified
    const userLanguage = language || 'pidgin';
    
    // Add language style guidance based on selected language
    if (userLanguage === 'pidgin') {
      systemPrompt += ` You MUST speak Nigerian Pidgin English fluently and use it in EVERY response. Use phrases like "How you dey?", "Abeg", "Na so", "Wetin dey", "My people!", "Oya now!", "Chai!", "Wahala!", "E be tins!", etc. Make your messages sound authentically Nigerian with plenty Naija street slang.`;
    } else if (userLanguage === 'yoruba') {
      systemPrompt += ` You mix Yoruba expressions into your English. Use phrases like "Ẹ ṣeun", "Mo dupe", "Jọ̀wọ́", "Bawo ni", etc.`;
    } else if (userLanguage === 'hausa') {
      systemPrompt += ` You mix Hausa expressions into your English. Use phrases like "Sannu", "Na gode", "Yaya dai", etc.`;
    } else if (userLanguage === 'igbo') {
      systemPrompt += ` You mix Igbo expressions into your English. Use phrases like "Kedu", "Daalu", "Biko", etc.`;
    }
    
    // Add personality guidance
    systemPrompt += ` Be extremely funny, engaging, roastful, and full of Naija flavor. Use plenty emojis and make jokes. Structure your messages with proper spacing and formatting.
    If the user has made progress or passed quizzes, acknowledge that. If they ask for help, provide it with enthusiasm.
    Remember past conversations and refer to them when relevant. Always be animated and theatrical in your responses! Speak like you are in a Nollywood movie, with references to Nigerian culture.`;

    // For welcome messages, add extra personality
    if (message.includes('introduce yourself') || message.includes('Say hello')) {
      systemPrompt += ` Your response should be extra welcoming, reference Aki and Pawpaw's comedy style, and be extremely funny. Create a warm, fun introduction that would make anyone laugh and feel comfortable.`;
    }

    // Add context about the user's progress if available
    if (progress) {
      systemPrompt += ` The user ${userName} has completed ${progress.completed}/${progress.total} modules, with an overall progress of ${progress.percentage}%.`;
    }

    // Create messages array, including history if available
    let messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ];

    if (previousMessages && previousMessages.length > 0) {
      // Insert previous messages before the current message
      messages = [
        { role: 'system', content: systemPrompt },
        ...previousMessages,
        { role: 'user', content: message }
      ];
    }
    
    // Make the request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.9, // Increased for more creativity
        max_tokens: 1000, // Increased for longer responses
        presence_penalty: 0.7, // Added to encourage uniqueness
        frequency_penalty: 0.7, // Added to discourage repetition
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('OpenAI API error:', data.error);
      throw new Error(data.error.message || 'Error from OpenAI API');
    }
    
    const generatedResponse = data.choices[0].message.content;

    // Always get a related GIF from Giphy API for more engagement
    let gifUrl = null;
    try {
      const giphyResponse = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodeURIComponent(searchTerm)}&limit=10&offset=0&rating=pg-13&lang=en&bundle=messaging_non_clips`);
      const giphyData = await giphyResponse.json();
      
      if (giphyData.data && giphyData.data.length > 0) {
        // Get a random GIF from the top 10 results for more variety
        const randomIndex = Math.floor(Math.random() * Math.min(10, giphyData.data.length));
        gifUrl = giphyData.data[randomIndex].images.fixed_height.url;
      }
    } catch (giphyError) {
      console.error('Giphy API error:', giphyError);
      // Continue without a GIF if there's an error
    }

    return new Response(JSON.stringify({ 
      response: generatedResponse,
      gif: gifUrl
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-with-ai function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
