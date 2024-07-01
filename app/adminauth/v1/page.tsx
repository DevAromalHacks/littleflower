"use client";

import React, { useState } from 'react';
import AdminPanel from '../../components/admincontents/admin/Main';
import AdminAuth from '../v0/oauth/AdminOauth';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you have the CSS imported for toast notifications

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const supabase = createClientComponentClient();

  const handleAuth = async (
    event: React.FormEvent<HTMLFormElement>,
    adminName: string,
    secretKey: string
  ) => {
    event.preventDefault();

    // Fetch the admin data from Supabase
    const { data, error } = await supabase
      .from('Admin')
      .select('secret_key')
      .eq('admin_name', adminName);

    if (error) {
      toast.error('An error occurred');
      return;
    }

    if (data && data.length > 0 && data[0].secret_key === secretKey) {
      console.log('Success');
      localStorage.setItem('secretKey', secretKey); // Store the secret key in local storage
      setIsAuthenticated(true);
      toast.success('Successfully authenticated');
    } else {
      toast.error('Incorrect Name or Secret Key or you do not belong to admin');
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <AdminAuth handleAuth={handleAuth} />
      ) : (
        <AdminPanel />
      )}
    </div>
  );
}
