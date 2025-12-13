import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
];

interface LanguageSelectorProps {
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
  variant?: "default" | "ghost";
}

export default function LanguageSelector({
  currentLanguage = "en",
  onLanguageChange = () => {},
  variant = "ghost"
}: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    onLanguageChange(languageCode);
    console.log(`Language changed to: ${languageCode}`);
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === selectedLanguage) || languages[0];
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size="sm" 
          className="gap-2"
          data-testid="button-language-selector"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{getCurrentLanguage().nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            data-testid={`option-language-${language.code}`}
            className={selectedLanguage === language.code ? "bg-accent" : ""}
          >
            <div className="flex flex-col">
              <span className="font-medium">{language.nativeName}</span>
              <span className="text-xs text-muted-foreground">{language.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}