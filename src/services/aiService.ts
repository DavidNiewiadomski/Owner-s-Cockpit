
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

      console.log('AIService: Sending message:', message);
      console.log('AIService: Using Supabase URL:', supabase.supabaseUrl);

      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: {
          message,
          conversationHistory: this.conversationHistory.slice(-10)
        }
      });

      console.log('AIService: Function response:', { data, error });

      if (error) {
        console.error('AIService: Supabase function error:', error);
        throw new Error(`API Error: ${error.message || 'Failed to send a request to the Edge Function'}`);
      }

      if (!data) {
        throw new Error('API Error: No response received from the AI service');
      }

      if (data.error) {
        console.error('AIService: Error in response:', data.error);
        throw new Error(`API Error: ${data.error}`);
      }

      const aiResponse = data.response;
      if (!aiResponse) {
        throw new Error('API Error: Empty response from AI service');
      }

      console.log('AIService: Successfully received AI response');

      // Add AI response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString()
      })

      return aiResponse;

    } catch (error) {
      console.error('AIService: Error occurred:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      // For connection/API errors, provide a more helpful message
      if (errorMessage.includes('Failed to send a request to the Edge Function') || 
          errorMessage.includes('fetch')) {
        const fallbackMessage = "I'm experiencing technical difficulties (API Error: Failed to send a request to the Edge Function). Please check the console for more details, or try again in a moment.";
        
        this.conversationHistory.push({
          role: 'assistant',
          content: fallbackMessage,
          timestamp: new Date().toISOString()
        })
        
        return fallbackMessage;
      }
      
      // For other errors, return the specific error message
      const fallbackResponse = `I encountered an error: ${errorMessage}. Please try again.`;
      
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
