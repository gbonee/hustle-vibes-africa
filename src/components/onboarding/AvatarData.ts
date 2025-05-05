
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
    image: 'https://images.unsplash.com/photo-1581329957093-92a8a36121ff?q=80&w=687&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1470&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1621788641723-00348d55982e?q=80&w=1287&auto=format&fit=crop',
    course: 'importation',
    intro: {
      pidgin: "Uncle Musa for your service! You go learn how to import goods from China come make heavy money for Nigeria. No long talk, na action!",
      yoruba: "Uncle Musa ni mi! O ma kọ́ bi o ṣe le gbe ọjà wọle lati China lati ṣe owo nla ni Naijiria. Ko si ọrọ pipẹ, iṣe ni!",
      hausa: "Uncle Musa nake! Za ka koyi yadda za ka kawo kaya daga China don samun kuɗi a Nigeria. Ba magana mai yawa, aiki kawai!",
      igbo: "Abụ m Uncle Musa! Ị ga-amụta otu ị ga-esi bubata ngwongwo site na China wee na-eme ego ukwuu na Naịjirịa. Ọ bụghị okwu ogologo, ọ bụ omume!"
    }
  }
];
