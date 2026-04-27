import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { mockAttendance } from '../../services/mockData';

interface AttendanceRecord {
  id: string;
  studentName: string;
  date: string;
  status: 'present' | 'absent';
  rollNumber: string;
}

const StudentAttendance: React.FC = () => {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterMonth, setFilterMonth] = useState('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAttendance(mockAttendance);
      setIsLoading(false);
    }, 500);
  }, []);

  const presentCount = attendance.filter((a) => a.status === 'present').length;
  const absentCount = attendance.filter((a) => a.status === 'absent').length;
  const attendancePercentage = Math.round((presentCount / attendance.length) * 100);

  return (
    <DashboardLayout title="My Attendance">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="hidden text-2xl font-bold text-foreground sm:block">Attendance Records</h1>
          <p className="text-sm text-muted-foreground">Track your attendance history</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground font-medium">TOTAL DAYS</p>
            <p className="text-3xl font-bold text-foreground mt-2">{attendance.length}</p>
          </div>
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="text-xs font-medium text-green-700">PRESENT</p>
            <p className="text-3xl font-bold text-green-800 mt-2">{presentCount}</p>
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-xs font-medium text-red-700">ABSENT</p>
            <p className="text-3xl font-bold text-red-800 mt-2">{absentCount}</p>
          </div>
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <p className="text-xs font-medium text-primary">PERCENTAGE</p>
            <p className="text-3xl font-bold text-primary mt-2">{attendancePercentage}%</p>
          </div>
        </div>

        {/* Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Filter by Month</label>
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Months</option>
            <option value="january">January</option>
            <option value="february">February</option>
            <option value="march">March</option>
          </select>
        </div>

        {/* Attendance Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
            <table className="w-full">
              <thead className="border-b border-border bg-secondary">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Details</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-medium text-foreground">
                        <Calendar size={18} className="text-muted-foreground" />
                        {new Date(record.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {record.status === 'present' ? (
                        <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1">
                          <CheckCircle2 size={18} className="text-green-800" />
                          <span className="text-sm font-semibold text-green-800">Present</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1">
                          <XCircle size={18} className="text-red-800" />
                          <span className="text-sm font-semibold text-red-800">Absent</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {record.status === 'present' ? 'Marked Present' : 'Marked Absent'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Attendance Status */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Attendance Status</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Current Attendance Rate</p>
              <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    attendancePercentage >= 75
                      ? 'bg-green-500'
                      : attendancePercentage >= 60
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${attendancePercentage}%` }}
                />
              </div>
              <p className="mt-2 text-sm font-semibold text-foreground">{attendancePercentage}%</p>
            </div>
            <div className="flex items-center justify-center rounded-lg bg-secondary/50 p-4">
              {attendancePercentage >= 75 ? (
                <div className="text-center">
                  <p className="text-2xl">✓</p>
                  <p className="mt-1 text-sm font-medium text-green-700">Good Standing</p>
                  <p className="text-xs text-muted-foreground">Attendance is above 75%</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-2xl">⚠</p>
                  <p className="mt-1 text-sm font-medium text-orange-700">Needs Improvement</p>
                  <p className="text-xs text-muted-foreground">Maintain 75% attendance</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentAttendance;
