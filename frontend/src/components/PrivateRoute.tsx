import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // بررسی اینکه کاربر مدیر است
  if (userStr) {
    const user = JSON.parse(userStr);
    if (!user.is_admin) {
      return <Navigate to="/admin/login" replace />;
    }
  }

  return <>{children}</>;
};

export default PrivateRoute;
