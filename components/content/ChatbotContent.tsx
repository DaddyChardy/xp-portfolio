import React, { useState, useEffect, useRef } from 'react';
// Note: @google/genai is imported dynamically inside useEffect to prevent app crash on load.

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const ChatbotContent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "Hello! I'm Clippy, Richard's assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const chatRef = useRef<any | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = async () => {
      try {
        const { GoogleGenAI } = await import('@google/genai');

        // WARNING: Storing API keys in client-side code is insecure and should be avoided in production.
        // This is for demonstration purposes only, based on user-provided information.
        const apiKey = "AIzaSyCXYIXpNdfi9CBj8h4BgxcWhSf9KlWx7LA";

        if (!apiKey) {
          console.error("API_KEY is not set.");
          setMessages(prev => [...prev, { sender: 'bot', text: "I'm sorry, I can't connect right now. The API key is missing." }]);
          return;
        }

        const ai = new GoogleGenAI({ apiKey });
        
        const systemInstruction = `You are a helpful and friendly assistant named Clippy on Richard T. Cubero's portfolio website. Your purpose is to answer questions about Richard's skills, experience, projects, and background based ONLY on the information provided below. Be concise, and maintain a professional but approachable tone, reminiscent of a helpful assistant from the early 2000s.

          **Richard T. Cubero's Information:**

          **Summary:**
          Computer Science graduate (June 2025, NEMSU) with 15+ years of IT experience in full-stack development, AI integration, and tech support. Skilled in building AI-powered web apps, SaaS tools, and chatbot integrations using Next.js, Tailwind, ChatGPT, and Gemini. Strong foundation in systems administration, ICT security, and hardware/software troubleshooting. Open to opportunities in innovative tech-driven environments where problem-solving and development skills can make an impact.

          **About Me:**
          I'm a passionate and experienced IT professional with over 15 years in the industry, currently completing my Computer Science degree. My journey has spanned from hands-on tech support and systems administration to modern full-stack development and AI integration. I specialize in building innovative, AI-powered web applications and SaaS tools using technologies like Next.js, Tailwind CSS, ChatGPT, and the Gemini API. I believe in creating solutions that are not just functional but also drive real impact and efficiency for clients and users. When I'm not coding or troubleshooting, I enjoy exploring new technologies, taking on freelance projects, and continuously learning to stay at the forefront of the ever-evolving tech world.

          **Work Experience:**
          1. **AI-Enhanced Web Developer, Freelance (Aug 2024 – Present):** Built and deployed AI-powered websites and SaaS tools, boosting client conversion rates by up to 30%. Automated workflows with ChatGPT, Gemini, and n8n, saving clients 15+ hours of manual work weekly.
          2. **ICT Intern, DepEd Surigao del Sur Division – ICT Unit (Jun 2024 – Aug 2024):** Provided technical support, created an ICT ticketing system, and collaborated on ICT workflows.
          3. **Technical Staff, ECPAC Systems Corporation (Aug 2016 – Mar 2018):** Delivered software/hardware support and technical training for government clients.
          4. **Technical Support Specialist, ECPAC Davao (Jan 2015 – Dec 2019):** Resolved ICT issues for 15+ government clients, reducing downtime by 40%. Trained 20+ staff.
          5. **IT Systems Technician, DPWH Tandag City (2013 – 2014):** Maintained and updated 20+ workstations.

          **Education:**
          - Bachelor of Science in Computer Science, North Eastern Mindanao State University (NEMSU), Batch 2025.
          - Jacinto P. Elpa National High School, Graduate 2007.
          - Telaje Elementary School, Graduate 2001.

          **Certifications & Training:**
          - CSS NC-II (Computer Systems Servicing) – TESDA
          - Ethical Hacking & Capture-the-Flag (CTF) Training – DICT Caraga (June 2024)
          - Flood Projection & GIS Mapping – Google Earth Engine (GEE) Practice Project (2024)
          - Google Developer Student Clubs (GDSC) – Technical activities and collaboration

          **Projects:**
          1. **Infobot: Smart Division Assistant:** Official AI Chatbot for DepEd Tandag City Division providing updates, document search, and insights.
          2. **AIssistant:** AI-powered coding tutor with interfaces for students and instructors.
          3. **PSA Website Clone:** Functional replication of the Philippine Statistics Authority website.
          4. **ICT Ticketing System (DepEd SDS):** Streamlined issue reporting and support process.

          **Personal Information:**
          - Full Name: Richard Tejero Cubero
          - Date of Birth: September 4, 1989
          - Civil Status: Married
          - Citizenship: Filipino (Dual Citizenship by birth)
          - Height/Weight: 1.77m / 70kg
          - Blood Type: AB-
          - Address: Purok Saturn, Telaje, Tandag City, Surigao del Sur, 8300 Philippines
          - Mobile: 0912-022-8669
          - Email: richardcubero2021@gmail.com

          **Family Background:**
          - Spouse: Ediliza Duhaylungsod Cubero (DepEd Employee)
          - Children: Nathalie Samantha D. Cubero, Cassandra Nichole D. Cubero, Erica Alexis D. Cubero
          - Father: Andrew Guing-Guing Cubero (Deceased)
          - Mother: Ediliza Tejero

          **Professional References:**
          - Eddie G. Duhaylungsod, Sr. | Tandag City, SDS | 0963-971-3795
          - Bethany I. Evilla, CPA | Tandag City, SDS

          If you are asked about something not in this data, politely state that you do not have information on that topic. Do not invent information.

          IMPORTANT: Format all your responses as plain text only. Do not use markdown (like asterisks for bolding or lists). All output should be simple, clean text.
`;

        chatRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: systemInstruction,
          },
        });
        setIsReady(true);
      } catch (error) {
        console.error("Failed to initialize chatbot:", error);
        setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, I'm having trouble starting up. My core components might be missing or there's a connection issue." }]);
      }
    };
    initChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading || !isReady) return;
    
    const userMessage: Message = { sender: 'user', text: trimmedInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: trimmedInput });
      const botMessage: Message = { sender: 'bot', text: response.text };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Gemini API error:", error);
      const errorMessage: Message = { sender: 'bot', text: "Oops! Something went wrong. I couldn't process your request." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white font-sans text-sm">
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-2 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
              <p className="text-gray-800 whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="p-2 rounded-lg bg-gray-200">
                <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-2 border-t border-gray-400 bg-[#ECE9D8]">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading || !isReady}
            placeholder="Type your message..."
            className="flex-grow p-1 border border-gray-500 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-200"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim() || !isReady}
            className="px-5 py-1 text-black bg-[#ECE9D8] border border-t-[#FFFFFF] border-l-[#FFFFFF] border-r-[#7F7F7F] border-b-[#7F7F7F] hover:bg-gray-200 active:border-t-[#7F7F7F] active:border-l-[#7F7F7F] active:border-r-[#FFFFFF] active:border-b-[#FFFFFF] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatbotContent;