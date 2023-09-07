import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RootRedirect = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return null;
};

export default RootRedirect;