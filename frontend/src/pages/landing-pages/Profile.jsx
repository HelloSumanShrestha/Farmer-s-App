import React, { useState, useEffect } from 'react';
import useStore from "../../zustand/userInfo";
import "../../assets/css/profile.css";

const ProfileSection = () => {
    const { customerId } = useStore();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (customerId) {
            fetchProfileData();
        }
    }, [customerId]);

    useEffect(() => {
        if (profile) {
            setFormData({
                customerId: profile.customerId,
                customerName: profile.customerName,
                customerEmail: profile.customerEmail,
                customerPassword: profile.customerPassword, // Make sure to include the password here
            });
        }
    }, [profile]);

    const fetchProfileData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/customers/${customerId}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setProfile(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching profile data:', error);
            setError('Error fetching profile data. Please try again later.');
            setLoading(false);
        }
    };

    const handleEditProfile = () => {
        setEditMode(!editMode);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/customers/${customerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setProfile(data);
            setEditMode(false);
        } catch (error) {
            console.error('Error updating profile data:', error.message);
            setError('Error updating profile data. Please try again later.');
        }
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setFormData({
            customerName: profile.customerName,
            customerEmail: profile.customerEmail,
            customerPassword: profile.customerPassword, // Reset the password field as well
        });
    };

    return (
        <div className="profile-section">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : profile ? (
                <>
                    <div className="profile-info">
                        <h2>Personal Information</h2>
                        {editMode ? (
                            <form onSubmit={handleSubmit}>
                                <div className="info-item">
                                    <h3>Name</h3>
                                    <input
                                        type="text"
                                        name="customerName"
                                        value={formData.customerName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="info-item">
                                    <h3>Email</h3>
                                    <input
                                        type="email"
                                        name="customerEmail"
                                        value={formData.customerEmail}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="info-item">
                                    <h3>Password</h3>
                                    <input
                                        type="password"
                                        name="customerPassword"
                                        value={formData.customerPassword}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-buttons">
                                    <button type="submit" className="save-btn">Save</button>
                                    <button type="button" className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <div className="info-item">
                                    <h3>Name</h3>
                                    <p>{profile.customerName}</p>
                                </div>
                                <div className="info-item">
                                    <h3>Email</h3>
                                    <p>{profile.customerEmail}</p>
                                </div>
                                <div className="info-item">
                                    <h3>Password</h3>
                                    <p>••••••••</p> {/* Mask the password */}
                                </div>
                                <button className="edit-profile-btn" onClick={handleEditProfile}>Edit Profile</button>
                            </>
                        )}
                    </div>
                </>
            ) : (
                <p>No profile data available</p>
            )}
        </div>
    );
};

export default ProfileSection;
