
// Map course types to coach names
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

// Fixed welcome messages for each avatar and language
export const getFixedWelcomeMessage = (course: string, language: string): string => {
  if (language === 'pidgin') {
    if (course === 'digital-marketing') {
      return "Ah! You don land! Digital Mama don show to teach you how to hammer for online space! No dull!";
    } else if (course === 'pastry-biz') {
      return "My darling! Baker Amara don show! Ready to bake money into your life!";
    } else if (course === 'importation') {
      return "Oya! Uncle Musa don land! Ready to show you importation business with correct connect!";
    }
  } else if (language === 'yoruba') {
    if (course === 'digital-marketing') {
      return "Ẹ ku àbọ̀! Èmi ni Digital Mama. Mo ti wá láti kọ́ ẹ nípa bí a ṣe ń ṣe owó lórí ìtakùn ayélujára!";
    } else if (course === 'pastry-biz') {
      return "Ẹ ku àbọ̀! Èmi ni Baker Amara. Mo wá láti kọ́ ẹ bí a ṣe ń ṣe owó pẹ̀lú àwọn oúnjẹ dídùn!";
    } else if (course === 'importation') {
      return "Ẹ ku àbọ̀! Èmi ni Uncle Musa. Mo wá láti kọ́ ẹ nípa bí a ṣe ń gbé ọjà wọlé láti ilẹ̀ Ṣáínà!";
    }
  } else if (language === 'hausa') {
    if (course === 'digital-marketing') {
      return "Barka da zuwa! Ni ne Digital Mama. Zan koya maka yadda za ka sami kuɗi ta hanyar dijital!";
    } else if (course === 'pastry-biz') {
      return "Barka da zuwa! Ni ne Baker Amara. Zan koya maka yadda za ka yi kasuwanci na abinci mai dadi!";
    } else if (course === 'importation') {
      return "Barka da zuwa! Ni ne Uncle Musa. Zan koya maka yadda za ka shigo da kaya daga China!";
    }
  } else if (language === 'igbo') {
    if (course === 'digital-marketing') {
      return "Nnọọ! Abụ m Digital Mama. Abịala m ịkụziri gị otú esi enweta ego site na mgbasa ozi dijitalụ!";
    } else if (course === 'pastry-biz') {
      return "Nnọọ! Abụ m Baker Amara. Abịala m ịkụziri gị otú isi enweta ego site na nri ụtọ!";
    } else if (course === 'importation') {
      return "Nnọọ! Abụ m Uncle Musa. Abịala m ịkụziri gị otú isi bubata ngwá ahịa site na China!";
    }
  }
  
  // Default fallback based on course
  return `Welcome! I am ${getCoachName(course)}. Let's talk about ${getCourseSpecificGreeting(course)}!`;
};

// Language-specific error messages
export const getLanguageSpecificErrorMessage = (language: string): string => {
  switch (language) {
    case 'pidgin':
      return "Chai! System don hang o! Try again later, my people!";
    case 'yoruba':
      return "Háà! Ẹ̀rọ náà ti dẹ́kun! Ẹ jọ̀wọ́ gbìyànjú lẹ́ẹ̀kan síi lẹ́yìn!";
    case 'hausa':
      return "Kai! Na'urar ta lalace! Ka sake gwadawa daga baya!";
    case 'igbo':
      return "Chei! Igwe ahụ adaala! Biko gbalịa ọzọ mgbe e mesịrị!";
    default:
      return "Chai! System don hang o! Try again later, my people!";
  }
};

// Language-specific error toast messages
export const getLanguageSpecificErrorToast = (language: string): string => {
  switch (language) {
    case 'pidgin':
      return "AI coach no connect. Make you try again!";
    case 'yoruba':
      return "Olùkọ́ AI kò le sopọ̀. Ẹ jọ̀wọ́ gbìyànjú lẹ́ẹ̀kan síi!";
    case 'hausa':
      return "Mai koyarwa na AI bai haɗa ba. Ka sake gwadawa!";
    case 'igbo':
      return "Onye nkuzi AI ejighị njikọ. Biko gbalịa ọzọ!";
    default:
      return "AI coach no connect. Make you try again!";
  }
};

// Language-specific quick actions
export const getLanguageSpecificAction = (action: string, language: string): string => {
  if (language === 'pidgin') {
    switch(action) {
      case 'next-lesson':
        return "Abeg show me the next lesson wey I need to take.";
      case 'take-quiz':
        return "I wan take quiz to test my knowledge now-now.";
      case 'help':
        return "I need help with this course o! Things no too clear.";
      case 'challenge':
        return "Give me challenge make I practice wetin I don learn.";
      default:
        return "";
    }
  } else if (language === 'yoruba') {
    switch(action) {
      case 'next-lesson':
        return "Jọ̀wọ́ fi ẹ̀kọ́ tó kàn hàn mí.";
      case 'take-quiz':
        return "Mo fẹ́ ṣe ìdánwò láti dán ìmọ̀ mi wò báyìí.";
      case 'help':
        return "Mo nílò ìrànlọ́wọ́ pẹ̀lú ẹ̀kọ́ yìí o! Àwọn nǹkan kò tí ì yé mi dáadáa.";
      case 'challenge':
        return "Fún mi ní àdánwò kan kí n lè máa lo ohun tí mo ti kọ́.";
      default:
        return "";
    }
  } else if (language === 'hausa') {
    switch(action) {
      case 'next-lesson':
        return "Don Allah nuna mini darasi na gaba da zan dauka.";
      case 'take-quiz':
        return "Ina son in yi gwaji don gwada ilimina yanzu.";
      case 'help':
        return "Ina bukatar taimako game da wannan darasin! Abubuwan ba su bayyana sosai ba.";
      case 'challenge':
        return "Bani wani kalubale don in yi amfani da abin da na koya.";
      default:
        return "";
    }
  } else if (language === 'igbo') {
    switch(action) {
      case 'next-lesson':
        return "Biko gosipụta m ihe ọmụmụ na-esote m ga-amụta.";
      case 'take-quiz':
        return "Achọrọ m ime ule iji nyochaa ihe m maara ugbu a.";
      case 'help':
        return "Achọrọ m enyemaka maka ọzụzụ a! Ihe ndị a adọghị m anya nke ọma.";
      case 'challenge':
        return "Nye m ihe ịma aka ka m wee mụọ ihe m mụtara.";
      default:
        return "";
    }
  }
  
  return "";
};

// Generate language-specific greeting
export const getLanguageSpecificGreeting = (userName: string, courseSpecificGreeting: string, language: string): string => {
  switch (language) {
    case 'pidgin':
      return `How far ${userName}, you fit ask me anything about ${courseSpecificGreeting}`;
    case 'yoruba':
      return `Báwo ni ${userName}, ẹ lè bí mi nípa ohunkóhun nípa ${courseSpecificGreeting}`;
    case 'hausa':
      return `Sannu ${userName}, za ka iya tambaye ni komai game da ${courseSpecificGreeting}`;
    case 'igbo':
      return `Kedụ ${userName}, ị nwere ike ịjụ m ihe ọbụla gbasara ${courseSpecificGreeting}`;
    default:
      return `How far ${userName}, you fit ask me anything about ${courseSpecificGreeting}`;
  }
};

// Get translated action button labels
export const getQuickActionButtonText = (actionType: string, language: string): string => {
  const translations = {
    'next-lesson': {
      pidgin: 'Next Lesson',
      yoruba: 'Ẹ̀kọ́ Tókàn',
      hausa: 'Darasin Gaba',
      igbo: 'Ihe Ọmụmụ Ozugbo',
    },
    'take-quiz': {
      pidgin: 'Take Quiz',
      yoruba: 'Ṣe Idánwò',
      hausa: 'Yi Gwaji',
      igbo: 'Were Quiz',
    },
    'challenge': {
      pidgin: 'Challenge',
      yoruba: 'Ìdánwò',
      hausa: 'Kalubale',
      igbo: 'Ịma Aka',
    },
  };
  
  return translations[actionType as keyof typeof translations]?.[language as keyof typeof translations['next-lesson']] || 
         translations[actionType as keyof typeof translations]?.pidgin || 
         actionType;
};

// Get translated "Chat with [coach]" text
export const getChatWithCoachText = (coachName: string, language: string): string => {
  const translations = {
    pidgin: `Chat with ${coachName}`,
    yoruba: `Bá ${coachName} sọ̀rọ̀`,
    hausa: `Yi magana da ${coachName}`,
    igbo: `Soro ${coachName} kparịta ụka`,
  };
  
  return translations[language as keyof typeof translations] || translations.pidgin;
};

// Get placeholder text translation
export const getPlaceholderText = (coachName: string, language: string): string => {
  const translations = {
    pidgin: `Ask ${coachName} a question...`,
    yoruba: `Bi ${coachName} ìbéèrè kan...`,
    hausa: `Tambayi ${coachName} tambaya...`,
    igbo: `Jụọ ${coachName} ajụjụ...`,
  };
  
  return translations[language as keyof typeof translations] || translations.pidgin;
};

// Get send button text
export const getSendButtonText = (language: string): string => {
  switch (language) {
    case 'pidgin': 
      return 'Send';
    case 'yoruba': 
      return 'Firánṣẹ́';
    case 'hausa': 
      return 'Aika';
    case 'igbo': 
      return 'Zipu';
    default: 
      return 'Send';
  }
};
