import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminProvider } from './context/AdminContext';
import Background from './components/Background';
import Navbar from './components/Navbar';
import PreviewBanner from './components/PreviewBanner';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllSkills from './pages/AllSkills';
import AllProjects from './pages/AllProjects';
import ProjectDetail from './pages/ProjectDetail';
import Inbox from './pages/Inbox';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <BrowserRouter>
          <Background />
          <Navbar />
          <PreviewBanner />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/skills" element={<AllSkills />} />
              <Route path="/projects" element={<AllProjects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </AdminProvider>
    </QueryClientProvider>
  );
}

export default App;
