export const fetchChats = () => {
    return fetch('https://devapi.beyondchats.com/api/get_all_chats?page=1')
      .then(res => res.json())
      .then(result => {
        if (result && result.data && result.data.data) {
          return result.data.data;
        } else {
          throw new Error("No chats found in the response");
        }
      });
  };
  
  export const fetchMessages = (chatId) => {
    return fetch(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`)
      .then(res => res.json())
      .then(json => {
        if (json && json.data) {
          return json.data;
        } else {
          throw new Error(`No messages found for chat ${chatId}`);
        }
      });
  };
  
  export const Home = () => {
  };
  export default Home
  