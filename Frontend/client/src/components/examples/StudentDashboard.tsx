import StudentDashboard from '../StudentDashboard';

export default function StudentDashboardExample() {
  return (
    <StudentDashboard 
      onSubjectClick={(subjectId) => console.log('Subject clicked:', subjectId)}
      onChapterClick={(subjectId, chapterId) => console.log('Chapter clicked:', chapterId, 'in', subjectId)}
    />
  );
}