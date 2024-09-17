import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteUser, fetchUsers } from '../../redux/getUserSlice';
import './users.css'
function Userspage() {
  const users = useSelector((state) => state.getUser.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const editUserFunction = (user) => {
    console.log('Edit clicked for user:', user);
    navigate(`/edit/${user._id}`, { state: { user } });
  };

  const deleteFunction = (id)=>{
    dispatch(DeleteUser({ userId: id }))
      .then(() => {
     
        navigate('/usersList');
        alert(` user deleted`)
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  }
   return (
    <div className="users-card" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
     
       { Array.isArray(users) && users.map((val) => {
          return (
            <div className="card" style={{ width: '18rem' }} key={val._id}>
              <div className="card-body">
                <h5 className="card-title">{val.username}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{val.email}</h6>
                <p className="card-text">Phone: {val.phone}</p>
                <p className="card-text">Profession: {val.profession}</p>
                <div className="btn-list">
                  <button className="btn btn-primary" onClick={() => editUserFunction(val)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => deleteFunction(val._id)}>Delete</button>
                </div>
              </div>
            </div>
          );
        })}
     
    </div>
  );
}

export default Userspage;
