'use client';

import { useEffect } from 'react';

export default function PersonalDeskPage() {
  useEffect(() => {
    window.location.replace('/personal-desk.html');
  }, []);

  return null;
}