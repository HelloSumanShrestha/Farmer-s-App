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
                <h3>Name</h3>
                <p>Suman Shrestha</p>
                <h3>Email</h3>
                <p>iamsuman066@gmail.com</p>
                <button className="edit-button" onClick={handleEditClick}>
                    Edit Profile
                </button>
            </div>

            {isEditing && (
                <form className="edit-form" onSubmit={handleSaveClick}>
                    <h2>Edit Profile</h2>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" defaultValue="your_name" />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" defaultValue="your_email@example.com" />
                    <label htmlFor="address">Address:</label>
                    <textarea id="address" name="address" rows="4" defaultValue="your_address" />
                    <button type="submit">Save Changes</button>
                    <button type="button" className="cancel-button" onClick={handleCancelClick}>
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );
};

export default ProfileSection;
