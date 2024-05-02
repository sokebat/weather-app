import { useEffect, useState } from "react";

interface TypeProps {
  text: string;
  speed: number;
}

export const useTypewriter = ({ text, speed = 50 }: TypeProps) => {
  const [displayText, setDisplayText] = useState(""); 

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        console.log(text.length);
        console.log(text.charAt(i));
        setDisplayText((prevText) => prevText + text.charAt(i));
        i = i + 1;
        console.log(displayText);
      } else {
        clearInterval(typingInterval); 
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return displayText;
};
