import ChapterView from '../ChapterView';

export default function ChapterViewExample() {
  return (
    <ChapterView 
      chapterTitle="Introduction to Algebra"
      subjectName="Mathematics"
      onBack={() => console.log('Back clicked')}
      onComplete={() => console.log('Chapter completed')}
    />
  );
}