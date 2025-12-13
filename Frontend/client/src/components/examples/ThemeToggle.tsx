import ThemeToggle from '../ThemeToggle';

export default function ThemeToggleExample() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-4 items-center">
        <ThemeToggle size="icon" />
        <ThemeToggle size="sm" variant="outline" />
        <ThemeToggle size="default" variant="default" />
      </div>
    </div>
  );
}