
export const getBackButtonText = (language: string, defaultText: string = 'Back to All Modules'): string => {
  if (defaultText) return defaultText;
  
  const backTexts = {
    'pidgin': 'Back to All Modules',
    'yoruba': 'Pada si Gbogbo Modulu',
    'hausa': 'Koma Zuwa Duk Modules',
    'igbo': 'Laghachi na Modules Nile',
    'english': 'Back to All Modules',
  };
  
  return (backTexts as any)[language] || backTexts.pidgin;
};
