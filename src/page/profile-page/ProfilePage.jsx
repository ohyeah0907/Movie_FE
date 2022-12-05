import React, { useEffect } from 'react';
import { getUserDetail } from '../../service/profile-page/ProfilePageService';

export const ProfilePage = () => {
  const controller = new AbortController();

  useEffect(() => {
    getUserDetail(controller.signal);
    return () => controller.abort();
  }, []);

  return <div>ProfilePage</div>;
};
