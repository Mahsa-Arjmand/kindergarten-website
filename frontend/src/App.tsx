import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Activities from './pages/Activities';
import Teachers from './pages/Teachers';
import Gallery from './pages/Gallery';
import Registration from './pages/Registration';
import Careers from './pages/Careers';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import News from './pages/News';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from './components/admin/AdminLayout';
import AdminRegistrations from './pages/admin/AdminRegistrations';
import AdminJobApplications from './pages/admin/AdminJobApplications';
import AdminTeachers from './pages/admin/AdminTeachers';
import AdminServices from './pages/admin/AdminServices';
import AdminActivities from './pages/admin/AdminActivities';
import AdminGallery from './pages/admin/AdminGallery';
import AdminNews from './pages/admin/AdminNews';
import AdminFaqs from './pages/admin/AdminFaqs';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="activities" element={<Activities />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="registration" element={<Registration />} />
          <Route path="careers" element={<Careers />} />
          <Route path="faq" element={<Faq />} />
          <Route path="contact" element={<Contact />} />
          <Route path="news" element={<News />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="registrations" element={<AdminRegistrations />} />
          <Route path="job-applications" element={<AdminJobApplications />} />
          <Route path="teachers" element={<AdminTeachers />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="activities" element={<AdminActivities />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="faqs" element={<AdminFaqs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
