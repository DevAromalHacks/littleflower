import { useEffect, useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from 'react-toastify';

// Create a Supabase client
const supabase = createClientComponentClient();

// Define TypeScript interfaces for User and Notification
interface User {
  email: string;
  div: string;
  className: string;
}

interface Notification {
  id: string;
  msg: string;
  div?: string;
  class?: string;
  created_at: string;
  title: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');

    if (!email) {
      toast.error('Email not found in local storage');
      return;
    }

    const fetchData = async () => {
      const user = await fetchUserData(email);

      if (user) {
        const [notificationsFromDb1, notificationsFromDb2] = await Promise.all([
          fetchNotificationsFromDb1(user.div, user.className),
          fetchNotificationsFromDb2()
        ]);

        const mergedNotifications = [
          ...notificationsFromDb1,
          ...notificationsFromDb2
        ];

        setNotifications(mergedNotifications);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="p-6 rounded-lg shadow-lg">
    <div className="mb-6">
      <h2 className="text-4xl font-bold text-gray-200 mb-4">Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} className="mb-4">
            <div className="p-6 border-l-4 border-green-500 bg-gray-50 rounded-md shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{notification.title}</h3>
              <p className="text-gray-700 mb-4">{notification.msg}</p>
              <small className="text-gray-500">{new Date(notification.created_at).toLocaleString()}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
  

  );
}

// Helper functions

const fetchUserData = async (email: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('email, div, className')
      .eq('email', email)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    toast.error('Error fetching user data');
    return null;
  }
};

const fetchNotificationsFromDb1 = async (div: string, className: string): Promise<Notification[]> => {
  try {
    const { data, error } = await supabase
      .from('notification')
      .select('id, msg, created_at, title')
      .eq('div', div)
      .eq('class', className);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching notifications from notification DB:', error);
    toast.error('Error fetching notifications from notification DB');
    return [];
  }
};

const fetchNotificationsFromDb2 = async (): Promise<Notification[]> => {
  try {
    const { data, error } = await supabase
      .from('public')
      .select('id, msg, created_at, title');

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching notifications from public DB:', error);
    toast.error('Error fetching notifications from public DB');
    return [];
  }
};
