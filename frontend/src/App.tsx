import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import { ProfileProvider } from './context/ProfileContext';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllSkills from './pages/AllSkills';
import Inbox from './pages/Inbox';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AdminProvider>
      <ProfileProvider>
        <BrowserRouter>
          <Background />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/skills" element={<AllSkills />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </ProfileProvider>
    </AdminProvider>
  );
}

export default App;
