/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'react-bootstrap/Image';
import Link from 'next/link';
import gravatar from 'gravatar';
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
    await deleteGroupMember(memberID.id);
    await fetchData();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h6 style={{ marginRight: '11.5rem' }}>Members:</h6>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Link key={groupDetails?.uuid?.id} href={`/profile/${groupDetails?.uuid?.id}`} passHref>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', backgroundColor: '#252323' }}>
            <Image src={gravatar.url(groupDetails?.uuid?.email_address, { s: '50', d: 'wavatar', r: 'pg' })} rounded />
            <span style={{ minWidth: '13rem' }}>{groupDetails?.uuid?.username}</span>
          </div>
        </Link>
        {members.map((member) => (
          <Link href={`/profile/${member.user.id}`} passHref>
            <div key={member.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', backgroundColor: '#252323' }}>
              <Image src={gravatar.url(member?.user?.email_address, { s: '50', d: 'wavatar', r: 'pg' })} rounded />
              <span style={{ minWidth: '13rem' }}>{member.user.username}</span>
              {userData?.id === groupDetails?.uuid?.id && (
                <span style={{ cursor: 'pointer', marginLeft: '8px' }} onClick={() => handleRemoveMember(member)}>
                  🗑️
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
