import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

export default function ThemeToggle({ 
  variant = "ghost", 
  size = "icon" 
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" || "light";
    setTheme(savedTheme);
    
    // Apply theme to document
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
    // Update localStorage
    localStorage.setItem("theme", newTheme);
    
    // Update document class
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    console.log(`Theme changed to: ${newTheme}`);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className="gap-2"
      data-testid="button-theme-toggle"
    >
      {theme === "light" ? (
        <>
          <Moon className="h-4 w-4" />
          {size !== "icon" && <span className="hidden sm:inline">Dark</span>}
        </>
      ) : (
        <>
          <Sun className="h-4 w-4" />
          {size !== "icon" && <span className="hidden sm:inline">Light</span>}
        </>
      )}
    </Button>
  );
}