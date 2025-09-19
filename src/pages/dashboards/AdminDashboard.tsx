
import { useAuth } from '../../context/auth.context';

const AdminDashboard = () => {

    const { loggedInUser } = useAuth();

  return (
    <div>{loggedInUser?.name}</div>
  )
}

export default AdminDashboard