
import { supabase } from '@/lib/supabase'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export class AIService {
  private conversationHistory: ChatMessage[] = []

  async sendMessage(message: string): Promise<string> {
    try {
      // Add user message to history
      this.conversationHistory.push({
        role: 'user',
        content: message,
        timestamp: new Date().toISOString()
      })

      console.log('Sending message to AI:', message);
      console.log('Conversation history:', this.conversationHistory.slice(-10));

      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: {
          message,
          conversationHistory: this.conversationHistory.slice(-10) // Keep last 10 messages for context
        }
      })

      console.log('Supabase function response:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`API Error: ${error.message}`);
      }

      if (!data || !data.response) {
        console.error('No response from AI service:', data);
        throw new Error('No response received from AI service');
      }

      const aiResponse = data.response;
      console.log('AI Response received:', aiResponse);

      // Add AI response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString()
      })

      return aiResponse;
    } catch (error) {
      console.error('AI Service Error:', error);
      
      // Only use fallback if there's a real error, not for normal API responses
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // Add error info to response for debugging
      const fallbackResponse = `I'm experiencing technical difficulties (${errorMessage}). Please check the console for more details, or try again in a moment.`;
      
      // Add fallback response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date().toISOString()
      })
      
      return fallbackResponse;
    }
  }

  getConversationHistory(): ChatMessage[] {
    return [...this.conversationHistory]
  }

  clearHistory(): void {
    this.conversationHistory = []
  }
}

// Export a singleton instance
export const aiService = new AIService()
