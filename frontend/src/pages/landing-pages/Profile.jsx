import React, { useState } from 'react';
import "../../assets/css/profile.css"
import suman from "../../assets/ourteam/suman.png"

const ProfileSection = () => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleSaveClick = (event) => {
        event.preventDefault();
        alert('Profile updated successfully!');
        setIsEditing(false);
    };

    return (
        <div className="profile-section">
            <div className="profile-picture">
                <img src={suman} alt="Profile Picture" />
            </div>
            <div className="profile-info">
                <h2>Personal Information</h2>
                <div className="info-item">
                    <h3>Name</h3>
                    <p>Suman Shrestha</p>
                </div>
                <div className="info-item">
                    <h3>Email</h3>
                    <p>iamsuman066@gmail.com</p>
                </div>
                <button className="edit-button" onClick={handleEditClick}>
                    Edit Profile
                </button>
            </div>

            {isEditing && (
                <form className="edit-form" onSubmit={handleSaveClick}>
                    <h2>Edit Profile</h2>
                    <div className="form-item">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" defaultValue="Suman Shrestha" />
                    </div>
                    <div className="form-item">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" defaultValue="iamsuman066@gmail.com" />
                    </div>
                    <div className="form-item">
                        <label htmlFor="address">Address:</label>
                        <textarea id="address" name="address" rows="4" defaultValue="Your Address"></textarea>
                    </div>
                    <div className="button-group">
                        <button type="submit" className="save-button">Save Changes</button>
                        <button type="button" className="cancel-button" onClick={handleCancelClick}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ProfileSection;
