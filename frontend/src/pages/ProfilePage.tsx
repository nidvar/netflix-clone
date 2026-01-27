import { useEffect, useState } from "react";

import { fetchRequest, readableDate } from "../utils/functions";

function ProfilePage() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [created_at, setCreated_at] = useState('');

  const grabUser = async () => {
    const data = await fetchRequest('/auth/profile');
    setUsername(data.user.username);
    setEmail(data.user.email);
    setCreated_at(data.user.created_at);
  } 

  useEffect(()=>{
    grabUser();
  }, [])

  return (
    <div className="hero-bg">
      <div className="main">
        <div className="sign-up-container">
          <h1  className="font-bold text-xl">Profile Details</h1>
          {
            username === '' ?
            <p>Loading...</p>
            : 
            <>
              <p><span className="font-bold">Username:</span> {username}</p>
              <p><span className="font-bold">Email:</span> {email}</p>
              <p><span className="font-bold">Account Creation Date:</span> {readableDate(created_at)}</p>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default ProfilePage;