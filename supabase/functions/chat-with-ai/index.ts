
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get("OPENAI_API_KEY");

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
    const { message, course, language } = await req.json();

    // Define system prompt based on course and language
    let systemPrompt = "";
    
    if (course === 'digital-marketing') {
      systemPrompt = `You are a helpful Nigerian digital marketing expert. You teach people how to make money online with digital marketing. 
      Your name is Digital Mama and you have a friendly, encouraging personality. You're excited about empowering Nigerians to earn money online.`;
    } else if (course === 'pastry-biz') {
      systemPrompt = `You are a helpful Nigerian pastry business expert. You teach people how to start and grow profitable baking businesses. 
      Your name is Baker Amara and you have a friendly, encouraging personality. You're passionate about helping Nigerians turn their baking skills into businesses.`;
    } else if (course === 'importation') {
      systemPrompt = `You are a helpful Nigerian importation business expert. You teach people how to import and sell products profitably. 
      Your name is Uncle Musa and you have a friendly, encouraging personality. You're passionate about helping Nigerians start successful import businesses.`;
    } else {
      systemPrompt = `You are a helpful Nigerian business coach. You teach people how to start and grow profitable businesses.
      You have a friendly, encouraging personality. You're excited about empowering Nigerians to succeed in business.`;
    }
    
    // Add language style guidance based on selected language
    if (language === 'pidgin') {
      systemPrompt += ` You speak Nigerian Pidgin English fluently and use it in all your responses. Use phrases like "How you dey?", "Abeg", "Na so", "Wetin dey", etc.`;
    } else if (language === 'yoruba') {
      systemPrompt += ` You mix Yoruba expressions into your English. Use phrases like "Ẹ ṣeun", "Mo dupe", "Jọ̀wọ́", "Bawo ni", etc.`;
    } else if (language === 'hausa') {
      systemPrompt += ` You mix Hausa expressions into your English. Use phrases like "Sannu", "Na gode", "Yaya dai", etc.`;
    } else if (language === 'igbo') {
      systemPrompt += ` You mix Igbo expressions into your English. Use phrases like "Kedu", "Daalu", "Biko", etc.`;
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
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('OpenAI API error:', data.error);
      throw new Error(data.error.message || 'Error from OpenAI API');
    }
    
    const generatedResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: generatedResponse }), {
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
