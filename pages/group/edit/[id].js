import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleGroup } from '../../../utils/data/groupData';
import CreateGroupForm from '../../../components/Forms/CreateGroupForm';

export default function EditGroup() {
  const [editGroup, setEditGroup] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleGroup(id).then(setEditGroup);
  }, [id]);

  return <CreateGroupForm obj={editGroup} />;
}
