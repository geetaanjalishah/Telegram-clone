import chats from './data/Chat.json'; 
import messages from './data/Message.json'; 

export const fetchChats = () => {
  return new Promise((resolve) => {
    resolve(chats); 
  });
};

export const fetchMessages = (chatId) => {
  return new Promise((resolve, reject) => {
    const chatMessages = messages[chatId];
    if (chatMessages) {
      resolve(chatMessages); 
    } else {
      reject(new Error(`No messages found for chat ${chatId}`));
    }
  });
};

export const Home = () => {
  return null;
};

export default Home;
