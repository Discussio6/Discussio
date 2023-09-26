"use client";

import React from 'react';
import Logo from './common/Logo';
import ProfileBtn from './common/ProfileBtn';
import { Button } from './ui/button';

function TopNavbar() {
  return (
    <div className="bg-green h-[60px] flex items-center justify-between px-4 relative">
      <Logo />
      <div className="flex gap-4 items-center">
        <Button variant="primary">업로드</Button>
        <ProfileBtn />
      </div>
    </div>
  )
}

export default TopNavbar