import aiService from './src/services/aiService.ts';

async function testAI() {
  console.log("Starting AI service test...");
  try {
    const message = "Hello AI, this is a test. What is 1+1?";
    console.log(`Sending message: "${message}"`);
    const response = await aiService.sendMessage(message, []); // Assuming an empty conversation history for a simple test
    console.log("AI Response:", response);
    // Depending on the structure of 'response', you might want to log a specific part of it.
    // For example, if response is an object like { text: "AI's answer" }, log response.text
  } catch (error) {
    console.error("Error calling AI service:", error);
    if (error.response) {
      console.error("Error response data:", await error.response.json().catch(() => error.response.text()));
    }
  }
}

testAI();
