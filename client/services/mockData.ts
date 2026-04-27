export const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@erp.com',
    password: 'admin123',
    role: 'admin',
    department: 'Administration',
  },
  {
    id: '2',
    name: 'John Teacher',
    email: 'teacher@erp.com',
    password: 'teacher123',
    role: 'teacher',
    department: 'Mathematics',
    subject: 'Mathematics',
  },
  {
    id: '3',
    name: 'Jane Student',
    email: 'student@erp.com',
    password: 'student123',
    role: 'student',
    department: 'Grade 10',
    rollNumber: '001',
  },
];

export const mockAllUsers = [
  { id: '1', name: 'Admin User', email: 'admin@erp.com', role: 'admin', department: 'Administration', status: 'active' },
  { id: '2', name: 'John Teacher', email: 'teacher@erp.com', role: 'teacher', department: 'Mathematics', status: 'active' },
  { id: '3', name: 'Jane Student', email: 'student@erp.com', role: 'student', department: 'Grade 10', status: 'active' },
  { id: '4', name: 'Mike Smith', email: 'mike@erp.com', role: 'teacher', department: 'Science', status: 'active' },
  { id: '5', name: 'Sarah Johnson', email: 'sarah@erp.com', role: 'student', department: 'Grade 10', status: 'inactive' },
];

export const mockReports = [
  {
    id: '1',
    title: 'Monthly Attendance Report',
    type: 'attendance',
    date: '2024-01-15',
    department: 'All',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Academic Performance Q1',
    type: 'academic',
    date: '2024-01-10',
    department: 'Grade 10',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Fee Collection Report',
    type: 'finance',
    date: '2024-01-12',
    department: 'All',
    status: 'pending',
  },
];

export const mockStudents = [
  {
    id: '1',
    name: 'Jane Student',
    rollNumber: '001',
    email: 'jane@erp.com',
    marks: {
      english: 85,
      mathematics: 92,
      science: 88,
      history: 80,
      geography: 87,
    },
    attendance: 92,
  },
  {
    id: '2',
    name: 'Bob Wilson',
    rollNumber: '002',
    email: 'bob@erp.com',
    marks: {
      english: 78,
      mathematics: 85,
      science: 90,
      history: 76,
      geography: 82,
    },
    attendance: 88,
  },
  {
    id: '3',
    name: 'Alice Brown',
    rollNumber: '003',
    email: 'alice@erp.com',
    marks: {
      english: 92,
      mathematics: 89,
      science: 85,
      history: 91,
      geography: 88,
    },
    attendance: 95,
  },
];

export const mockAttendance = [
  {
    id: '1',
    studentName: 'Jane Student',
    date: '2024-01-15',
    status: 'present',
    rollNumber: '001',
  },
  {
    id: '2',
    studentName: 'Bob Wilson',
    date: '2024-01-15',
    status: 'absent',
    rollNumber: '002',
  },
  {
    id: '3',
    studentName: 'Alice Brown',
    date: '2024-01-15',
    status: 'present',
    rollNumber: '003',
  },
];

export const mockClasses = [
  {
    id: '1',
    className: 'Grade 10 - Section A',
    subject: 'Mathematics',
    students: 30,
    schedule: 'Mon, Wed, Fri - 10:00 AM',
  },
  {
    id: '2',
    className: 'Grade 10 - Section B',
    subject: 'Mathematics',
    students: 28,
    schedule: 'Tue, Thu - 2:00 PM',
  },
  {
    id: '3',
    className: 'Grade 11 - Section A',
    subject: 'Advanced Mathematics',
    students: 25,
    schedule: 'Mon, Wed, Fri - 1:00 PM',
  },
];

export const mockStudentProfile = {
  id: '3',
  name: 'Jane Student',
  email: 'jane@erp.com',
  rollNumber: '001',
  dateOfBirth: '2008-05-15',
  phone: '+1-555-0123',
  address: '123 Student Street, Education City',
  parentName: 'Mary Student',
  parentPhone: '+1-555-0124',
  joinDate: '2022-06-01',
  currentGrade: 'Grade 10',
  section: 'Section A',
  profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
};
