import { useState, useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  // Dummy stories
  const [stories, setStories] = useState([
    {
      id: "1",
      name: "Rohan Sharma",
      img: "https://images.pexels.com/photos/33435591/pexels-photo-33435591.jpeg",
      owner: false,
    },
    {
      id: "2",
      name: "Simran Patel",
      img: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1170&auto=format&fit=crop",
      owner: false,
    },
    {
      id: "3",
      name: "Arjun Verma",
      img: "https://img.freepik.com/premium-photo/wide-angle-shot-single-tree-growing-clouded-sky-sunset-surrounded-by-grass_181624-22807.jpg",
      owner: false,
    },
  ]);

  const [selectedStory, setSelectedStory] = useState(null);

  // Add new story
  const handleAddStory = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newStory = {
        id: Date.now(),
        name: currentUser.name,
        img: URL.createObjectURL(file),
        owner: true, // mark as added by current user
      };
      setStories([newStory, ...stories]); // prepend new story
    }
  };

  // Delete story
  const handleDeleteStory = (id) => {
    const updated = stories.filter((story) => story.id !== id);
    setStories(updated);
    setSelectedStory(null); // close modal after delete
  };

  return (
    <div className="stories">
      {/* Current user add story box */}
      <div className="story add-story">
        <label htmlFor="storyUpload">
          <img
            className="story-img"
            src={
              currentUser.profilePic
                ? "/upload/" + currentUser.profilePic
                : "https://images.pexels.com/photos/33435591/pexels-photo-33435591.jpeg"
            }
            alt={currentUser.name}
          />
          <span>{currentUser.name}</span>
          <button>+</button>
        </label>
        <input
          type="file"
          id="storyUpload"
          accept="image/*,video/*"
          style={{ display: "none" }}
          onChange={handleAddStory}
        />
      </div>

      {/* Render stories */}
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img
            className="story-img"
            src={story.img}
            alt={story.name}
            onClick={() => setSelectedStory(story)}
          />
          <span>{story.name}</span>
        </div>
      ))}

      {/* Story viewer modal */}
      {selectedStory && (
        <div className="story-viewer" onClick={() => setSelectedStory(null)}>
          <div className="overlay"></div>
          <div
            className="viewer-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              className="story-img"
              src={selectedStory.img}
              alt={selectedStory.name}
            />
            <p>{selectedStory.name}</p>

            {/* Delete button only in modal if it's current user's story */}
            {selectedStory.owner && (
              <button
                className="delete-btn"
                onClick={() => handleDeleteStory(selectedStory.id)}
              >
                Delete Story
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
