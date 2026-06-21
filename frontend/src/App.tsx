import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Background />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;
