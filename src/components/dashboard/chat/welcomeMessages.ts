
import { getCourseSpecificGreeting } from './coachHelpers';

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
  return `Welcome! I am ${getCourseSpecificGreeting(course)}!`;
};
