
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

      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: {
          message,
          conversationHistory: this.conversationHistory.slice(-10)
        }
      });

      if (error) {
        console.error('Supabase function error details:', error);
        throw new Error(`Supabase Error: ${error.message || 'Failed to call Edge Function'}`);
      }

      if (!data) {
        console.error('No data received from Supabase function');
        throw new Error('No response received from the AI service');
      }

      if (data.error) {
        console.error('Error in Edge Function response:', data.error);
        throw new Error(`Edge Function Error: ${data.error}`);
      }

      const aiResponse = data.response;
      if (!aiResponse || typeof aiResponse !== 'string') {
        console.error('Invalid AI response:', aiResponse);
        throw new Error('Invalid response from AI service');
      }

      // Add AI response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString()
      })

      return aiResponse;

    } catch (error) {
      console.error('=== AI SERVICE ERROR ===');
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      let fallbackResponse: string;

      if (errorMessage.includes("Supabase Error") || errorMessage.includes("Edge Function Error")) {
        fallbackResponse = `I encountered an issue while trying to communicate with the AI processing service. Please try again shortly. If the problem persists, please contact support. (Details: ${errorMessage})`;
      } else if (error instanceof TypeError && errorMessage.toLowerCase().includes('failed to fetch')) { // TypeError is often a network error
        fallbackResponse = `I'm unable to reach the AI service at the moment. Please check your internet connection and try again. (Details: ${errorMessage})`;
      } else {
        fallbackResponse = `An unexpected error occurred while trying to process your request with the AI. We've logged the issue and are looking into it. Please try again later. (Details: ${errorMessage})`;
      }
      
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
