import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import EditProfileForm from '../components/Forms/EditProfileForm';
import { getUserFromFBKey } from '../utils/data/userData';

export default function EditProfile() {
  const [userData, setUserData] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    getUserFromFBKey(user.uid).then(setUserData);
  }, [user.uid]);

  return <EditProfileForm obj={userData} />;
}
