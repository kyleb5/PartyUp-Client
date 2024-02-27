import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import getSingleGroup from '../utils/data/groupData';

function GroupDetailCard() {
  const [groupDetails, setGroupDetails] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleGroup(id).then(setGroupDetails);
  }, [id]);

  console.warn(groupDetails);

  return <div>GroupDetailCard</div>;
}

export default GroupDetailCard;
