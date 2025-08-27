import { useState } from "react";
import "./rightBar.scss";

// Dynamic Indian names for suggestions
const initialSuggestions = [
  { id: 1, name: "Aarav Sharma", img: "https://randomuser.me/api/portraits/men/1.jpg", followed: false },
  { id: 2, name: "Ananya Patel", img: "https://randomuser.me/api/portraits/women/2.jpg", followed: false },
  { id: 3, name: "Rohan Gupta", img: "https://randomuser.me/api/portraits/men/3.jpg", followed: false },
  { id: 4, name: "Sneha Reddy", img: "https://randomuser.me/api/portraits/women/4.jpg", followed: false },
  { id: 5, name: "Vikram Singh", img: "https://randomuser.me/api/portraits/men/5.jpg", followed: false },
  { id: 6, name: "Priya Sharma", img: "https://randomuser.me/api/portraits/women/6.jpg", followed: false },
  { id: 7, name: "Aditya Verma", img: "https://randomuser.me/api/portraits/men/7.jpg", followed: false },
  { id: 8, name: "Kavya Joshi", img: "https://randomuser.me/api/portraits/women/8.jpg", followed: false },
  { id: 9, name: "Sameer Khan", img: "https://randomuser.me/api/portraits/men/9.jpg", followed: false },
  { id: 10, name: "Isha Mehta", img: "https://randomuser.me/api/portraits/women/10.jpg", followed: false },
];

// Dummy activities
const activities = [
  { id: 1, name: "Aarav Sharma", img: "https://randomuser.me/api/portraits/men/1.jpg", action: "posted a new photo", time: "2 min ago" },
  { id: 2, name: "Ananya Patel", img: "https://randomuser.me/api/portraits/women/2.jpg", action: "updated her status", time: "5 min ago" },
  { id: 3, name: "Rohan Gupta", img: "https://randomuser.me/api/portraits/men/3.jpg", action: "liked a post", time: "10 min ago" },
  { id: 4, name: "Sneha Reddy", img: "https://randomuser.me/api/portraits/women/4.jpg", action: "commented on a post", time: "15 min ago" },
  { id: 5, name: "Vikram Singh", img: "https://randomuser.me/api/portraits/men/5.jpg", action: "shared a video", time: "20 min ago" },
  { id: 6, name: "Priya Sharma", img: "https://randomuser.me/api/portraits/women/6.jpg", action: "changed profile picture", time: "25 min ago" },
];

// Online friends (scrollable)
const onlineFriends = [
  { id: 1, name: "Aarav Sharma", img: "https://randomuser.me/api/portraits/men/11.jpg" },
  { id: 2, name: "Ananya Patel", img: "https://randomuser.me/api/portraits/women/12.jpg" },
  { id: 3, name: "Rohan Gupta", img: "https://randomuser.me/api/portraits/men/13.jpg" },
  { id: 4, name: "Sneha Reddy", img: "https://randomuser.me/api/portraits/women/14.jpg" },
  { id: 5, name: "Vikram Singh", img: "https://randomuser.me/api/portraits/men/15.jpg" },
  { id: 6, name: "Priya Sharma", img: "https://randomuser.me/api/portraits/women/16.jpg" },
  { id: 7, name: "Aditya Verma", img: "https://randomuser.me/api/portraits/men/17.jpg" },
  { id: 8, name: "Kavya Joshi", img: "https://randomuser.me/api/portraits/women/18.jpg" },
  { id: 9, name: "Sameer Khan", img: "https://randomuser.me/api/portraits/men/19.jpg" },
  { id: 10, name: "Isha Mehta", img: "https://randomuser.me/api/portraits/women/20.jpg" },
];

const RightBar = () => {
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const handleFollow = (id) => {
    setSuggestions(prev =>
      prev.map(user =>
        user.id === id ? { ...user, followed: !user.followed } : user
      )
    );
  };

  const handleDismiss = (id) => {
    setSuggestions(prev => prev.filter(user => user.id !== id));
  };

  return (
    <div className="rightBar">
      <div className="container">
        {/* Suggestions */}
        <div className="item">
          <span>Suggestions For You</span>
          {suggestions.map(user => (
            <div className="user" key={user.id}>
              <div className="userInfo">
                <img src={user.img} alt={user.name} />
                <span>{user.name}</span>
              </div>
              <div className="buttons">
                <button onClick={() => handleFollow(user.id)}>
                  {user.followed ? "Following" : "Follow"}
                </button>
                <button onClick={() => handleDismiss(user.id)}>Dismiss</button>
              </div>
            </div>
          ))}
          {suggestions.length === 0 && <p>No suggestions left!</p>}
        </div>

        {/* Latest Activities */}
        <div className="item">
          <span>Latest Activities</span>
          {activities.map(act => (
            <div className="user" key={act.id}>
              <div className="userInfo">
                <img src={act.img} alt={act.name} />
                <p><span>{act.name}</span> {act.action}</p>
              </div>
              <span>{act.time}</span>
            </div>
          ))}
        </div>

        {/* Online Friends */}
        <div className="item">
          <span>Online Friends</span>
          <div className="scrollable">
            {onlineFriends.map(friend => (
              <div className="user" key={friend.id}>
                <div className="userInfo">
                  <img src={friend.img} alt={friend.name} />
                  <div className="online" />
                  <span>{friend.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
