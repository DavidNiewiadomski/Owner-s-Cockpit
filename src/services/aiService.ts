
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
      });

      console.log('AIService: Sending message to AI:', message);
      console.log('AIService: Conversation history length:', this.conversationHistory.length);

      // Call the Supabase Edge Function
      console.log('AIService: Calling Supabase function...');
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: {
          message,
          conversationHistory: this.conversationHistory.slice(-10)
        }
      });

      console.log('AIService: Supabase function response:', { data, error });

      if (error) {
        console.error('AIService: Supabase function error:', error);
        throw new Error(`AI service temporarily unavailable: ${error.message || 'Unknown error'}`);
      }

      if (!data) {
        console.error('AIService: No data returned from function');
        throw new Error('No response from AI service');
      }

      if (data.error) {
        console.error('AIService: Error in response data:', data.error);
        throw new Error(`AI service error: ${data.error}`);
      }

      if (!data.response) {
        console.error('AIService: No response field in data:', data);
        throw new Error('Invalid response format from AI service');
      }

      const aiResponse = data.response;
      console.log('AIService: AI Response received:', aiResponse);

      // Add AI response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString()
      });

      return aiResponse;
    } catch (error) {
      console.error('AIService: Full error details:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('AIService: Error message:', errorMessage);
      
      // Add error to conversation history for context
      const fallbackResponse = `I'm having trouble connecting to the AI service right now. This might be because the service is starting up or temporarily unavailable. Please try again in a moment.`;
      
      this.conversationHistory.push({
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date().toISOString()
      });
      
      return fallbackResponse;
    }
  }

  getConversationHistory(): ChatMessage[] {
    return [...this.conversationHistory];
  }

  clearHistory(): void {
    this.conversationHistory = [];
  }
}

// Export a singleton instance
export const aiService = new AIService();
