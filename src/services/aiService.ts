
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
          conversationHistory: this.conversationHistory.slice(-10) // Keep last 10 messages for context
        }
      })

      if (error) {
        throw new Error(error.message)
      }

      const aiResponse = data.response || 'Sorry, I could not generate a response.'

      // Add AI response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString()
      })

      return aiResponse
    } catch (error) {
      console.error('AI Service Error:', error)
      
      // Fallback response if API fails
      const fallbackResponses = [
        "I'm here to help with your construction projects. What would you like to know?",
        "I can assist with project management, resource allocation, and timeline planning. How can I help?",
        "I'm experiencing some technical difficulties, but I'm still here to help with your construction needs."
      ]
      
      const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
      
      // Add fallback response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date().toISOString()
      })
      
      return fallbackResponse
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
