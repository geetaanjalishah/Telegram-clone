import React, { Component } from 'react';
import { fetchChats, fetchMessages } from './components/screens/Home';
import Navbar from './components/Navbar';
import HomeScreen from './components/screens/HomeScreen';
import ChatMessages from './components/screens/ChatMessages';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      messages: [],
      selectedChatId: null,
      isChatsLoaded: false,
      isMessagesLoaded: false,
      error: null,
      isMobileView: window.innerWidth <= 600, 
    };
  }

  componentDidMount() {
    this.loadChats();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ isMobileView: window.innerWidth <= 600 });
  }

  loadChats() {
    fetchChats()
      .then(chats => {
        this.setState({
          isChatsLoaded: true,
          chats,
        });
      })
      .catch(error => {
        console.error("Error fetching chats:", error);
        this.setState({
          isChatsLoaded: true,
          error,
        });
      });
  }

  loadMessages = async (chatId) => {
    try {
      const messages = await fetchMessages(chatId);
      this.setState({
        selectedChatId: chatId,
        messages,
        isMessagesLoaded: true,
      });
    } catch (error) {
      console.error(`Error fetching messages for chat ${chatId}:`, error);
      this.setState({
        isMessagesLoaded: true,
        error,
      });
    }
  }

  goBack = () => {
    this.setState({ selectedChatId: null });
  }

  render() {
    const { chats, messages, isChatsLoaded, isMessagesLoaded, error, selectedChatId, isMobileView } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isChatsLoaded) {
      return <div>Loading chats...</div>;
    } else {
      return (
        <div className="app-container">
          <Navbar />
          <div className="chat-container">
            {(!selectedChatId || !isMobileView) && (
              <div className="sidebar">
                <HomeScreen chats={chats} onChatClick={this.loadMessages} />
              </div>
            )}
            {selectedChatId && (
              <div className={`messages-container ${isMobileView ? 'show' : ''}`}>
                {isMobileView && (
                  <button className="back-button " onClick={this.goBack}>Back</button>
                )}
                <ChatMessages
                  chatId={selectedChatId}
                  messages={messages}
                  isMessagesLoaded={isMessagesLoaded}
                  error={error}
                />
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}

export default App;
