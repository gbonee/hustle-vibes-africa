
import { Course } from '@/types/course';

// Mock course data with translations
export const courses: Record<string, Course> = {
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
      { id: 101, title: 'Intro to Baking as a Business in Nigeria', hasVideo: false, completed: true, locked: false },
      { id: 102, title: 'How to Make Puff-Puff That Sells', hasVideo: true, completed: false, locked: false },
      { id: 103, title: 'How to Make Nigerian Meatpie', hasVideo: false, completed: false, locked: true },
      { id: 104, title: 'Branding & Packaging for Pastry Biz', hasVideo: true, completed: false, locked: true },
      { id: 105, title: 'How to Find Your First Customers & Start Selling', hasVideo: true, completed: false, locked: true }
    ],
    translations: {
      pidgin: {
        title: 'Start Pastry Business From Your Kitchen',
        modules: [
          { id: 101, title: 'Introduction to Baking as Business for Nigeria' },
          { id: 102, title: 'How to Make Puff-Puff Wey Go Sell Well-well' },
          { id: 103, title: 'How to Make Nigerian Meatpie' },
          { id: 104, title: 'Branding & Packaging for Pastry Business' },
          { id: 105, title: 'How to Find Your First Customers & Begin Sell' }
        ]
      },
      yoruba: {
        title: 'Bẹrẹ Iṣẹ́ àwọn oúnjẹ adùn láti inú kíchẹ́ẹ̀nì rẹ',
        modules: [
          { id: 101, title: 'Ìfihan sí Ìdáná gẹ́gẹ́ bí Iṣẹ́ ní Nàìjíríà' },
          { id: 102, title: 'Báwo ni o ṣe le ṣe Puff-Puff tí yóò tà' },
          { id: 103, title: 'Báwo ni o ṣe le ṣe Ẹran-àkàrà Nàìjíríà' },
          { id: 104, title: 'Àmì & Ipèsè fún Iṣẹ́ Ìdáná' },
          { id: 105, title: 'Báwo ni o ṣe le rí àwọn Oníbàárà àkọ́kọ́ rẹ & Bẹrẹ Títà' }
        ]
      },
      hausa: {
        title: 'Fara Harkar Abinci Mai Zaki Daga Dakin Girkinki',
        modules: [
          { id: 101, title: 'Gabatarwa zuwa Gashin Burodi a matsayin Kasuwanci a Najeriya' },
          { id: 102, title: 'Yadda ake yin Puff-Puff da ke sayarwa' },
          { id: 103, title: 'Yadda ake yin Meatpie na Najeriya' },
          { id: 104, title: 'Branding & Packaging domin Kasuwancin Pastry' },
          { id: 105, title: 'Yadda ake samun Masu Sayayya na Farko & Fara Sayarwa' }
        ]
      },
      igbo: {
        title: "Malite azumaahia pastry site na ulo nri gi",
        modules: [
          { id: 101, title: "Mmalite na ihe mgbaka di ka azumaahia na Naijiria" },
          { id: 102, title: "Otu e si eme puff-puff nke na-ere ere" },
          { id: 103, title: "Otu e si eme Meatpie Naijiria" },
          { id: 104, title: "Branding & Packaging maka azumaahia Pastry" },
          { id: 105, title: "Otu iga achota ndi ahia mbu gi & malite ire" }
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
      { id: 201, title: 'How to Find Hot-Selling Products Nigerians Want', hasVideo: false, completed: true, locked: false },
      { id: 202, title: 'Where to Buy Cheap: 1688, Alibaba & Hidden Supplier Hacks', hasVideo: true, completed: false, locked: false },
      { id: 203, title: 'Shipping & Delivery: How to Import Without Wahala', hasVideo: false, completed: false, locked: true },
      { id: 204, title: 'How to Market & Sell FAST on WhatsApp & Instagram', hasVideo: true, completed: false, locked: true },
      { id: 205, title: 'Pricing, Profit & Customer Service Tips to Keep Sales Coming', hasVideo: false, completed: false, locked: true }
    ],
    translations: {
      pidgin: {
        title: 'Import From China & Sell for WhatsApp',
        modules: [
          { id: 201, title: 'How to Find Hot-Selling Products Wey Nigerians Want' },
          { id: 202, title: 'Where to Buy Cheap: 1688, Alibaba & Hidden Supplier Hacks' },
          { id: 203, title: 'Shipping & Delivery: How to Import Without Wahala' },
          { id: 204, title: 'How to Market & Sell FAST for WhatsApp & Instagram' },
          { id: 205, title: 'Pricing, Profit & Customer Service Tips to Keep Sales Coming' }
        ]
      },
      yoruba: {
        title: 'Mú wá láti Ṣáínà & Ta lórí WhatsApp',
        modules: [
          { id: 201, title: 'Báwo ni o ṣe le rí àwọn ọjà tí ń tà gbòógì tí àwọn ará Nàìjíríà fẹ́' },
          { id: 202, title: 'Níbo ni o le rà ní ìdíẹ̀: 1688, Alibaba & àwọn èdí àwọn olùpèsè' },
          { id: 203, title: 'Ìfiránṣẹ́ & Ìfì ránṣẹ́: Báwo ni o ṣe le mú wọlé láìsí wàhálà' },
          { id: 204, title: 'Báwo ni o ṣe le polowo & tà KÍÁKÍÁ lórí WhatsApp & Instagram' },
          { id: 205, title: 'Àwọn ìdámọ̀ràn Ìdíyelé, Èrè & Iṣẹ́ Oníbàárà láti jẹ́ kí àwọn ìtàjà máa bá wọlé' }
        ]
      },
      hausa: {
        title: 'Shigo daga China & Sayar a WhatsApp',
        modules: [
          { id: 201, title: 'Yadda ake samun kayayyakin da ke sayarwa masu zafi wanda Najeriawan ke so' },
          { id: 202, title: 'Inda za a saya a arha: 1688, Alibaba & hanyoyin samun masu samar da kaya na asiri' },
          { id: 203, title: 'Jigilar kaya & Isar: Yadda ake shigo ba tare da wahala ba' },
          { id: 204, title: 'Yadda ake tallata & sayar da SAURI a WhatsApp & Instagram' },
          { id: 205, title: 'Shawarwari game da farashin, riba & hidimar abokin ciniki don ci gaba da sayarwa' }
        ]
      },
      igbo: {
        title: "Bubata site na China & Ree na WhatsApp",
        modules: [
          { id: 201, title: "Otu iga achota ngwa ahia ndi na-ere oku ndi Naijiria choro" },
          { id: 202, title: "Ebe i ga-azuta onu ala: 1688, Alibaba & usoro nzuzo nke ndi na-eweta ngwa ahia" },
          { id: 203, title: "Mbupu & Nnyefe: Otu e si ebubata na-enwegh nsogbu" },
          { id: 204, title: "Otu e si eme mgbasa ozi & ree NGWA NGWA na WhatsApp & Instagram" },
          { id: 205, title: "Ndumoodu maka iko ugwo, uru & oru ndi ahia iji na-eleta ahia" }
        ]
      }
    }
  }
};
