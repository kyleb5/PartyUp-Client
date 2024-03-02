/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../utils/context/authContext';
// eslint-disable-next-line object-curly-newline
import { getSingleGroup, createGroupMember, getUserInGroup, updateGroup } from '../utils/data/groupData';
import getUserFromFBKey from '../utils/data/userData';

function GroupDetailCard() {
  const [groupDetails, setGroupDetails] = useState([]);
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

  const closeGroup = () => {
    updateGroup({ status: false, id });
    window.location.reload();
  };

  console.warn(usersInGroup);
  console.warn(userData);
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
          {groupDetails.status ? (
            <Button variant="danger" onClick={() => closeGroup()}>
              Close Group
            </Button>
          ) : (
            <p>The Group is Closed, Nobody Can Join</p>
          )}
        </>
      ) : usersInGroup.some((userInGroup) => userInGroup?.user === userData?.id) ? (
        <p>You are already in the group</p>
      ) : groupDetails.status ? (
        <Button variant="primary" onClick={() => joinGroup(groupDetails.id, user.id)}>
          Join Group
        </Button>
      ) : (
        <p>The Group is Closed, Nobody Can Join</p>
      )}
    </div>
  );
}

export default GroupDetailCard;