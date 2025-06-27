import { useContext } from 'react';
import AuthContext from './AuthContext'; // Ensure the correct import path

const useAuth = () => useContext(AuthContext);

export default useAuth;
