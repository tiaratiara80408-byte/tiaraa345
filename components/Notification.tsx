import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string | null;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
        setVisible(false);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full bg-green-500/90 backdrop-blur-sm text-white font-semibold shadow-lg transition-all duration-300 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
