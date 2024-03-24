import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import AxiosInterceptor from '../axiosConfig.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AxiosInterceptor />
    <App />
  </BrowserRouter>,
);
