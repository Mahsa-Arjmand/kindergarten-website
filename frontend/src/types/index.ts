export interface Service {
  id: number;
  title: string;
  description: string;
  image_path: string | null;
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  image_path: string | null;
  age_group: string;
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Teacher {
  id: number;
  name: string;
  position: string;
  education: string;
  specialization: string;
  experience: string | null;
  bio: string | null;
  image_path: string | null;
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Gallery {
  id: number;
  image_path: string;
  category: 'classroom' | 'playground' | 'activities' | 'events' | 'food';
  caption: string;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface News {
  id: number;
  title: string;
  content: string;
  image_path: string | null;
  publish_date: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Registration {
  id: number;
  registration_id: string;
  child_first_name: string;
  child_last_name: string;
  child_birth_date: string;
  child_gender: 'male' | 'female';
  age_group: string;
  child_notes: string | null;
  parent_first_name: string;
  parent_last_name: string;
  parent_relation: string;
  phone: string;
  phone_secondary: string | null;
  email: string | null;
  preferred_program: string;
  preferred_time: string | null;
  notes: string | null;
  status: 'new' | 'reviewing' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  age: number;
  education: string;
  field_of_study: string;
  work_experience: string | null;
  skills: string | null;
  notes: string | null;
  cv_path: string | null;
  status: 'new' | 'reviewing' | 'interview' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  registrations: {
    total: number;
    new: number;
    reviewing: number;
    approved: number;
    rejected: number;
  };
  job_applications: {
    total: number;
    new: number;
    reviewing: number;
    interview: number;
    accepted: number;
    rejected: number;
  };
  contact_messages: {
    total: number;
    unread: number;
  };
  teachers: number;
  services: number;
  activities: number;
  gallery: number;
}
