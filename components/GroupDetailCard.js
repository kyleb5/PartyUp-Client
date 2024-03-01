/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../utils/context/authContext';
import { getSingleGroup, createGroupMember, getUserInGroup } from '../utils/data/groupData';
import getUserFromFBKey from '../utils/data/userData';

function GroupDetailCard() {
  const [groupDetails, setGroupDetails] = useState({});
  const [userData, setUserData] = useState({});
  const [usersInGroup, setUsersInGroup] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleGroup(id).then(setGroupDetails);
    getUserFromFBKey(user.uid).then(setUserData);
    getUserInGroup(id).then(setUsersInGroup);
  }, [id, user.uid]);

  // eslint-disable-next-line no-shadow
  const joinGroup = (post, user) => {
    createGroupMember({ post, user });
    window.location.reload();
  };

  console.warn(usersInGroup);
  return (
    <div>
      <p>Created By: {groupDetails?.uuid?.username}</p>
      <p>{groupDetails.title}</p>
      <p>Game: {groupDetails?.game?.name}</p>
      <p>Platform: {groupDetails?.platform}</p>
      <p>Region: {groupDetails?.region}</p>
      <p>Skill Level: {groupDetails?.skill_level}</p>
      {userData?.id === groupDetails.uuid?.id ? (
        <>
          <p>You are the creator of this group</p>
          <Button variant="danger">Close Group</Button>
        </>
      ) : usersInGroup.find((userInGroup) => userInGroup.post.id === user.id) ? (
        <p>You are already in the group!</p>
      ) : (
        <Button variant="danger" onClick={() => joinGroup(groupDetails.id, user.id)}>
          Join Group
        </Button>
      )}
    </div>
  );
}

export default GroupDetailCard;
