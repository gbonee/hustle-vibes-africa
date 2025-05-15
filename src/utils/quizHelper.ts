
import { Quiz } from '@/types/quiz';

// Group quizzes by module topic
export interface QuizzesByModule {
  [moduleId: number]: Quiz[];
}

// Module-specific quizzes
export const quizzesByModule: QuizzesByModule = {
  // Digital Marketing Module 1
  1: [
    {
      question: 'What is the primary purpose of digital marketing in Nigeria?',
      options: ['To have a website', 'To reach and engage customers online', 'To post on social media daily', 'To spend money on ads'],
      answer: 1,
      moduleId: 1,
      moduleTopic: 'Intro to Digital Marketing the Naija Way'
    },
    {
      question: 'Which platform has the highest user base in Nigeria?',
      options: ['LinkedIn', 'WhatsApp', 'Twitter', 'Snapchat'],
      answer: 1,
      moduleId: 1,
      moduleTopic: 'Intro to Digital Marketing the Naija Way'
    },
    {
      question: 'What is a key advantage of digital marketing for small Nigerian businesses?',
      options: ['It requires lots of capital', 'It works without electricity', 'It allows for targeted customer reach', 'It guarantees overnight success'],
      answer: 2,
      moduleId: 1,
      moduleTopic: 'Intro to Digital Marketing the Naija Way'
    }
  ],
  
  // Digital Marketing Module 2
  2: [
    {
      question: 'What is the best way to organize your WhatsApp business account?',
      options: ['Mix personal and business chats', 'Create broadcast lists for different product categories', 'Only post status updates', 'Send messages at random times'],
      answer: 1,
      moduleId: 2,
      moduleTopic: 'How to Sell on WhatsApp & Instagram'
    },
    {
      question: 'Which Instagram feature is best for showcasing your products?',
      options: ['IGTV', 'Reels', 'Stories', 'Shop'],
      answer: 3,
      moduleId: 2,
      moduleTopic: 'How to Sell on WhatsApp & Instagram'
    },
    {
      question: 'How often should you follow up with potential customers on WhatsApp?',
      options: ['Every hour until they respond', 'Once a week', 'Every 2-3 days', 'Never follow up'],
      answer: 2,
      moduleId: 2,
      moduleTopic: 'How to Sell on WhatsApp & Instagram'
    }
  ],
  
  // Pastry Business Module 1
  101: [
    {
      question: 'What is the most important factor when starting a pastry business in Nigeria?',
      options: ['A large kitchen space', 'High-quality ingredients', 'Expensive equipment', 'Many staff members'],
      answer: 1,
      moduleId: 101,
      moduleTopic: 'Intro to Baking as a Business in Nigeria'
    },
    {
      question: 'What capital is typically needed to start a small pastry business from your kitchen?',
      options: ['₦5,000 - ₦20,000', '₦20,000 - ₦50,000', '₦50,000 - ₦150,000', 'At least ₦500,000'],
      answer: 2,
      moduleId: 101,
      moduleTopic: 'Intro to Baking as a Business in Nigeria'
    },
    {
      question: 'Which pastry product typically has the highest profit margin in Nigeria?',
      options: ['Bread', 'Cakes', 'Small chops', 'Pies'],
      answer: 2,
      moduleId: 101,
      moduleTopic: 'Intro to Baking as a Business in Nigeria'
    }
  ],
  
  // Pastry Business Module 2
  102: [
    {
      question: 'What makes puff-puff stand out in the Nigerian snack market?',
      options: ["It's expensive", "It's quick to make and popular", "It's not found in other countries", "It requires special equipment"],
      answer: 1,
      moduleId: 102,
      moduleTopic: 'How to Make Puff-Puff That Sells'
    },
    {
      question: 'What is the key to making puff-puff with the perfect texture?',
      options: ['Using cold water', 'Proper fermentation time', 'Adding baking powder', 'Using only premium flour'],
      answer: 1,
      moduleId: 102,
      moduleTopic: 'How to Make Puff-Puff That Sells'
    },
    {
      question: 'How can you differentiate your puff-puff business from competitors?',
      options: ['By selling at a lower price', 'By offering unique flavors', 'By making them larger than normal', 'By using imported ingredients'],
      answer: 1,
      moduleId: 102,
      moduleTopic: 'How to Make Puff-Puff That Sells'
    }
  ],
  
  // Importation Module 1
  201: [
    {
      question: 'What is the first step in finding hot-selling products for the Nigerian market?',
      options: ['Copy what others are selling', 'Conduct market research', 'Import random items', 'Ask friends what they like'],
      answer: 1,
      moduleId: 201,
      moduleTopic: 'How to Find Hot-Selling Products Nigerians Want'
    },
    {
      question: 'Which category of products typically has high demand in Nigeria?',
      options: ['Luxury items', 'Everyday essentials', 'Collectibles', 'Seasonal items'],
      answer: 1,
      moduleId: 201,
      moduleTopic: 'How to Find Hot-Selling Products Nigerians Want'
    },
    {
      question: 'How can you test if a product will sell well before ordering in bulk?',
      options: ['Pre-sell to your audience', 'Order just one sample', 'Check social media trends', 'All of the above'],
      answer: 3,
      moduleId: 201,
      moduleTopic: 'How to Find Hot-Selling Products Nigerians Want'
    }
  ],
  
  // Importation Module 2
  202: [
    {
      question: 'What is the advantage of sourcing products from 1688 over Alibaba?',
      options: ['Better quality', 'Lower prices', 'Faster shipping', 'More payment options'],
      answer: 1,
      moduleId: 202,
      moduleTopic: 'Where to Buy Cheap: 1688, Alibaba & Hidden Supplier Hacks'
    },
    {
      question: 'What is a key strategy for negotiating better prices with Chinese suppliers?',
      options: ['Always accept their first offer', 'Request samples from multiple suppliers', 'Pretend you don\'t speak English well', 'Only communicate via email'],
      answer: 1,
      moduleId: 202,
      moduleTopic: 'Where to Buy Cheap: 1688, Alibaba & Hidden Supplier Hacks'
    },
    {
      question: 'Which payment method is usually safest when dealing with new Chinese suppliers?',
      options: ['Western Union', 'Bank transfer', 'Alibaba Trade Assurance', 'Cash on delivery'],
      answer: 2,
      moduleId: 202,
      moduleTopic: 'Where to Buy Cheap: 1688, Alibaba & Hidden Supplier Hacks'
    }
  ]
};

// Helper function for Yoruba translations
export const getYorubaTranslation = (text: string, moduleId: number): string => {
  // Digital Marketing Module 1 translations
  if (moduleId === 1) {
    if (text === 'What is the primary purpose of digital marketing in Nigeria?') {
      return 'Kí ni ète àkọkọ fún ìpolówó ojú òpó lójú kan ní Nàìjíríà?';
    }
    if (text === 'To have a website') {
      return 'Láti ní ojú òpó ayelujára';
    }
    if (text === 'To reach and engage customers online') {
      return 'Láti dé àti ṣe àkíyèsí àwọn oníbàárà lórí ayélujára';
    }
    if (text === 'To post on social media daily') {
      return 'Láti fi sí orí àwọn amòránmọ́ra lójoojúmọ́';
    }
    if (text === 'To spend money on ads') {
      return 'Láti ná owó lórí àwọn ìpolówó';
    }
    
    if (text === 'Which platform has the highest user base in Nigeria?') {
      return 'Èwo nínú àwọn ojú òpó ní àwọn olùlò tó pọ̀jù ní Nàìjíríà?';
    }
    if (text === 'LinkedIn') {
      return 'LinkedIn';
    }
    if (text === 'WhatsApp') {
      return 'WhatsApp';
    }
    if (text === 'Twitter') {
      return 'Twitter';
    }
    if (text === 'Snapchat') {
      return 'Snapchat';
    }
    
    if (text === 'What is a key advantage of digital marketing for small Nigerian businesses?') {
      return 'Kí ni àǹfààní pàtàkì fún ìpolówó ojú òpó lójú kan fún àwọn iṣé ọnà kékeré ní Nàìjíríà?';
    }
    if (text === 'It requires lots of capital') {
      return 'Ó nílò owó tó pọ̀';
    }
    if (text === 'It works without electricity') {
      return 'Ó ń ṣiṣẹ́ láìsí iná';
    }
    if (text === 'It allows for targeted customer reach') {
      return 'Ó fààyè gba àfojúsùn dé ọ̀dọ̀ oníbàárà';
    }
    if (text === 'It guarantees overnight success') {
      return 'Ó ṣèlérí àṣeyọrí lójú kan';
    }
  }
  
  // Digital Marketing Module 2 translations
  if (moduleId === 2) {
    if (text === 'What is the best way to organize your WhatsApp business account?') {
      return 'Kí ni ọ̀nà tó dára jùlọ láti to àkọsílẹ̀ iṣé WhatsApp rẹ dáradára?';
    }
    if (text === 'Mix personal and business chats') {
      return 'Da àwọn ìbáraẹnisọ̀rọ̀ ara ẹni àti iṣẹ́ pọ̀';
    }
    if (text === 'Create broadcast lists for different product categories') {
      return 'Da àwọn àkójọpọ̀ ìgbésókè fún oríṣiríṣi ẹ̀ka ọjà';
    }
    if (text === 'Only post status updates') {
      return 'Fi àlàyé ipo sí nìkan';
    }
    if (text === 'Send messages at random times') {
      return 'Fi àwọn ìfiránṣẹ́ ránṣẹ́ ní àkókò làálàáránṣọ̀nà';
    }
  }

  // For other modules or unknown texts, return the original text
  return text;
};

// Helper function for Hausa translations
export const getHausaTranslation = (text: string, moduleId: number): string => {
  // Digital Marketing Module 1 translations
  if (moduleId === 1) {
    if (text === 'What is the primary purpose of digital marketing in Nigeria?') {
      return 'Menene manufar farko na tallace-tallace na dijital a Najeriya?';
    }
    if (text === 'To have a website') {
      return 'Don samun gidan yanar gizo';
    }
    if (text === 'To reach and engage customers online') {
      return 'Don isa ga masu saye da haɗa hannu da su akan layi';
    }
    if (text === 'To post on social media daily') {
      return 'Don yin posts a kafofin sada zumunta a kullum';
    }
    if (text === 'To spend money on ads') {
      return 'Don kashe kudi akan talla';
    }
    
    if (text === 'Which platform has the highest user base in Nigeria?') {
      return 'Wanne dandali ne ya fi yawan masu amfani a Najeriya?';
    }
    if (text === 'LinkedIn') {
      return 'LinkedIn';
    }
    if (text === 'WhatsApp') {
      return 'WhatsApp';
    }
    if (text === 'Twitter') {
      return 'Twitter';
    }
    if (text === 'Snapchat') {
      return 'Snapchat';
    }
    
    if (text === 'What is a key advantage of digital marketing for small Nigerian businesses?') {
      return 'Menene babban fa\'idar tallace-tallace na dijital ga kananan sana\'o\'i na Najeriya?';
    }
    if (text === 'It requires lots of capital') {
      return 'Yana buƙatar jari mai yawa';
    }
    if (text === 'It works without electricity') {
      return 'Yana aiki ba tare da wutar lantarki ba';
    }
    if (text === 'It allows for targeted customer reach') {
      return 'Yana ba da damar kai ga masu saye da ake nufin';
    }
    if (text === 'It guarantees overnight success') {
      return 'Yana tabbatar da nasara nan take';
    }
  }
  
  // Digital Marketing Module 2 translations
  if (moduleId === 2) {
    if (text === 'What is the best way to organize your WhatsApp business account?') {
      return 'Menene mafi kyawun hanyar tsara asusun kasuwancin WhatsApp ɗinka?';
    }
    if (text === 'Mix personal and business chats') {
      return 'Haɗa zance na sirri da na kasuwanci';
    }
    if (text === 'Create broadcast lists for different product categories') {
      return 'Ƙirƙiri jerin aika wa jama\'a na nau\'ikan kayayyaki daban-daban';
    }
    if (text === 'Only post status updates') {
      return 'Saka kawai sabbin bayanai na matsayi';
    }
    if (text === 'Send messages at random times') {
      return 'Aika saƙonni a lokuta ba tare da tsari ba';
    }
  }

  // For other modules or unknown texts, return the original text
  return text;
};

// Helper function for Igbo translations
export const getIgboTranslation = (text: string, moduleId: number): string => {
  // Digital Marketing Module 1 translations
  if (moduleId === 1) {
    if (text === 'What is the primary purpose of digital marketing in Nigeria?') {
      return 'Gịnị bụ ebumnuche izizi nke mgbasa ozi dijitali na Naịjịrịa?';
    }
    if (text === 'To have a website') {
      return 'Inwe weebụsaịtị';
    }
    if (text === 'To reach and engage customers online') {
      return 'Irute na ijikọta ndị ahịa na ịntanetị';
    }
    if (text === 'To post on social media daily') {
      return 'Ibipụta na mgbasa ozi mmekọrịta kwa ụbọchị';
    }
    if (text === 'To spend money on ads') {
      return 'Iji ego mee mgbasa ozi';
    }
    
    if (text === 'Which platform has the highest user base in Nigeria?') {
      return 'Kedu platformụ nwere ndị ọrụ kachasị na Naịjịrịa?';
    }
    if (text === 'LinkedIn') {
      return 'LinkedIn';
    }
    if (text === 'WhatsApp') {
      return 'WhatsApp';
    }
    if (text === 'Twitter') {
      return 'Twitter';
    }
    if (text === 'Snapchat') {
      return 'Snapchat';
    }
    
    if (text === 'What is a key advantage of digital marketing for small Nigerian businesses?') {
      return 'Gịnị bụ uru dị mkpa nke mgbasa ozi dijitali maka obere azụmaahịa na Naịjịrịa?';
    }
    if (text === 'It requires lots of capital') {
      return 'Ọ chọrọ nnukwu ego';
    }
    if (text === 'It works without electricity') {
      return 'Ọ na-arụ ọrụ na-enweghị ọkụ latrik';
    }
    if (text === 'It allows for targeted customer reach') {
      return 'Ọ na-enye ohere maka iru ndị ahịa edobere';
    }
    if (text === 'It guarantees overnight success') {
      return 'Ọ na-ekwe nkwa ọganiru n\'abalị';
    }
  }
  
  // Digital Marketing Module 2 translations
  if (moduleId === 2) {
    if (text === 'What is the best way to organize your WhatsApp business account?') {
      return 'Gịnị bụ ụzọ kachasị mma isi hazie akaụntụ azụmahịa WhatsApp gị?';
    }
    if (text === 'Mix personal and business chats') {
      return 'Gwakọta mkparịta ụka nke onwe na azụmahịa';
    }
    if (text === 'Create broadcast lists for different product categories') {
      return 'Mepụta ndepụta mgbasama maka ụdị ngwongwo dị iche iche';
    }
    if (text === 'Only post status updates') {
      return 'Naanị depụta mmelite ọnọdụ';
    }
    if (text === 'Send messages at random times') {
      return 'Ziga ozi na mgbe na-enweghị usoro';
    }
  }

  // For other modules or unknown texts, return the original text
  return text;
};

// Translate quiz questions based on language
export const getTranslatedQuizzes = (moduleId: number): Quiz[] => {
  const originalQuizzes = quizzesByModule[moduleId] || [];
  
  if (!originalQuizzes.length) return [];
  
  // Clone quizzes to avoid mutating the original
  return originalQuizzes.map(quiz => {
    // Add translations for each quiz
    const quizWithTranslations = {
      ...quiz,
      translations: {
        yoruba: {
          question: getYorubaTranslation(quiz.question, moduleId),
          options: quiz.options.map(option => getYorubaTranslation(option, moduleId)),
        },
        hausa: {
          question: getHausaTranslation(quiz.question, moduleId),
          options: quiz.options.map(option => getHausaTranslation(option, moduleId)),
        },
        igbo: {
          question: getIgboTranslation(quiz.question, moduleId),
          options: quiz.options.map(option => getIgboTranslation(option, moduleId)),
        }
      }
    };
    
    return quizWithTranslations;
  });
};
