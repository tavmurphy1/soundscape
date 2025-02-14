/* 
 * Author: Tavner Murphy
 * Date: 2/10/2024
 * React Starter App - Bootstrapped with Create React App
 * 
 * Source: Facebook, Inc. (2024). React Starter App. Retrieved from https://react.dev
 * 
 * This project was initialized using Create React App.
 * See documentation at https://create-react-app.dev
*/

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import './ProfilePage.css';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editingField, setEditingField] = useState('');
  const [tempValue, setTempValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = sessionStorage.getItem('demoUser');
    if (!storedData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedData));
    }
  }, [navigate]);

  if (!user) return null;

  function handleEdit(fieldName) {
    setEditingField(fieldName);
    setTempValue(user[fieldName] || '');
  }

  function handleSave(fieldName) {
    const updatedUser = { ...user, [fieldName]: tempValue };
    sessionStorage.setItem('demoUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditingField('');
    setTempValue('');
  }

  function handleCancel() {
    setEditingField('');
    setTempValue('');
  }

  return (
    <div className="profile-container">
      <NavBar/>
      <div className="profile-content">
        <h1 className="profile-title">Your Profile</h1>

        <ProfileRow
          label="Name"
          value={user.name}
          fieldName="name"
          editingField={editingField}
          tempValue={tempValue}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          setTempValue={setTempValue}
        />

        <ProfileRow
          label="Home City"
          value={user.homeCity}
          fieldName="homeCity"
          editingField={editingField}
          tempValue={tempValue}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          setTempValue={setTempValue}
        />

        <ProfileRow
          label="Email"
          value={user.email}
          fieldName="email"
          editingField={editingField}
          tempValue={tempValue}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          setTempValue={setTempValue}
        />
      </div>
    </div>
  );
}

function ProfileRow({
  label,
  value,
  fieldName,
  editingField,
  tempValue,
  onEdit,
  onSave,
  onCancel,
  setTempValue
}) {
  const isEditing = editingField === fieldName;

  return (
    <div className="profile-row">
      <span className="profile-label">{label}</span>
      {isEditing ? (
        <>
          <input
            className="profile-input"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
          />
          <button className="profile-save" onClick={() => onSave(fieldName)}>
            Save
          </button>
          <button className="profile-cancel" onClick={onCancel}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <span className="profile-value">{value}</span>
          <button className="profile-edit-btn" onClick={() => onEdit(fieldName)}>
            ✏️
          </button>
        </>
      )}
    </div>
  );
}

export default ProfilePage;