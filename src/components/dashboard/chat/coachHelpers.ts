
// Maps course types to coach names
export const getCoachName = (course: string): string => {
  switch (course) {
    case 'digital-marketing':
      return 'Digital Mama';
    case 'pastry-biz':
      return 'Baker Amara';
    case 'importation':
      return 'Uncle Musa';
    default:
      return 'Digital Mama';
  }
};

// Get translated coach names based on language
export const getTranslatedCoachName = (course: string, language: string): string => {
  const baseCoachName = getCoachName(course);
  
  // Return the base name if no translation needed
  if (language === 'pidgin') {
    return baseCoachName;
  }
  
  // Coach name translations
  const coachNameTranslations: Record<string, Record<string, string>> = {
    yoruba: {
      'Digital Mama': 'Ìyá Díjítà',
      'Baker Amara': 'Aladàáná Amara',
      'Uncle Musa': 'Bàbá Musa'
    },
    hausa: {
      'Digital Mama': 'Mama Dijital',
      'Baker Amara': 'Mai Gashi Amara',
      'Uncle Musa': 'Kawu Musa'
    },
    igbo: {
      'Digital Mama': 'Nne Dijitạl',
      'Baker Amara': 'Onye Nri Amara',
      'Uncle Musa': 'Nna Nwanna Musa'
    }
  };
  
  // Return translated name or default to base name
  return coachNameTranslations[language]?.[baseCoachName] || baseCoachName;
};

// Get course-specific greeting
export const getCourseSpecificGreeting = (course: string): string => {
  switch (course) {
    case 'digital-marketing':
      return 'digital marketing';
    case 'pastry-biz':
      return 'pastry business';
    case 'importation':
      return 'importation business';
    default:
      return 'digital marketing';
  }
};
