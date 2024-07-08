import React from 'react';

const ChatMessages = ({ chatId, messages, isMessagesLoaded, error }) => {
  if (!isMessagesLoaded) {
    return <div>Loading messages...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="chat-messages">
      <ul className='chat'>
        {messages.map(message => (
          <li
            key={message.id}
            className={message.sender ? 'user-message' : 'BeyondChats'}
          >
            <strong>{message.sender ? message.sender.name : 'received-message'}: </strong>
            {message.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatMessages;
