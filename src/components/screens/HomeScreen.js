import React, { useState, useEffect } from "react";
import { fetchChats } from "./Home"; 
import '../../App.css';

const DEFAULT_IMAGE_URL = "https://static.statusqueen.com/dpimages/thumbnail/dp%20image70-689.jpg";

const HomeScreen = ({ onChatClick }) => {
  const [users, setUsers] = useState([]);

  const getUser = async () => {
    try {
      const allChats = await fetchChats();
      console.log(allChats); 
      setUsers(allChats);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const RenderCard = ({ item }) => (
    <div className="mycard" onClick={() => onChatClick(item.id)}>
      <img src={item.image_url || DEFAULT_IMAGE_URL} alt="user avatar" className="img" />
      <div>
        <p className="text">{item.name}</p>
        <p className="text">{item.email}</p>
        {item.creator && (
          <div>
            <p className="text-name">{item.creator.name}</p>
            <p className="text">{item.creator.email}</p>
            <p className="text">{item.creator.image_url}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flatlist">
      {users.map((user) => (
        <RenderCard key={user.id} item={user} />
      ))}
    </div>
  );
};

export default HomeScreen;
