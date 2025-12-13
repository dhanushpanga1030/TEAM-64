import LanguageSelector from '../LanguageSelector';

export default function LanguageSelectorExample() {
  return (
    <div className="p-4">
      <LanguageSelector 
        currentLanguage="en"
        onLanguageChange={(lang) => console.log('Language selected:', lang)}
      />
    </div>
  );
}