import '../components/Style.css';
import { logout } from '../Login';

const handleLogout = (event) => {
  event.preventDefault(); // Prevents default link behavior
  logout();
};

const Home = ({ user }) => {
  return (
    <div className="wrapper">
      <div className="card-container">
        <div className="text-center">
          <h2 className="text-white mb-4">Welcome {user}</h2>
          <p className="text-white lead mb-3">We're happy to have you here!</p>
          <a
            href="#"
            onClick={handleLogout}
            className="text-danger"
            role="button"
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
