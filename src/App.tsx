import 'antd/dist/antd.css';
import '@/App.css';
import LandingLayout from './layouts/LandingLayout';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/router';

const App = () => {
  return (
    <BrowserRouter>
        <Router />
    </BrowserRouter>
  )
};

export default App;