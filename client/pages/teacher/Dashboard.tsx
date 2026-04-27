import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { BookOpen, Users, CheckSquare, Calendar } from 'lucide-react';
import { mockClasses, mockStudents } from '../../services/mockData';

interface DashboardStats {
  totalClasses: number;
  totalStudents: number;
  avgAttendance: number;
  pendingMarks: number;
}

const TeacherDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalClasses: 0,
    totalStudents: 0,
    avgAttendance: 0,
    pendingMarks: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalClasses: mockClasses.length,
        totalStudents: mockStudents.length,
        avgAttendance: 89,
        pendingMarks: 5,
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
    <DashboardLayout title="Teacher Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<BookOpen size={24} />}
            label="My Classes"
            value={stats.totalClasses}
            color="bg-blue-500"
          />
          <StatCard
            icon={<Users size={24} />}
            label="Total Students"
            value={stats.totalStudents}
            color="bg-green-500"
          />
          <StatCard
            icon={<Calendar size={24} />}
            label="Avg Attendance"
            value={`${stats.avgAttendance}%`}
            color="bg-purple-500"
          />
          <StatCard
            icon={<CheckSquare size={24} />}
            label="Pending Marks"
            value={stats.pendingMarks}
            color="bg-orange-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            to="/teacher/marks"
            className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all" />
            <div className="relative">
              <CheckSquare className="mb-3 text-primary" size={28} />
              <h3 className="font-semibold text-foreground">Add Marks</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Record and manage student marks and grades
              </p>
            </div>
          </Link>

          <Link
            to="/teacher/attendance"
            className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all" />
            <div className="relative">
              <Calendar className="mb-3 text-primary" size={28} />
              <h3 className="font-semibold text-foreground">Manage Attendance</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Track and update student attendance records
              </p>
            </div>
          </Link>

          <Link
            to="/teacher/classes"
            className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all" />
            <div className="relative">
              <BookOpen className="mb-3 text-primary" size={28} />
              <h3 className="font-semibold text-foreground">My Classes</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                View your assigned classes and schedules
              </p>
            </div>
          </Link>

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Need Help?</h3>
                <p className="mt-1 text-sm text-muted-foreground">Contact admin support</p>
              </div>
              <button className="rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/20 transition-colors">
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Recent Students */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Your Students</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-foreground">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-foreground">Roll No.</th>
                  <th className="px-4 py-3 text-left font-medium text-foreground">Attendance</th>
                  <th className="px-4 py-3 text-left font-medium text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockStudents.slice(0, 5).map((student) => (
                  <tr key={student.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{student.name}</td>
                    <td className="px-4 py-3 text-foreground">{student.rollNumber}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        {student.attendance}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
