
import React from 'react';
import { AlertCircle, Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PreviewModeProps {
  onLanguageChange?: (language: string) => void;
  currentLanguage?: string;
}

const PreviewMode: React.FC<PreviewModeProps> = ({ 
  onLanguageChange,
  currentLanguage = 'pidgin'
}) => {
  return (
    <div className="fixed top-0 right-0 m-2 p-2 bg-yellow-500 text-black rounded-md z-50 flex items-center gap-2 text-xs">
      <AlertCircle size={16} />
      <span>Preview Mode</span>
      
      {onLanguageChange && (
        <div className="ml-2 flex items-center">
          <Globe size={16} className="mr-1" />
          <Select 
            value={currentLanguage}
            onValueChange={onLanguageChange}
          >
            <SelectTrigger className="h-7 w-24 text-xs bg-black/10">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pidgin">Pidgin</SelectItem>
              <SelectItem value="yoruba">Yoruba</SelectItem>
              <SelectItem value="hausa">Hausa</SelectItem>
              <SelectItem value="igbo">Igbo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default PreviewMode;
