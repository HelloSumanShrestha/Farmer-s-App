import React, { useState, useEffect } from 'react';
import useStore from "../zustand/userInfo";
import { FaUserCircle } from "react-icons/fa";
import "../assets/css/profile.css";

export default function Profile() {
    const { sellerId } = useStore();
    const [userData, setUserData] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8000/sellers/${sellerId}`)
            .then(res => res.json())
            .then(data => setUserData(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, [sellerId]);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleUpdatePassword = () => {
        fetch(`http://localhost:8000/sellers/${sellerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sellerId: sellerId,
                sellerName: userData.sellerName,
                sellerEmail: userData.sellerEmail,
                sellerPassword: newPassword,
            }),
        })
            .then(res => res.json())
            .then(data => {
                setUserData(data);
                setNewPassword("");
                setEditMode(false);
            })
            .catch(error => console.error('Error updating password:', error));
    };

    return (
        <div className='profile'>
            <h1>Personal Information</h1>

            <FaUserCircle style={{ width: "150px", height: "150px" }} />
            <table>
                <tbody>
                    <tr>
                        <td>Seller ID</td>
                        <td>{userData.sellerId}</td>
                    </tr>
                    <tr>
                        <td>Seller Name</td>
                        <td>{userData.sellerName}</td>
                    </tr>
                    <tr>
                        <td>Seller Email</td>
                        <td>{userData.sellerEmail}</td>
                    </tr>
                    {editMode && (
                        <tr>
                            <td>New Password</td>
                            <td>
                                <input
                                    type="text"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {!editMode && (
                <button onClick={handleEditClick}>Edit Password</button>
            )}
            {editMode && (
                <button onClick={handleUpdatePassword}>Update Password</button>
            )}
        </div>
    );
}
