/* eslint-disable object-curly-newline */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../utils/context/authContext';
// eslint-disable-next-line object-curly-newline
import { getSingleGroup, createGroupMember, getUserInGroup, updateGroup, deleteGroup, deleteGroupMember } from '../utils/data/groupData';
import { getUserFromFBKey } from '../utils/data/userData';
import MembersCard from './MembersCard';

function GroupDetailCard() {
  const [groupDetails, setGroupDetails] = useState([]);
  const [userData, setUserData] = useState({});
  const [usersInGroup, setUsersInGroup] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const groupCreatedDate = groupDetails.timestamp ? new Date(groupDetails.timestamp) : null;
  const formattedDate = groupCreatedDate ? formatDistanceToNow(groupCreatedDate) : '';

  useEffect(() => {
    getSingleGroup(id).then(setGroupDetails);
    getUserFromFBKey(user.uid).then(setUserData);
    getUserInGroup(id).then(setUsersInGroup);
  }, [id, user.uid]);

  // eslint-disable-next-line no-shadow
  const joinGroup = (post, user) => {
    if (groupDetails.needed_players > usersInGroup.length) {
      createGroupMember({ post, user });
      window.location.reload();
    } else {
      window.alert('The group is full! Try later!');
    }
  };

  const handleRemoveMember = () => {
    const userInGroup = usersInGroup.find((userr) => userr?.user?.id === userData?.id);
    console.warn(userInGroup);
    if (userInGroup) {
      deleteGroupMember(userInGroup.id);
      window.location.reload();
    }

    console.warn(userInGroup);
  };

  const closeGroup = () => {
    updateGroup({ ...groupDetails, status: false, id, game: groupDetails.game.id, uuid: groupDetails.uuid.id });
    getSingleGroup(id).then(setGroupDetails);
  };

  const openThisGroup = () => {
    updateGroup({ status: true, id, game: groupDetails.game.id });
    getSingleGroup(id).then(setGroupDetails);
  };

  const deleteThisGroup = () => {
    deleteGroup(id);
    router.push('/');
  };

  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '5rem' }}>
        <p>Created By: {groupDetails?.uuid?.username}</p>
        <p>{groupDetails.title}</p>
        <p>Game: {groupDetails?.game?.name}</p>
        <p>Platform: {groupDetails?.platform}</p>
        <p>Region: {groupDetails?.region}</p>
        <p>Skill Level: {groupDetails?.skill_level}</p>
        <p>Needed Players: {groupDetails?.needed_players}</p>
        <p>Date Created: {formattedDate} ago</p>
        <p>{groupDetails.mic_needed ? 'Mic Needed' : 'Mic Not Needed'}</p>
        {userData?.id === groupDetails.uuid?.id ? (
          <>
            <p>You are the creator of this group</p>
            {groupDetails.status ? (
              <>
                <Button variant="danger" onClick={() => closeGroup()}>
                  Close Group
                </Button>
                <Button variant="danger" style={{ marginLeft: '5px' }} onClick={deleteThisGroup}>
                  Delete Group
                </Button>
                <Button variant="primary" style={{ marginLeft: '5px' }} onClick={() => router.push(`/group/edit/${id}`)}>
                  Update Group
                </Button>
              </>
            ) : (
              <>
                <p>The Group is Closed, Nobody Can Join</p>
                <Button variant="danger" style={{ marginLeft: '5px' }} onClick={openThisGroup}>
                  Open Group
                </Button>
                <Button variant="danger" style={{ marginLeft: '5px' }} onClick={deleteThisGroup}>
                  Delete Group
                </Button>
              </>
            )}
          </>
        ) : usersInGroup.some((userInGroup) => userInGroup?.user?.id === userData?.id) ? (
          <>
            <p>You are already in the group</p>
            <Button variant="primary" onClick={() => handleRemoveMember()}>
              Leave Group
            </Button>
          </>
        ) : groupDetails?.status ? (
          <Button variant="primary" onClick={() => joinGroup(groupDetails.id, user.id)}>
            Join Group
          </Button>
        ) : (
          <p>The Group is Closed, Nobody Can Join</p>
        )}
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        {usersInGroup.length === 0 ? (
          <p>No Users In Group</p>
        ) : (
          <div>
            <MembersCard />
          </div>
        )}
      </div>
    </>
  );
}

export default GroupDetailCard;
