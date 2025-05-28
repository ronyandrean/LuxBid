import React from "react";
import "../style/HowItWorks.css";

interface HowItWorksPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowItWorksPopup : React.FC<HowItWorksPopupProps> = ({ isOpen, onClose }) => {
    console.log("Popup state:", isOpen);

  
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>How it Works</h2>
        <p>This is where you describe how your platform works.</p>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default HowItWorksPopup;
