import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Reservation from './pages/Reservation';
import Contact from './pages/Contact';
import ClientSpace from './pages/ClientSpace';
import Admin from './pages/Admin';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="reservation" element={<Reservation />} />
          <Route path="contact" element={<Contact />} />
          <Route path="client" element={<ClientSpace />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
