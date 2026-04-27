import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { TrendingUp, Download } from 'lucide-react';
import { mockStudents } from '../../services/mockData';

interface Mark {
  subject: string;
  marks: number;
  percentage: number;
  grade: string;
}

const StudentMarks: React.FC = () => {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const student = mockStudents[0];
      const marksData: Mark[] = Object.entries(student.marks).map(([subject, markValue]) => ({
        subject: subject.charAt(0).toUpperCase() + subject.slice(1),
        marks: markValue,
        percentage: markValue,
        grade: markValue >= 90 ? 'A+' : markValue >= 80 ? 'A' : markValue >= 70 ? 'B' : 'C',
      }));
      setMarks(marksData);
      setIsLoading(false);
    }, 500);
  }, []);

  const totalMarks = marks.reduce((sum, m) => sum + m.marks, 0);
  const avgMarks = Math.round(totalMarks / marks.length);
  const overallGrade = avgMarks >= 90 ? 'A+' : avgMarks >= 80 ? 'A' : avgMarks >= 70 ? 'B' : 'C';

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'B':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-orange-100 text-orange-800 border-orange-300';
    }
  };

  return (
    <DashboardLayout title="My Marks">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="hidden text-2xl font-bold text-foreground sm:block">My Marks</h1>
            <p className="text-sm text-muted-foreground">Academic performance overview</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 font-medium text-foreground hover:bg-secondary transition-colors">
            <Download size={20} />
            Download Report
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground font-medium">TOTAL SUBJECTS</p>
            <p className="text-3xl font-bold text-foreground mt-2">{marks.length}</p>
          </div>
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <p className="text-xs font-medium text-primary">AVERAGE MARKS</p>
            <p className="text-3xl font-bold text-primary mt-2">{avgMarks}%</p>
          </div>
          <div className={`rounded-lg border ${getGradeColor(overallGrade)} p-4`}>
            <p className="text-xs font-medium">OVERALL GRADE</p>
            <p className="text-3xl font-bold mt-2">{overallGrade}</p>
          </div>
        </div>

        {/* Marks Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
            <table className="w-full">
              <thead className="border-b border-border bg-secondary">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Subject</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Marks</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Grade</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {marks.map((mark, index) => (
                  <tr key={index} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{mark.subject}</td>
                    <td className="px-6 py-4 text-foreground">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{mark.marks}</span>
                        <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${mark.percentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-lg border px-3 py-1 text-sm font-semibold ${getGradeColor(mark.grade)}`}>
                        {mark.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {mark.marks >= 60 ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                          Pass
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
                          Need Improvement
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Performance Chart */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
            <TrendingUp size={20} className="text-primary" />
            Performance Distribution
          </h2>
          <div className="space-y-3">
            {marks.map((mark, index) => (
              <div key={index}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{mark.subject}</span>
                  <span className="text-sm font-semibold text-foreground">{mark.marks}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                    style={{ width: `${mark.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentMarks;
