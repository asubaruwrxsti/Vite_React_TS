import { useNavigate } from 'react-router-dom';
import { useAlert } from './useAlert';
import { AlertType } from '@/lib/utils/AlertContextUtils';
import { getPocketBase } from '@/lib/pocketbase';

export const useLogout = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleLogout = () => {
    getPocketBase().authStore.clear();
    showAlert('Logout Successful', 'You have successfully logged out!', { type: AlertType.Success });
    navigate('/');
  };

  return handleLogout;
};