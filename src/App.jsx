import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import EventRegistrationPage from '@/pages/EventRegistrationPage';

// Simple ScrollToTop logic for router
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/event-registration" replace />} />
        <Route path="/event-registration" element={<EventRegistrationPage />} />
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/event-registration" replace />} />
      </Routes>
      <Toaster position="bottom-right" richColors />
    </BrowserRouter>
  );
}

export default App;