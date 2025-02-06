export const generateAIResponse = async (userMessage) => {
 
     const response = await openai.createCompletion({
       model: "gpt-3.5-turbo",
       messages: [{ role: "user", content: userMessage }]
     });
    return response.choices[0].message.content;
    
    return `Mock AI response to: ${userMessage}`;
  };