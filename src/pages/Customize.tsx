
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Customize() {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Instead of redirecting to the dashboard,
    // we'll redirect back to the previous page (where the user came from)
    const currentPath = location.pathname;
    
    // If we're already on the customize page, go back to the previous page
    // or dashboard as fallback
    if (currentPath === '/customize') {
      // Try to go back in history, or navigate to dashboard if that fails
      navigate(-1);
    }
  }, [navigate, location]);
  
  // This component shouldn't render anything as we're redirecting
  return null;
}
