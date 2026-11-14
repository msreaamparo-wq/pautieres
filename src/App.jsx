import Dashboard from './components/Dashboard.jsx';
import { CONFIG } from './config.js';

export default function App() {
  return <Dashboard accessKey={CONFIG.accessKey} />;
}
