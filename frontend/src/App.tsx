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
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/activities" element={<Layout><Activities /></Layout>} />
        <Route path="/teachers" element={<Layout><Teachers /></Layout>} />
        <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
        <Route path="/registration" element={<Layout><Registration /></Layout>} />
        <Route path="/careers" element={<Layout><Careers /></Layout>} />
        <Route path="/faq" element={<Layout><Faq /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/news" element={<Layout><News /></Layout>} />
        
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
