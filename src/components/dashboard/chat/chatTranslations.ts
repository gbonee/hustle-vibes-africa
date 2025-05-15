
// Language-specific error messages
export const getLanguageSpecificErrorMessage = (currentLanguage: string): string => {
  switch (currentLanguage) {
    case 'pidgin':
      return "Chai! System don hang o! Try again later, my people!";
    case 'yoruba':
      return "Háà! Ẹ̀rọ náà ti dẹ́kun! Ẹ jọ̀wọ́ gbìyànjú lẹ́ẹ̀kan síi lẹ́yìn!";
    case 'hausa':
      return "Kai! Na'urar ta lalace! Ka sake gwadawa daga baya!";
    case 'igbo':
      return "Chei! Igwe ahụ adaala! Biko gbalịa ọzọ mgbe e mesịrị!";
    case 'english':
      return "Sorry! The system is experiencing issues. Please try again later.";
    default:
      return "Chai! System don hang o! Try again later, my people!";
  }
};

// Language-specific error toast messages
export const getLanguageSpecificErrorToast = (currentLanguage: string): string => {
  switch (currentLanguage) {
    case 'pidgin':
      return "AI coach no connect. Make you try again!";
    case 'yoruba':
      return "Olùkọ́ AI kò le sopọ̀. Ẹ jọ̀wọ́ gbìyànjú lẹ́ẹ̀kan síi!";
    case 'hausa':
      return "Mai koyarwa na AI bai haɗa ba. Ka sake gwadawa!";
    case 'igbo':
      return "Onye nkuzi AI ejighị njikọ. Biko gbalịa ọzọ!";
    case 'english':
      return "AI coach connection failed. Please try again.";
    default:
      return "AI coach no connect. Make you try again!";
  }
};

// Language-specific quick actions
export const getLanguageSpecificAction = (action: string, currentLanguage: string): string => {
  if (currentLanguage === 'english') {
    switch(action) {
      case 'next-lesson':
        return "Please show me the next lesson I should take.";
      case 'take-quiz':
        return "I want to take a quiz to test my knowledge.";
      case 'help':
        return "I need help with this course. Some things aren't clear.";
      case 'challenge':
        return "Give me a challenge to practice what I've learned.";
      default:
        return "";
    }
  } else if (currentLanguage === 'pidgin') {
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
  } else if (currentLanguage === 'yoruba') {
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
  } else if (currentLanguage === 'hausa') {
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
  } else if (currentLanguage === 'igbo') {
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
export const getLanguageSpecificGreeting = (userName: string, courseSpecificGreeting: string, currentLanguage: string): string => {
  switch (currentLanguage) {
    case 'pidgin':
      return `How far ${userName}, you fit ask me anything about ${courseSpecificGreeting}`;
    case 'yoruba':
      return `Báwo ni ${userName}, ẹ lè bí mi nípa ohunkóhun nípa ${courseSpecificGreeting}`;
    case 'hausa':
      return `Sannu ${userName}, za ka iya tambaye ni komai game da ${courseSpecificGreeting}`;
    case 'igbo':
      return `Kedụ ${userName}, ị nwere ike ịjụ m ihe ọbụla gbasara ${courseSpecificGreeting}`;
    case 'english':
      return `Hello ${userName}, you can ask me anything about ${courseSpecificGreeting}`;
    default:
      return `How far ${userName}, you fit ask me anything about ${courseSpecificGreeting}`;
  }
};

// Get translated action button labels
export const getQuickActionButtonText = (actionType: string, currentLanguage: string): string => {
  const translations = {
    'next-lesson': {
      pidgin: 'Next Lesson',
      yoruba: 'Ẹ̀kọ́ Tókàn',
      hausa: 'Darasin Gaba',
      igbo: 'Ihe Ọmụmụ Ozugbo',
      english: 'Next Lesson',
    },
    'take-quiz': {
      pidgin: 'Take Quiz',
      yoruba: 'Ṣe Idánwò',
      hausa: 'Yi Gwaji',
      igbo: 'Were Quiz',
      english: 'Take Quiz',
    },
    'challenge': {
      pidgin: 'Challenge',
      yoruba: 'Ìdánwò',
      hausa: 'Kalubale',
      igbo: 'Ịma Aka',
      english: 'Challenge',
    },
  };
  
  return translations[actionType as keyof typeof translations]?.[currentLanguage as keyof (typeof translations)[keyof typeof translations]] || 
         translations[actionType as keyof typeof translations]?.pidgin || 
         actionType;
};

// Get translated "Chat with [coach]" text
export const getChatWithCoachText = (coachName: string, currentLanguage: string): string => {
  const translations = {
    pidgin: `Chat with ${coachName}`,
    yoruba: `Bá ${coachName} sọ̀rọ̀`,
    hausa: `Yi magana da ${coachName}`,
    igbo: `Soro ${coachName} kparịta ụka`,
    english: `Chat with ${coachName}`,
  };
  
  return translations[currentLanguage as keyof typeof translations] || translations.pidgin;
};

// Get placeholder text translation
export const getPlaceholderText = (coachName: string, currentLanguage: string): string => {
  const translations = {
    pidgin: `Ask ${coachName} a question...`,
    yoruba: `Bi ${coachName} ìbéèrè kan...`,
    hausa: `Tambayi ${coachName} tambaya...`,
    igbo: `Jụọ ${coachName} ajụjụ...`,
    english: `Ask ${coachName} a question...`,
  };
  
  return translations[currentLanguage as keyof typeof translations] || translations.pidgin;
};

// Get send button text
export const getSendButtonText = (currentLanguage: string): string => {
  return currentLanguage === 'pidgin' ? 'Send' : 
         currentLanguage === 'yoruba' ? 'Firánṣẹ́' :
         currentLanguage === 'hausa' ? 'Aika' :
         currentLanguage === 'igbo' ? 'Zipu' :
         currentLanguage === 'english' ? 'Send' : 'Send';
};
