
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, conversationHistory } = await req.json()
    
    console.log('Edge function received:', { message, conversationHistory });
    
    // Get the Gemini API key
    const GEMINI_API_KEY = 'AIzaSyDLBm0-7qT4P2IESMvw7Tv6FK20TmnpeFE'
    
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key not found')
    }

    // Prepare the conversation context
    const messages = conversationHistory || []
    console.log('Conversation context:', messages);

    // Create the prompt for Gemini
    const conversationContext = messages.slice(-6).map(msg => `${msg.role}: ${msg.content}`).join('\n');
    const fullPrompt = conversationContext + `\nuser: ${message}\nassistant:`;

    console.log('Sending to Gemini API...');

    // Call Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a helpful construction project assistant powered by Google Gemini. You help with project management, resource allocation, timeline planning, and other construction-related tasks. 

Context from conversation:
${conversationContext}

Current user message: ${message}

Please respond helpfully and professionally:`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    })

    console.log('Gemini API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json()
    console.log('Gemini API response data:', data);
    
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.'

    console.log('Final AI response:', aiResponse);

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Check the edge function logs for more information'
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
