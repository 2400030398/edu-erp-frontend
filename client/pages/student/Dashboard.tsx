import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { CheckSquare, Users, User, TrendingUp } from 'lucide-react';
import { mockStudentProfile, mockStudents } from '../../services/mockData';

interface DashboardStats {
  avgMarks: number;
  attendance: number;
  classesEnrolled: number;
  credits: number;
}

const StudentDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    avgMarks: 0,
    attendance: 0,
    classesEnrolled: 5,
    credits: 20,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const student = mockStudents[0];
      const avgMarks = Math.round(
        (Object.values(student.marks).reduce((a, b) => a + b, 0) / 5)
      );
      setStats({
        avgMarks,
        attendance: student.attendance,
        classesEnrolled: 5,
        credits: 20,
      });
      setIsLoading(false);
    }, 500);
  }, []);

  const StatCard = ({
    icon: Icon,
    label,
    value,
    color,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    color: string;
  }) => (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          {isLoading ? (
            <div className="mt-2 h-8 w-16 animate-pulse rounded bg-muted" />
          ) : (
            <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          )}
        </div>
        <div className={`rounded-lg ${color} p-3 text-primary-foreground`}>{Icon}</div>
      </div>
    </div>
  );

  return (
    <DashboardLayout title="Student Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<TrendingUp size={24} />}
            label="Average Marks"
            value={`${stats.avgMarks}%`}
            color="bg-blue-500"
          />
          <StatCard
            icon={<CheckSquare size={24} />}
            label="Attendance"
            value={`${stats.attendance}%`}
            color="bg-green-500"
          />
          <StatCard
            icon={<Users size={24} />}
            label="Classes Enrolled"
            value={stats.classesEnrolled}
            color="bg-purple-500"
          />
          <StatCard
            icon={<TrendingUp size={24} />}
            label="Credits Earned"
            value={stats.credits}
            color="bg-orange-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            to="/student/marks"
            className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all" />
            <div className="relative">
              <CheckSquare className="mb-3 text-primary" size={28} />
              <h3 className="font-semibold text-foreground">My Marks</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                View your subject-wise marks and grades
              </p>
            </div>
          </Link>

          <Link
            to="/student/attendance"
            className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all" />
            <div className="relative">
              <Users className="mb-3 text-primary" size={28} />
              <h3 className="font-semibold text-foreground">Attendance</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Track your attendance records
              </p>
            </div>
          </Link>

          <Link
            to="/student/profile"
            className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all" />
            <div className="relative">
              <User className="mb-3 text-primary" size={28} />
              <h3 className="font-semibold text-foreground">My Profile</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                View and update your profile information
              </p>
            </div>
          </Link>

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Academic Status</h3>
                <p className="mt-1 text-sm text-muted-foreground">Good Standing</p>
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Recent Marks */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Your Latest Marks</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {mockStudents[0] && Object.entries(mockStudents[0].marks).map(([subject, marks]) => (
              <div key={subject} className="rounded-lg bg-secondary p-4 text-center">
                <p className="text-xs font-medium text-muted-foreground capitalize">{subject}</p>
                <p className="mt-2 text-2xl font-bold text-foreground">{marks}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {marks >= 80 ? '✓' : marks >= 60 ? '○' : '✕'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
