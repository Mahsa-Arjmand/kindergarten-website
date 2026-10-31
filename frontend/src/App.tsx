import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Activities = lazy(() => import('./pages/Activities'));
const Teachers = lazy(() => import('./pages/Teachers'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Registration = lazy(() => import('./pages/Registration'));
const Careers = lazy(() => import('./pages/Careers'));
const Faq = lazy(() => import('./pages/Faq'));
const Contact = lazy(() => import('./pages/Contact'));
const News = lazy(() => import('./pages/News'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
import AdminLayout from './components/admin/AdminLayout';
const AdminRegistrations = lazy(() => import('./pages/admin/AdminRegistrations'));
const AdminJobApplications = lazy(() => import('./pages/admin/AdminJobApplications'));
const AdminTeachers = lazy(() => import('./pages/admin/AdminTeachers'));
const AdminChildren = lazy(() => import('./pages/admin/AdminChildren'));
const AdminServices = lazy(() => import('./pages/admin/AdminServices'));
const AdminActivities = lazy(() => import('./pages/admin/AdminActivities'));
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery'));
const AdminNews = lazy(() => import('./pages/admin/AdminNews'));
const AdminFaqs = lazy(() => import('./pages/admin/AdminFaqs'));
const AdminContactMessages = lazy(() => import('./pages/admin/AdminContactMessages'));
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex min-h-[40vh] items-center justify-center bg-white text-sm text-muted" role="status">
            در حال بارگذاری صفحه…
          </div>
        }
      >
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
          <Route path="contact-messages" element={<AdminContactMessages />} />
          <Route path="teachers" element={<AdminTeachers />} />
          <Route path="children" element={<AdminChildren />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="activities" element={<AdminActivities />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="faqs" element={<AdminFaqs />} />
        </Route>
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
