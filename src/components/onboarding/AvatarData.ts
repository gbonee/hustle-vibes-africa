
type Avatar = 'digital-mama' | 'baker-amara' | 'uncle-musa';
type Course = 'digital-marketing' | 'pastry-biz' | 'importation';

export interface AvatarInfo {
  id: Avatar;
  name: string;
  role: string;
  image: string;
  course: Course;
  intro: {
    pidgin: string;
    yoruba: string;
    hausa: string;
    igbo: string;
  };
}

export const avatars: AvatarInfo[] = [
  {
    id: 'digital-mama',
    name: 'Digital Mama',
    role: 'Digital Marketing Expert',
    image: 'https://img.freepik.com/premium-photo/mature-elderly-black-woman-wearing-traditional-nigerian-clothes-african-american-grandmother-is_777271-18892.jpg',
    course: 'digital-marketing',
    intro: {
      pidgin: "Ah! You don choose Digital Mama? Oya let's go hustle money online sharp sharp. You no go carry last!",
      yoruba: "Ẹ ku àbọ̀! Mo ni Digital Mama. A ti ṣetan lati kọ́ ọ bi o ṣe le ṣiṣẹ́ lori ayelujara.",
      hausa: "Barka! Ni ne Digital Mama. Mun shirya mu koya maka yadda zaka samu kuɗi ta yanar gizo.",
      igbo: "Nnọọ! Abụ m Digital Mama. Anyị kwadebere ịkụzi gị ka ị na-akpata ego n'Intanet."
    }
  },
  {
    id: 'baker-amara',
    name: 'Baker Amara',
    role: 'Pastry Business Expert',
    image: 'https://media.istockphoto.com/id/1269519579/photo/small-bakery-shop-owner-standing-in-front-of-store.jpg?s=612x612&w=0&k=20&c=h0Hu3UFEREi-V186FkkoQGNQYkBbOn9fkj_FJ2q3rPU=',
    course: 'pastry-biz',
    intro: {
      pidgin: "You wan bake like pro? Baker Amara don land! Make I show you how to hammer with puff-puff and meat pie business!",
      yoruba: "Ṣe o fẹ́ bake bí aláṣẹ? Baker Amara ti dé! Jẹ́ kí n fi hàn ọ́ bí o ṣe le ná ìdí olówó pẹ̀lú puff-puff àti meat pie!",
      hausa: "Kana son yin baking kamar ɗan gaskiya? Baker Amara ta iso! Bari in nuna maka yadda zaka samu kuɗi da puff-puff da meat pie!",
      igbo: "Ị chọrọ isi nri dị ka ọkachamara? Baker Amara abịala! Ka m gosi gị ka ị ga-esi nweta ego site na ahịa puff-puff na meat pie!"
    }
  },
  {
    id: 'uncle-musa',
    name: 'Uncle Musa',
    role: 'Importation & Sales Guru',
    image: 'https://media.istockphoto.com/id/1296271163/photo/confident-businessman-with-arms-crossed.jpg?s=612x612&w=0&k=20&c=StyHxyC8uUIVVV4UFHb141gIahiNr0fKurV-fiNb2oU=',
    course: 'importation',
    intro: {
      pidgin: "Uncle Musa for your service! You go learn how to import goods from China come make heavy money for Nigeria. No long talk, na action!",
      yoruba: "Uncle Musa ni mi! O ma kọ́ bi o ṣe le gbe ọjà wọle lati China lati ṣe owo nla ni Naijiria. Ko si ọrọ pipẹ, iṣe ni!",
      hausa: "Uncle Musa nake! Za ka koyi yadda za ka kawo kaya daga China don samun kuɗi a Nigeria. Ba magana mai yawa, aiki kawai!",
      igbo: "Abụ m Uncle Musa! Ị ga-amụta otu ị ga-esi bubata ngwongwo site na China wee na-eme ego ukwuu na Naịjirịa. Ọ bụghị okwu ogologo, ọ bụ omume!"
    }
  }
];
