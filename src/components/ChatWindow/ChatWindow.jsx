import React, { useState } from 'react'
import Message from '../Message/Message';
import { getBotResponse } from '../../api';

 function ChatWindow () {
    const [messages,setMessages]=useState([]);
    const[input,setInput]=useState('');
    const [loading,setLoading]=useState(false)

    const handleSend=async()=>{
      if(!input.trim()) return;

      // Додаємо повідомлення користувача
setMessages((prev)=>[...prev,{text:userText,sender:"user"}])
const userText = input;
setInput("");
setLoading(true);
// 2) Записуємо час початку, щоб виміряти, скільки зайняло "думання"
const startTime =Date.now() 
 // 3) Отримуємо відповідь від бота (await)
    let responseText;
    try {
      responseText = await getBotResponse(userText);
    } catch (err) {
      console.error("Помилка при запиті бота:", err);
      responseText = "Вибач, сталася помилка. Спробуй ще раз.";
    }

    // 4) Вимірюємо, скільки вже пройшло з початку запиту
    const elapsed = Date.now() - startTime;

    // 5) Хочемо, щоб "typing" тривав мінімум 1000ms (1 сек)
    const delay = Math.max(0, 1000 - elapsed);

    // 6) Показуємо відповідь після залишкової затримки
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: responseText, sender: "bot" }]);
      setLoading(false);
    }, delay);
  };
 // 🎯 Надсилання через Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
 return (
    <div className='chat-window'>
      <div className='messages'>
        {messages.map((msg,index)=>(
            <Message key={index} sender={msg.sender} text={msg.text}/>
        ))}
        {loading && (
  <div className="message bot typing">
    <span className="dot"></span>
    <span className="dot"></span>
    <span className="dot"></span>
  </div>
)}
      </div>
      <div className='input-area'>
        <input

       type="text"
       value={input}
       onChange={(e) => setInput(e.target.value)}
       onKeyDown={handleKeyDown}
  placeholder="Напиши повідомлення..."
  className="flex-1 p-2 border rounded-xl outline-none"
        />
        <button onClick={handleSend}>Надіслати</button>
      </div>
    </div>
  )
}
 

export default ChatWindow
