
import type { Course } from '@/types/course';

export const courses: Record<string, Course> = {
  'digital-marketing': {
    id: 'digital-marketing',
    title: 'Digital Marketing the Naija Way',
    description: 'Learn how to market your business online using social media, WhatsApp, and other digital platforms popular in Nigeria.',
    avatar: 'https://img.freepik.com/premium-photo/mature-elderly-black-woman-wearing-traditional-nigerian-clothes-african-american-grandmother-is_777271-18892.jpg',
    modules: [
      { id: 1, title: 'Intro to Digital Marketing the Naija Way', hasVideo: false, completed: false, locked: false },
      { id: 2, title: 'How to Sell on WhatsApp & Instagram', hasVideo: true, completed: false, locked: true },
      { id: 3, title: 'Create Content That Converts (Even With Just Your Phone)', hasVideo: true, completed: false, locked: true },
      { id: 4, title: 'How to Run Small Ads on Meta', hasVideo: false, completed: false, locked: true },
      { id: 5, title: 'How to Keep Customers & Sell Weekly', hasVideo: true, completed: false, locked: true }
    ],
    translations: {
      'english': {
        title: 'Digital Marketing the Nigerian Way',
        modules: [
          { id: 1, title: 'Introduction to Digital Marketing in Nigeria' },
          { id: 2, title: 'How to Sell Products on WhatsApp & Instagram' },
          { id: 3, title: 'Creating Content That Converts (With Just Your Phone)' },
          { id: 4, title: 'Running Small Ads on Meta Platforms' },
          { id: 5, title: 'Customer Retention and Weekly Sales Strategies' }
        ]
      },
      'pidgin': {
        title: 'Digital Marketing for Naija People',
        modules: [
          { id: 1, title: 'How Digital Marketing Dey Work for Naija' },
          { id: 2, title: 'How to Take Sell for WhatsApp & Instagram' },
          { id: 3, title: 'How to Make Content Wey Go Convert (With Just Your Phone)' },
          { id: 4, title: 'How to Run Small Ads for Meta' },
          { id: 5, title: 'How to Keep Customers & Dey Sell Every Week' }
        ]
      },
      'yoruba': {
        title: 'Ìpolówó Díjítà ní Ọ̀nà Nàìjíríà',
        modules: [
          { id: 1, title: 'Ìfáàrà sí Ìpolówó Díjítà ní Ọ̀nà Nàìjíríà' },
          { id: 2, title: 'Báwo ni o ṣe le Ta lórí WhatsApp & Instagram' },
          { id: 3, title: 'Ṣẹ̀dá Àkóónú Tó ń Yípadà (Pẹ̀lú Fóònù Rẹ Nìkan)' },
          { id: 4, title: 'Báwo ni o ṣe le Ṣiṣẹ́ Ìpolówó Kékeré lórí Meta' },
          { id: 5, title: 'Báwo ni o ṣe le Dá Àwọn Oníbàárà Dúró & Ta Ọ̀sọ̀ọ̀sẹ̀' }
        ]
      },
      'hausa': {
        title: 'Tallace-tallace na Dijital a Hanyar Najeriya',
        modules: [
          { id: 1, title: 'Gabatarwa ga Tallace-tallace na Dijital a Najeriya' },
          { id: 2, title: 'Yadda za a Sayar a kan WhatsApp da Instagram' },
          { id: 3, title: 'Kirkiri Abun ciki Mai Canzawa (Ko da Wayar ka Kawai)' },
          { id: 4, title: 'Yadda ake Gudanar da Kananan Tallace-tallace a kan Meta' },
          { id: 5, title: 'Yadda za a Riƙe Abokan Ciniki & Sayarwa Kull\'sati' }
        ]
      },
      'igbo': {
        title: 'Mgbasa Ozi Dijital n\'Ụzọ Naịjịrịa',
        modules: [
          { id: 1, title: 'Nnabata na Mgbasa Ozi Dijital na Naịjịrịa' },
          { id: 2, title: 'Etu Esi Eree Ahịa na WhatsApp & Instagram' },
          { id: 3, title: 'Mepụta Ọdịnaya Na-atụgharị (Ọbụna Naanị site na Ekwentị Gị)' },
          { id: 4, title: 'Etu Esi Agba Mgbasa Ozi Obere na Meta' },
          { id: 5, title: 'Etu Esi Ejide Ndị Ahịa & Ree Kwa Izu' }
        ]
      }
    }
  },
  'pastry-biz': {
    id: 'pastry-biz',
    title: 'Start a Pastry Biz From Your Kitchen',
    description: 'Learn how to start a profitable pastry business from your home kitchen with minimal investment.',
    avatar: 'https://media.istockphoto.com/id/1269519579/photo/small-bakery-shop-owner-standing-in-front-of-store.jpg?s=612x612&w=0&k=20&c=h0Hu3UFEREi-V186FkkoQGNQYkBbOn9fkj_FJ2q3rPU=',
    modules: [
      { id: 101, title: 'Intro to Baking as a Business in Nigeria', hasVideo: false, completed: false, locked: false },
      { id: 102, title: 'How to Make Puff-Puff That Sells', hasVideo: true, completed: false, locked: true },
      { id: 103, title: 'How to Make Nigerian Meatpie', hasVideo: false, completed: false, locked: true },
      { id: 104, title: 'Branding & Packaging for Pastry Biz', hasVideo: true, completed: false, locked: true },
      { id: 105, title: 'How to Find Your First Customers & Start Selling', hasVideo: true, completed: false, locked: true }
    ],
    translations: {
      'english': {
        title: 'Start a Pastry Business From Your Kitchen',
        modules: [
          { id: 101, title: 'Introduction to Baking as a Business in Nigeria' },
          { id: 102, title: 'How to Make Puff-Puff That Sells' },
          { id: 103, title: 'How to Make Nigerian Meatpie' },
          { id: 104, title: 'Branding & Packaging for Your Pastry Business' },
          { id: 105, title: 'Finding Your First Customers & Starting Sales' }
        ]
      },
      'pidgin': {
        title: 'Start Pastry Business From Your Kitchen',
        modules: [
          { id: 101, title: 'How to Start Baking Business for Naija' },
          { id: 102, title: 'How to Make Puff-Puff Wey People Go Rush Buy' },
          { id: 103, title: 'How to Make Naija Meatpie Wey Sweet' },
          { id: 104, title: 'How to Package Your Pastry Make E Fine' },
          { id: 105, title: 'How to Find People Wey Go Buy Your Food' }
        ]
      },
      'yoruba': {
        title: 'Bẹ̀rẹ̀ Iṣẹ́ Àwọn Oúnjẹ Dídùn Láti Ilé Ìdáná Rẹ',
        modules: [
          { id: 101, title: 'Ìfáàrà sí Ìdáná Bí Iṣẹ́ ní Nàìjíríà' },
          { id: 102, title: 'Báwo ni o ṣe le Ṣe Puff-Puff Tí ń Tà' },
          { id: 103, title: 'Báwo ni o ṣe le Ṣe Meatpie Nàìjíríà' },
          { id: 104, title: 'Àrídìmú àti Ìpèsè fún Iṣẹ́ Àwọn Oúnjẹ Dídùn' },
          { id: 105, title: 'Báwo ni o ṣe le Rí Àwọn Oníbàárà Àkọ́kọ́ Rẹ & Bẹ̀rẹ̀ Títà' }
        ]
      },
      'hausa': {
        title: 'Fara Kasuwancin Pastry Daga Dakin Girkinki',
        modules: [
          { id: 101, title: 'Gabatarwa ga Gashin Abinci a Matsayin Kasuwanci a Najeriya' },
          { id: 102, title: 'Yadda za a Yi Puff-Puff Mai Sayarwa' },
          { id: 103, title: 'Yadda za a Yi Meatpie na Najeriya' },
          { id: 104, title: 'Alamar Kasuwanci da Packaging don Kasuwancin Pastry' },
          { id: 105, title: 'Yadda za a Samo Abokan Ciniki na Farko & Fara Sayarwa' }
        ]
      },
      'igbo': {
        title: 'Malite Azụmaahịa Pastry Site na Ụlọ Nri Gị',
        modules: [
          { id: 101, title: 'Nnabata na Isi Nri dị ka Azụmaahịa na Naịjịrịa' },
          { id: 102, title: 'Etu Esi Emepụta Puff-Puff Na-ere Ahịa' },
          { id: 103, title: 'Etu Esi Emepụta Meatpie Naịjịrịa' },
          { id: 104, title: 'Ịkọ Ụkọ na Mkpuchi maka Azụmaahịa Pastry' },
          { id: 105, title: 'Etu Esi Achọta Ndị Ahịa Mbụ Gị & Malite Ire' }
        ]
      }
    }
  },
  'importation': {
    id: 'importation',
    title: 'Import From China & Sell on WhatsApp',
    description: 'Learn how to import profitable goods from China and sell them through WhatsApp and social media.',
    avatar: 'https://media.istockphoto.com/id/1296271163/photo/confident-businessman-with-arms-crossed.jpg?s=612x612&w=0&k=20&c=StyHxyC8uUIVVV4UFHb141gIahiNr0fKurV-fiNb2oU=',
    modules: [
      { id: 201, title: 'How to Find Hot-Selling Products Nigerians Want', hasVideo: false, completed: false, locked: false },
      { id: 202, title: 'Where to Buy Cheap: 1688, Alibaba & Hidden Supplier Hacks', hasVideo: true, completed: false, locked: true },
      { id: 203, title: 'Shipping & Delivery: How to Import Without Wahala', hasVideo: false, completed: false, locked: true },
      { id: 204, title: 'How to Market & Sell FAST on WhatsApp & Instagram', hasVideo: true, completed: false, locked: true },
      { id: 205, title: 'Pricing, Profit & Customer Service Tips to Keep Sales Coming', hasVideo: false, completed: false, locked: true }
    ],
    translations: {
      'english': {
        title: 'Import From China & Sell on WhatsApp',
        modules: [
          { id: 201, title: 'How to Find Hot-Selling Products Nigerians Want' },
          { id: 202, title: 'Where to Buy Cheap: 1688, Alibaba & Hidden Supplier Sources' },
          { id: 203, title: 'Shipping & Delivery: How to Import Without Problems' },
          { id: 204, title: 'How to Market & Sell FAST on WhatsApp & Instagram' },
          { id: 205, title: 'Pricing, Profit & Customer Service Tips to Keep Sales Coming' }
        ]
      },
      'pidgin': {
        title: 'Import from China & Sell for WhatsApp',
        modules: [
          { id: 201, title: 'How to Find Products Wey Naija People Dey Like' },
          { id: 202, title: 'Where to Buy Cheap: 1688, Alibaba & Other Secret Places' },
          { id: 203, title: 'How to Ship Products from China Without Wahala' },
          { id: 204, title: 'How to Sell Sharp-Sharp for WhatsApp & Instagram' },
          { id: 205, title: 'How to Set Price, Make Profit & Keep Customers Happy' }
        ]
      },
      'yoruba': {
        title: 'Gbé Wọlé Láti Sháínà & Ta lórí WhatsApp',
        modules: [
          { id: 201, title: 'Báwo ni o ṣe le Rí Àwọn Ọjà Tí ń Ta Gúgúrú Tí Àwọn Nàìjíríà Fẹ́' },
          { id: 202, title: 'Níbo ni o ti le Rà Títọ́wọ́: 1688, Alibaba & Àwọn Àjíǹdé Olùpèsè Tó Farasin' },
          { id: 203, title: 'Fífi Ránṣẹ́ & Ìfúnni: Báwo ni o ṣe le Gbé Wọlé Láìsí Wàhálà' },
          { id: 204, title: 'Báwo ni o ṣe le Ṣe Ìpolówó & Ta KÍÁKÍÁ lórí WhatsApp & Instagram' },
          { id: 205, title: 'Àwọn Ìmọ̀ràn Ìdíyelé, Èrè & Iṣẹ́ Oníbàárà láti Jẹ́ kí Títà Máa Bọ̀' }
        ]
      },
      'hausa': {
        title: 'Shigo daga Kasar Sin & Sayar a WhatsApp',
        modules: [
          { id: 201, title: 'Yadda za a Samo Kayayyakin da ke Da Sayarwa Sosai Wadanda Najeriyawa ke So' },
          { id: 202, title: 'Inda za a Saya a Arha: 1688, Alibaba & Dabarun Masu Samar da Kaya na Boye' },
          { id: 203, title: 'Jigilar Kayayyaki & Isar da su: Yadda za a Shigo ba tare da Wahala ba' },
          { id: 204, title: 'Yadda za a Yi Tallace-tallace & Sayar da Kayayyaki CIKIN SAURI a WhatsApp & Instagram' },
          { id: 205, title: 'Dabarun Ƙayyade Farashi, Riba & Hidimar Abokan Ciniki don Ci gaba da Sayarwa' }
        ]
      },
      'igbo': {
        title: 'Bubata site na China & Ree na WhatsApp',
        modules: [
          { id: 201, title: 'Etu Esi Achọta Ngwongwo Na-ere Ọsọ nke Ndị Naịjịrịa Chọrọ' },
          { id: 202, title: 'Ebe Ị Ga-azụta Na-adịghị Oke Ọnụ: 1688, Alibaba & Ndị Na-eweta Ngwongwo Ezoro Ezo' },
          { id: 203, title: 'Mbupu & Nnyefe: Etu Esi Ebubata n\'Enweghị Nsogbu' },
          { id: 204, title: 'Etu Esi Emegharị Ahịa & Ree NGWA NGWA na WhatsApp & Instagram' },
          { id: 205, title: 'Ndụmọdụ Maka Ịkpa Ọnụ Ahịa, Uru & Ọrụ Ndị Ahịa Ka Ire Ahịa Na-abịa' }
        ]
      }
    }
  }
};
