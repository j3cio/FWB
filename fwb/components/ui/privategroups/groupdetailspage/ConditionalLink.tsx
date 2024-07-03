'use client'

// components/ConditionalLink.js
import { useRouter, usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';


interface ConditionalLinkProps {
    targetPage: any;
    children: ReactNode;
}

const ConditionalLink = ({ targetPage, children }: ConditionalLinkProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname === '/profile') {
      router.push(targetPage);
      
      
    }
  };
  
  

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  );
};


export default ConditionalLink;
