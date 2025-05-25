
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
      console.log('=== AI SERVICE STARTED ===');
      console.log('Sending message:', message);

      // Add user message to history
      this.conversationHistory.push({
        role: 'user',
        content: message,
        timestamp: new Date().toISOString()
      })

      console.log('Conversation history length:', this.conversationHistory.length);
      console.log('Calling Supabase Edge Function...');

      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: {
          message,
          conversationHistory: this.conversationHistory.slice(-10)
        }
      });

      console.log('Supabase function response:');
      console.log('- Data:', data);
      console.log('- Error:', error);

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

      console.log('Successfully received AI response:', aiResponse.substring(0, 100) + '...');

      // Add AI response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString()
      })

      console.log('=== AI SERVICE COMPLETED ===');
      return aiResponse;

    } catch (error) {
      console.error('=== AI SERVICE ERROR ===');
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      // Return a helpful error message that indicates the real problem
      const fallbackResponse = `I'm having trouble connecting to the AI service right now. Error: ${errorMessage}. Please check the browser console for detailed logs and try again.`;
      
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
