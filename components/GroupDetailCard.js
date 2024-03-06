/* eslint-disable object-curly-newline */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useCallback } from 'react';
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

  const fetchData = useCallback(async () => {
    await getSingleGroup(id).then(setGroupDetails);
    await getUserFromFBKey(user.fbKey).then(setUserData);
    await getUserInGroup(id).then(setUsersInGroup);
  }, [id, user.fbKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // eslint-disable-next-line no-shadow
  const joinGroup = async (post, user) => {
    if (groupDetails.needed_players > usersInGroup.length) {
      await createGroupMember({ post, user });
      await fetchData();
    } else {
      window.alert('The group is full! Try later!');
    }
  };

  const handleRemoveMember = async () => {
    const userInGroup = usersInGroup.find((userr) => userr?.user?.id === userData?.id);
    if (userInGroup) {
      await deleteGroupMember(userInGroup.id);
      await fetchData();
    }
  };

  const closeGroup = async () => {
    await updateGroup({ ...groupDetails, status: false, id, game: groupDetails.game.id, uuid: groupDetails.uuid.id });
    await fetchData();
  };

  const openThisGroup = async () => {
    await updateGroup({ status: true, id, game: groupDetails.game.id });
    await fetchData();
  };

  const deleteThisGroup = () => {
    deleteGroup(id);
    router.push('/');
  };

  return (
    <>
      <title>Exploring Groups</title>
      <div style={{ textAlign: 'center', marginTop: '5rem' }}>
        <p>Created By: {groupDetails?.uuid?.username}</p>
        <h4>{groupDetails.title}</h4>
        <p>Game: {groupDetails?.game?.name}</p>
        <p>Platform: {groupDetails?.platform}</p>
        <p>Region: {groupDetails?.region}</p>
        <p>Skill Level: {groupDetails?.skill_level}</p>
        <p>Needed Players: {groupDetails?.needed_players}</p>
        <p>{groupDetails.mic_needed ? 'Mic Needed' : 'Mic Not Needed'}</p>
        <p>Date Created: {formattedDate} ago</p>
        {user?.id === groupDetails.uuid?.id ? (
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
        ) : usersInGroup.some((userInGroup) => userInGroup.user.id === user?.id) ? (
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
          <div key={usersInGroup.length}>
            <MembersCard />
          </div>
        )}
      </div>
    </>
  );
}

export default GroupDetailCard;
