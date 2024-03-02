import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserInGroup } from '../utils/data/groupData';

export default function MembersCard() {
  const [members, setMembers] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  console.warn(members);

  useEffect(() => {
    getUserInGroup(id).then(setMembers);
  }, [id]);
  return <div>MembersCard</div>;
}
