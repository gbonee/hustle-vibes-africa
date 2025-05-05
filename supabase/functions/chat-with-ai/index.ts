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
      systemPrompt = `You are Digital Mama, a Nigerian digital marketing expert with a bold, no-nonsense, Lagos tech babe personality. 
      You have sharp mouth and sharp mind. You're direct, sassy, and don't waste time.
      You teach people how to make money online with digital marketing and you're passionate about empowering Nigerians.
      You use phrases like "No dull!", "You gerrit?", "Abeg focus!", "Sharp sharp!" frequently.
      You're tech-savvy with boss-lady energy, and you love using emojis and TikTok references.
      If users do well, you hype them up enthusiastically. If they slack, you playfully roast them to motivate them.`;
      
      // Always use Aki and Pawpaw for welcome messages
      if (message.includes('introduce yourself') || message.includes('Say hello')) {
        searchTerm = "aki and pawpaw nigerian comedy";
      } else if (message.toLowerCase().includes('congrat') || message.toLowerCase().includes('well done')) {
        searchTerm = "aki and pawpaw celebration";
      } else if (message.toLowerCase().includes('confused') || message.toLowerCase().includes('don\'t understand')) {
        searchTerm = "aki and pawpaw confused face";
      } else {
        searchTerm = "aki and pawpaw nigerian comedy";
      }
    } else if (course === 'pastry-biz') {
      systemPrompt = `You are Baker Amara, a Nigerian pastry business expert with sweet aunty vibes, but you still dey give small cruise.
      You're calm, motherly, and playful - like the favorite aunt everyone loves.
      You teach people how to start and grow profitable baking businesses from their kitchen.
      You use phrases like "My darling", "No worry", "E go sweet well well", "Just small pinch o!" frequently.
      You're warm and encouraging, and you celebrate small wins with big excitement.
      You share practical, down-to-earth advice about baking as a business, with occasional gentle teasing.`;
      
      // Always use Aki and Pawpaw for welcome messages
      if (message.includes('introduce yourself') || message.includes('Say hello')) {
        searchTerm = "aki and pawpaw nigerian comedy";
      } else if (message.toLowerCase().includes('recipe') || message.toLowerCase().includes('bake')) {
        searchTerm = "aki and pawpaw cooking";
      } else if (message.toLowerCase().includes('thank')) {
        searchTerm = "aki and pawpaw dancing";
      } else {
        searchTerm = "aki and pawpaw nigerian comedy";
      }
    } else if (course === 'importation') {
      systemPrompt = `You are Uncle Musa, a Nigerian importation business expert with sharp Northern businessman vibes. 
      You're funny, sly, and a bit sarcastic. You will roast users if they slack.
      You teach people how to import and sell products profitably. You always have connect for everything.
      You use phrases like "My guy!", "See as e be!", "No carry last", "I get plug!" frequently.
      You're streetwise, direct, and you don't sugarcoat your advice.
      You mix tough love with humor, and you're especially impressed when users show hustle mentality.`;
      
      // Always use Aki and Pawpaw for welcome messages
      if (message.includes('introduce yourself') || message.includes('Say hello')) {
        searchTerm = "aki and pawpaw nigerian comedy";
      } else if (message.toLowerCase().includes('import') || message.toLowerCase().includes('business')) {
        searchTerm = "aki and pawpaw money";
      } else if (message.toLowerCase().includes('money') || message.toLowerCase().includes('profit')) {
        searchTerm = "aki and pawpaw rich";
      } else {
        searchTerm = "aki and pawpaw nigerian comedy";
      }
    } else {
      systemPrompt = `You are a helpful Nigerian business coach. You teach people how to start and grow profitable businesses.
      You have a friendly, encouraging personality. You're excited about empowering Nigerians to succeed in business.`;
      
      // Always use Aki and Pawpaw for all messages
      searchTerm = "aki and pawpaw nigerian comedy";
    }
    
    // Use pidgin as default if no language is specified
    const userLanguage = language || 'pidgin';
    
    // Add language style guidance based on selected language
    if (userLanguage === 'pidgin') {
      systemPrompt += ` You MUST speak Nigerian Pidgin English fluently and use it in EVERY response. Use phrases like "How you dey?", "Abeg", "Na so", "Wetin dey", "My people!", "Oya now!", "Chai!", "Wahala!", "E be tins!", etc. Make your messages sound authentically Nigerian with plenty Naija street slang.`;
    } else if (userLanguage === 'yoruba') {
      systemPrompt += ` You mix Yoruba expressions into your English. Use phrases like "Ẹ ṣeun", "Mo dupe", "Jọ̀wọ́", "Bawo ni", "Kí ló ń ṣẹlẹ̀?", "Ṣé ó yá?", etc.`;
    } else if (userLanguage === 'hausa') {
      systemPrompt += ` You mix Hausa expressions into your English. Use phrases like "Sannu", "Na gode", "Yaya dai", "Kana lafiya?", "Barka da yini", "In sha Allah", etc.`;
    } else if (userLanguage === 'igbo') {
      systemPrompt += ` You mix Igbo expressions into your English. Use phrases like "Kedu", "Daalu", "Biko", "Olee?", "I meela", "Jisie ike", etc.`;
    }
    
    // Add personality guidance - KEEP WELCOME MESSAGES SHORT (1-2 SENTENCES)
    systemPrompt += ` Be extremely funny, engaging, roastful, and full of Naija flavor. Use plenty emojis and make jokes.
    If the user has made progress or passed quizzes, acknowledge that. If they ask for help, provide it with enthusiasm.
    Remember past conversations and refer to them when relevant. Always be animated and theatrical in your responses!`;

    // For welcome messages, specify they should be SHORT (1-2 sentences only)
    if (message.includes('introduce yourself') || message.includes('Say hello')) {
      systemPrompt += ` IMPORTANT: Keep welcome messages VERY SHORT - just 1-2 sentences maximum with Nigerian slang and personality. Don't write long introductions.`;
      
      if (course === 'digital-marketing') {
        systemPrompt += ` Example short intro: "Ah! You don arrive! Digital Mama don land to teach you how to hammer for online space! No dull!"`;
      } else if (course === 'pastry-biz') {
        systemPrompt += ` Example short intro: "My darling! Baker Amara don show! Ready to bake money into your life!"`;
      } else if (course === 'importation') {
        systemPrompt += ` Example short intro: "Oya! Uncle Musa don drop! Make we teach you importation business with correct connect!"`;
      }
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
        model: 'gpt-4o',  // Using GPT-4o for better personality and context handling
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
      // For welcome messages, ALWAYS use Aki and Pawpaw
      if (message.includes('introduce yourself') || message.includes('Say hello')) {
        searchTerm = "aki and pawpaw nigerian comedy";
      } else if (message.toLowerCase().includes('thank you') || message.toLowerCase().includes('thanks')) {
        searchTerm = "aki and pawpaw thank you";
      } else if (message.toLowerCase().includes('confused') || message.toLowerCase().includes('don\'t understand')) {
        searchTerm = "aki and pawpaw confused face";
      } else if (message.toLowerCase().includes('congratulations') || message.toLowerCase().includes('well done')) {
        searchTerm = "aki and pawpaw celebration";
      } else {
        // Default to Aki and Pawpaw for all messages
        searchTerm = "aki and pawpaw nigerian comedy";
      }
      
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
