/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { getUserInGroup, getSingleGroup, deleteGroupMember } from '../utils/data/groupData';
import { useAuth } from '../utils/context/authContext';
import { getUserFromFBKey } from '../utils/data/userData';

export default function MembersCard() {
  const [groupDetails, setGroupDetails] = useState([]);
  const [members, setMembers] = useState([]);
  const [userData, setUserData] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const fetchData = useCallback(async () => {
    await getSingleGroup(id).then(setGroupDetails);
    await getUserInGroup(id).then(setMembers);
    await getUserFromFBKey(user.fbKey).then(setUserData);
  }, [id, user.fbKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRemoveMember = async (memberID) => {
    deleteGroupMember(memberID.id);
    await fetchData();
  };

  return (
    <div style={{ textAlign: 'center', listStylePosition: 'inside' }}>
      <h6>Members:</h6>
      <ul>
        <li>Creator: {groupDetails?.uuid?.username}</li>
        {members.map((member) => (
          <li key={member.id}>
            {member.user.username}
            {userData?.id === groupDetails?.uuid?.id && (
              <span style={{ cursor: 'pointer' }} onClick={() => handleRemoveMember(member)}>
                🗑️
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
