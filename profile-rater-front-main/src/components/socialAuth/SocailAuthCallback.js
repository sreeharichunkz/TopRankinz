import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import userApi from '../../api/user/account/userAccountApi';
import Cookies from 'js-cookie';

const SocialAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      // Store the token in localStorage or a cookie
      Cookies.set('access_token', token, { expires: 7 });

      // Optionally, fetch user details with the token and store them
      userApi.getUser()
      .then(response => {
        // Store user data in state or context
        // Example: setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

      // Redirect to a protected route or home page
      navigate('/');
    } else {
      // Handle the case where the token is not provided or is invalid
      navigate('/login');
    }
  }, [location,navigate]);

  return <div>Loading...</div>;
};

export default SocialAuthCallback;
