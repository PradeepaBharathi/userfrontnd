import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';  // Import useDispatch
import { editUser } from '../../redux/getUserSlice'; 
import './edit.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Edit() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();  

  const user = location.state?.user;
  
  const [username, setUsername] = useState(user?.username || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [profession, setProfession] = useState(user?.profession || "");

  const handleEdit = (e) => {
    e.preventDefault();
    

    const formData = {
      username,
      phone,
      profession
    };
    

    dispatch(editUser({ userId: user._id, formData }))
      .then(() => {
     
        navigate('/usersList');
        alert(` user ${formData.username} edited`)
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  useEffect(() => {
    if (!user) {
      navigate('/users'); 
    }
  }, [user, navigate]);

  return (
    <div>
        <ToastContainer/>
      <form className="edit-form" onSubmit={handleEdit}>
        <input
          className="form-control login-input"
          type="text"
          value={username}
          placeholder="Name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-control login-input"
          type="number"
          value={phone}
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          className="form-control login-input"
          type="text"
          value={profession}
          placeholder="Profession"
          onChange={(e) => setProfession(e.target.value)}
        />
        <button className="login-button" type="submit">
          Edit
        </button>
      </form>
    </div>
  );
}

export default Edit;
