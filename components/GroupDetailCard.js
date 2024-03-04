/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../utils/context/authContext';
// eslint-disable-next-line object-curly-newline
import { getSingleGroup, createGroupMember, getUserInGroup, updateGroup, deleteGroup } from '../utils/data/groupData';
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
    createGroupMember({ post, user });
    window.location.reload();
  };

  const closeGroup = () => {
    updateGroup({ status: false, id });
    window.location.reload();
  };

  const openThisGroup = () => {
    updateGroup({ status: true, id });
    window.location.reload();
  };

  const deleteThisGroup = () => {
    deleteGroup(id);
    router.push('/');
  };

  return (
    <>
      <div>
        <p>Created By: {groupDetails?.uuid?.username}</p>
        <p>{groupDetails.title}</p>
        <p>Game: {groupDetails?.game?.name}</p>
        <p>Platform: {groupDetails?.platform}</p>
        <p>Region: {groupDetails?.region}</p>
        <p>Skill Level: {groupDetails?.skill_level}</p>
        <p>Needed Players: {groupDetails?.needed_players}</p>
        <p>Date Created: {formattedDate} ago</p>
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
          <p>You are already in the group</p>
        ) : groupDetails.status ? (
          <Button variant="primary" onClick={() => joinGroup(groupDetails.id, user.id)}>
            Join Group
          </Button>
        ) : (
          <p>The Group is Closed, Nobody Can Join</p>
        )}
      </div>
      {usersInGroup.length === 0 ? (
        <p>No Users In Group</p>
      ) : (
        <div>
          <MembersCard />
        </div>
      )}
    </>
  );
}

export default GroupDetailCard;
