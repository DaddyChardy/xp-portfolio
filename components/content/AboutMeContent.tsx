
import React from 'react';

const AboutMeContent: React.FC = () => {
  return (
    <div className="p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
      <div className="flex-shrink-0">
        <img 
          src="https://scontent.ftdg1-1.fna.fbcdn.net/v/t39.30808-6/509000441_754919740198775_2469049336563854420_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEhYPYHu3-Gv0jGBfzL_C7SKDasTnbolXwoNqxOduiVfH6n6C-mOgt-03pMUR47iR243GpuYDRTpNb6iCrfrqr3&_nc_ohc=M6NzzcKrqyYQ7kNvwEzd3J8&_nc_oc=AdlC-zcqp_J8Gx7pWZybkBSfmIIpqcFSHyndH0B4Bpc6mdnLnlfcGWZhvsyI9Y9eOo0&_nc_zt=23&_nc_ht=scontent.ftdg1-1.fna&_nc_gid=no_sylvhbKmSbQZEYIma_g&oh=00_AfYc3J9C0vOzNh9lk-Sb1fTk0asAvROg5GdJ9SjhTTKepw&oe=68D92691"
          alt="Richard T. Cubero"
          className="w-48 h-48 rounded-full border-4 border-blue-500 shadow-lg object-cover"
        />
      </div>
      <div className="text-gray-800">
        <h1 className="text-3xl font-bold mb-4 text-blue-800">Hello, I'm Richard T. Cubero</h1>
        <p className="mb-4">
          I'm a passionate and experienced IT professional with over 15 years in the industry, currently completing my Computer Science degree. My journey has spanned from hands-on tech support and systems administration to modern full-stack development and AI integration.
        </p>
        <p className="mb-4">
          I specialize in building innovative, AI-powered web applications and SaaS tools using technologies like Next.js, Tailwind CSS, ChatGPT, and the Gemini API. I believe in creating solutions that are not just functional but also drive real impact and efficiency for clients and users.
        </p>
        <p>
          When I'm not coding or troubleshooting, I enjoy exploring new technologies, taking on freelance projects, and continuously learning to stay at the forefront of the ever-evolving tech world.
        </p>
      </div>
    </div>
  );
};

export default AboutMeContent;
