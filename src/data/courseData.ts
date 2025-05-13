
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
      }
    }
  }
};
