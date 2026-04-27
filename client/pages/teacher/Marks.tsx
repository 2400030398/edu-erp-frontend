import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Save, Edit2 } from 'lucide-react';
import { mockStudents } from '../../services/mockData';

interface StudentMarks {
  id: string;
  name: string;
  rollNumber: string;
  english: number;
  mathematics: number;
  science: number;
  history: number;
  geography: number;
}

const TeacherMarks: React.FC = () => {
  const [students, setStudents] = useState<StudentMarks[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<StudentMarks>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const formattedStudents = mockStudents.map((s) => ({
        id: s.id,
        name: s.name,
        rollNumber: s.rollNumber,
        english: s.marks.english,
        mathematics: s.marks.mathematics,
        science: s.marks.science,
        history: s.marks.history,
        geography: s.marks.geography,
      }));
      setStudents(formattedStudents);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleEditStart = (student: StudentMarks) => {
    setEditingId(student.id);
    setEditData(student);
  };

  const handleSave = () => {
    setStudents(
      students.map((s) => (s.id === editingId ? { ...s, ...editData } : s))
    );
    setEditingId(null);
    setMessage('Marks updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const subjects = ['english', 'mathematics', 'science', 'history', 'geography'] as const;

  return (
    <DashboardLayout title="Add Marks">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="hidden text-2xl font-bold text-foreground sm:block">Add Student Marks</h1>
          <p className="text-sm text-muted-foreground">Total: {students.length} students</p>
        </div>

        {/* Success Message */}
        {message && (
          <div className="rounded-lg bg-green-100 p-4 text-green-800">
            {message}
          </div>
        )}

        {/* Marks Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Roll No.</th>
                  {subjects.map((subject) => (
                    <th key={subject} className="px-4 py-3 text-left font-semibold text-foreground capitalize">
                      {subject}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{student.name}</td>
                    <td className="px-4 py-3 text-foreground">{student.rollNumber}</td>
                    {subjects.map((subject) => (
                      <td key={subject} className="px-4 py-3">
                        {editingId === student.id ? (
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={editData[subject] || ''}
                            onChange={(e) =>
                              setEditData({ ...editData, [subject]: parseInt(e.target.value) })
                            }
                            className="w-16 rounded-lg border border-input bg-background px-2 py-1 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        ) : (
                          <span className="text-foreground">{student[subject]}</span>
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      {editingId === student.id ? (
                        <button
                          onClick={handleSave}
                          className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                          <Save size={14} />
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditStart(student)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          <Edit2 size={14} />
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TeacherMarks;
