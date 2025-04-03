
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Customize() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect back to the dashboard since customization is now handled
    // via the slide-out panel in the DashboardLayout
    navigate('/');
  }, [navigate]);
  
  // This component shouldn't render anything as we're redirecting
  return null;
}
