// Types for student
export interface Student {
  id: string;
  name: string;
  email: string;
}

// Types for course
export interface Course {
  id: string;
  name: string;
  title: string;
  description: string;
}

// Types for registration
export interface Registration {
  id: string;
  student_id: string;
  course_id: string;
  created_at: string;
  updated_at: string;
}
