import { useMemo } from 'react';
import { Module } from '@/components/dashboard/ModulesList';
import { Quiz } from '@/types/quiz';

// Mock course data
interface Course {
  id: string;
  title: string;
  avatar: string;
  progress: number;
  modules: Module[];
  translations: {
    [key: string]: {
      title: string;
      modules: {
        id: number;
        title: string;
      }[];
    }
  };
}

// Helper function for Yoruba translations
const getYorubaTranslation = (text: string, moduleId: number): string => {
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
const getHausaTranslation = (text: string, moduleId: number): string => {
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
  
  // For other modules or unknown texts, return the original text
  return text;
};

// Helper function for Igbo translations
const getIgboTranslation = (text: string, moduleId: number): string => {
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
      return 'Ọ chọrọ ọtụtụ ego iji malite';
    }
    if (text === 'It works without electricity') {
      return 'Ọ na-arụ ọrụ na-enweghị ọkụ electric';
    }
    if (text === 'It allows for targeted customer reach') {
      return 'Ọ na-enye ohere iji rutere ndị ahịa a na-achọ';
    }
    if (text === 'It guarantees overnight success') {
      return 'Ọ na-ekwe nkwa ihe nrite ozugbo';
    }
  }
  
  // For other modules or unknown texts, return the original text
  return text;
};

export const useCourseData = () => {
  // Mock course data with translations
  const courses: Record<string, Course> = {
    'digital-marketing': {
      id: 'digital-marketing',
      title: 'Digital Marketing the Naija Way',
      avatar: 'https://img.freepik.com/premium-photo/mature-elderly-black-woman-wearing-traditional-nigerian-clothes-african-american-grandmother-is_777271-18892.jpg',
      progress: 25,
      modules: [
        { id: 1, title: 'Intro to Digital Marketing the Naija Way', hasVideo: false, completed: true, locked: false },
        { id: 2, title: 'How to Sell on WhatsApp & Instagram', hasVideo: true, completed: false, locked: false },
        { id: 3, title: 'Create Content That Converts (Even With Just Your Phone)', hasVideo: true, completed: false, locked: true },
        { id: 4, title: 'How to Run Small Ads on Meta', hasVideo: false, completed: false, locked: true },
        { id: 5, title: 'How to Keep Customers & Sell Weekly', hasVideo: true, completed: false, locked: true }
      ],
      translations: {
        pidgin: {
          title: 'Digital Marketing di Naija Way',
          modules: [
            { id: 1, title: 'Introduction to Digital Marketing di Naija Way' },
            { id: 2, title: 'How to Sell for WhatsApp & Instagram' },
            { id: 3, title: 'Create Content Wey Go Convert (Even With Just Your Phone)' },
            { id: 4, title: 'How to Run Small Ads for Meta' },
            { id: 5, title: 'How to Keep Customers & Sell Every Week' }
          ]
        },
        yoruba: {
          title: 'Ìpolówó ojú òpó lójú kan Nàìjíríà',
          modules: [
            { id: 1, title: 'Ìfihan sí Ìpolówó ojú òpó lójú kan Nàìjíríà' },
            { id: 2, title: 'Báwo ni o ṣe le tà lórí WhatsApp & Instagram' },
            { id: 3, title: 'Ṣe àwọn àkóónú tí ó ń yípadà (Pẹlú fóònù rẹ nìkan)' },
            { id: 4, title: 'Báwo ni o ṣe le ṣe àfihàn kékeré lórí Meta' },
            { id: 5, title: 'Báwo ni o ṣe le dá àwọn oníbàárà dúró & tà ní ọ̀sẹ̀-n-ọ̀sẹ̀' }
          ]
        },
        hausa: {
          title: 'Tallace-tallace na Dijital a hanyar Naija',
          modules: [
            { id: 1, title: 'Gabatarwa zuwa Tallace-tallace na Dijital a hanyar Naija' },
            { id: 2, title: 'Yadda ake sayar a WhatsApp & Instagram' },
            { id: 3, title: 'Kirkira abun ciki mai amfani (Ko da wayar ka kawai)' },
            { id: 4, title: 'Yadda ake gudanar da taɓo na ƙarami a Meta' },
            { id: 5, title: 'Yadda ake kula da abokan ciniki & sayar kowane sati' }
          ]
        },
        igbo: {
          title: "Mgbasa ozi dijitalu n'uzo Naija",
          modules: [
            { id: 1, title: "Mmalite na mgbasa ozi dijitalu n'uzo Naija" },
            { id: 2, title: "Otu e si ere na WhatsApp & Instagram" },
            { id: 3, title: "Meputa ihe ndi na-atughari (Obuna site na ekwenti gi)" },
            { id: 4, title: "Otu e si agba mgbasa ozi nta na Meta" },
            { id: 5, title: "Otu e si edebe ndi ahia & re kwa izu" }
          ]
        }
      }
    },
    'pastry-biz': {
      id: 'pastry-biz',
      title: 'Start a Pastry Biz From Your Kitchen',
      avatar: 'https://media.istockphoto.com/id/1269519579/photo/small-bakery-shop-owner-standing-in-front-of-store.jpg?s=612x612&w=0&k=20&c=h0Hu3UFEREi-V186FkkoQGNQYkBbOn9fkj_FJ2q3rPU=',
      progress: 20,
      modules: [
        { id: 1, title: 'Intro to Baking as a Business in Nigeria', hasVideo: false, completed: true, locked: false },
        { id: 2, title: 'How to Make Puff-Puff That Sells', hasVideo: true, completed: false, locked: false },
        { id: 3, title: 'How to Make Nigerian Meatpie', hasVideo: false, completed: false, locked: true },
        { id: 4, title: 'Branding & Packaging for Pastry Biz', hasVideo: true, completed: false, locked: true },
        { id: 5, title: 'How to Find Your First Customers & Start Selling', hasVideo: true, completed: false, locked: true }
      ],
      translations: {
        pidgin: {
          title: 'Start Pastry Business From Your Kitchen',
          modules: [
            { id: 1, title: 'Introduction to Baking as Business for Nigeria' },
            { id: 2, title: 'How to Make Puff-Puff Wey Go Sell Well-well' },
            { id: 3, title: 'How to Make Nigerian Meatpie' },
            { id: 4, title: 'Branding & Packaging for Pastry Business' },
            { id: 5, title: 'How to Find Your First Customers & Begin Sell' }
          ]
        },
        yoruba: {
          title: 'Bẹrẹ Iṣẹ́ àwọn oúnjẹ adùn láti inú kíchẹ́ẹ̀nì rẹ',
          modules: [
            { id: 1, title: 'Ìfihan sí Ìdáná gẹ́gẹ́ bí Iṣẹ́ ní Nàìjíríà' },
            { id: 2, title: 'Báwo ni o ṣe le ṣe Puff-Puff tí yóò tà' },
            { id: 3, title: 'Báwo ni o ṣe le ṣe Ẹran-àkàrà Nàìjíríà' },
            { id: 4, title: 'Àmì & Ipèsè fún Iṣẹ́ Ìdáná' },
            { id: 5, title: 'Báwo ni o ṣe le rí àwọn Oníbàárà àkọ́kọ́ rẹ & Bẹrẹ Títà' }
          ]
        },
        hausa: {
          title: 'Fara Harkar Abinci Mai Zaki Daga Dakin Girkinki',
          modules: [
            { id: 1, title: 'Gabatarwa zuwa Gashin Burodi a matsayin Kasuwanci a Najeriya' },
            { id: 2, title: 'Yadda ake yin Puff-Puff da ke sayarwa' },
            { id: 3, title: 'Yadda ake yin Meatpie na Najeriya' },
            { id: 4, title: 'Branding & Packaging domin Kasuwancin Pastry' },
            { id: 5, title: 'Yadda ake samun Masu Sayayya na Farko & Fara Sayarwa' }
          ]
        },
        igbo: {
          title: "Malite azumaahia pastry site na ulo nri gi",
          modules: [
            { id: 1, title: "Mmalite na ihe mgbaka di ka azumaahia na Naijiria" },
            { id: 2, title: "Otu e si eme puff-puff nke na-ere ere" },
            { id: 3, title: "Otu e si eme Meatpie Naijiria" },
            { id: 4, title: "Branding & Packaging maka azumaahia Pastry" },
            { id: 5, title: "Otu iga achota ndi ahia mbu gi & malite ire" }
          ]
        }
      }
    },
    'importation': {
      id: 'importation',
      title: 'Import From China & Sell on WhatsApp',
      avatar: 'https://media.istockphoto.com/id/1296271163/photo/confident-businessman-with-arms-crossed.jpg?s=612x612&w=0&k=20&c=StyHxyC8uUIVVV4UFHb141gIahiNr0fKurV-fiNb2oU=',
      progress: 15,
      modules: [
        { id: 1, title: 'How to Find Hot-Selling Products Nigerians Want', hasVideo: false, completed: true, locked: false },
        { id: 2, title: 'Where to Buy Cheap: 1688, Alibaba & Hidden Supplier Hacks', hasVideo: true, completed: false, locked: false },
        { id: 3, title: 'Shipping & Delivery: How to Import Without Wahala', hasVideo: false, completed: false, locked: true },
        { id: 4, title: 'How to Market & Sell FAST on WhatsApp & Instagram', hasVideo: true, completed: false, locked: true },
        { id: 5, title: 'Pricing, Profit & Customer Service Tips to Keep Sales Coming', hasVideo: false, completed: false, locked: true }
      ],
      translations: {
        pidgin: {
          title: 'Import From China & Sell for WhatsApp',
          modules: [
            { id: 1, title: 'How to Find Hot-Selling Products Wey Nigerians Want' },
            { id: 2, title: 'Where to Buy Cheap: 1688, Alibaba & Hidden Supplier Hacks' },
            { id: 3, title: 'Shipping & Delivery: How to Import Without Wahala' },
            { id: 4, title: 'How to Market & Sell FAST for WhatsApp & Instagram' },
            { id: 5, title: 'Pricing, Profit & Customer Service Tips to Keep Sales Coming' }
          ]
        },
        yoruba: {
          title: 'Mú wá láti Ṣáínà & Ta lórí WhatsApp',
          modules: [
            { id: 1, title: 'Báwo ni o ṣe le rí àwọn ọjà tí ń tà gbòógì tí àwọn ará Nàìjíríà fẹ́' },
            { id: 2, title: 'Níbo ni o le rà ní ìdíẹ̀: 1688, Alibaba & àwọn èdí àwọn olùpèsè' },
            { id: 3, title: 'Ìfiránṣẹ́ & Ìfì ránṣẹ́: Báwo ni o ṣe le mú wọlé láìsí wàhálà' },
            { id: 4, title: 'Báwo ni o ṣe le polowo & tà KÍÁKÍÁ lórí WhatsApp & Instagram' },
            { id: 5, title: 'Àwọn ìdámọ̀ràn Ìdíyelé, Èrè & Iṣẹ́ Oníbàárà láti jẹ́ kí àwọn ìtàjà máa bá wọlé' }
          ]
        },
        hausa: {
          title: 'Shigo daga China & Sayar a WhatsApp',
          modules: [
            { id: 1, title: 'Yadda ake samun kayayyakin da ke sayarwa masu zafi wanda Najeriawan ke so' },
            { id: 2, title: 'Inda za a saya a arha: 1688, Alibaba & hanyoyin samun masu samar da kaya na asiri' },
            { id: 3, title: 'Jigilar kaya & Isar: Yadda ake shigo ba tare da wahala ba' },
            { id: 4, title: 'Yadda ake tallata & sayar da SAURI a WhatsApp & Instagram' },
            { id: 5, title: 'Shawarwari game da farashin, riba & hidimar abokin ciniki don ci gaba da sayarwa' }
          ]
        },
        igbo: {
          title: "Bubata site na China & Ree na WhatsApp",
          modules: [
            { id: 1, title: "Otu iga achota ngwa ahia ndi na-ere oku ndi Naijiria choro" },
            { id: 2, title: "Ebe i ga-azuta onu ala: 1688, Alibaba & usoro nzuzo nke ndi na-eweta ngwa ahia" },
            { id: 3, title: "Mbupu & Nnyefe: Otu e si ebubata na-enwegh nsogbu" },
            { id: 4, title: "Otu e si eme mgbasa ozi & ree NGWA NGWA na WhatsApp & Instagram" },
            { id: 5, title: "Ndumoodu maka iko ugwo, uru & oru ndi ahia iji na-eleta ahia" }
          ]
        }
      }
    }
  };

  // Module-specific quizzes - Memoized to avoid recreating on each render
  const quizzesByModule = useMemo(() => ({
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
    ]
  }), []);

  // Translate quiz questions based on language
  const getTranslatedQuizzes = (moduleId: number, language: string = 'pidgin'): Quiz[] => {
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

  return {
    courses,
    quizzesByModule,
    getTranslatedQuizzes
  };
};
