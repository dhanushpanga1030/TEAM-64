import TeacherDashboard from '../TeacherDashboard';

export default function TeacherDashboardExample() {
  return (
    <TeacherDashboard 
      onDownloadReport={(classGrade) => console.log('Download report for class:', classGrade)}
    />
  );
}