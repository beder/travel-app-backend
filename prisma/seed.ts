import { PrismaClient, Prisma } from '@prisma/client';
import { hashPassword } from '../src/auth/utils/hashPassword';

const prisma = new PrismaClient();

const roleData: Prisma.RoleCreateInput[] = [
  {
    name: 'admin',
    users: {
      create: {
        email: 'admin@example.com',
        password: hashPassword('admin'),
      },
    },
  },
  {
    name: 'editor',
    users: {
      create: {
        email: 'editor@example.com',
        password: hashPassword('editor'),
      },
    },
  },
];

const travelData: Prisma.TravelCreateInput[] = [
  {
    slug: 'jordan-360',
    name: 'Jordan 360°',
    description:
      'Jordan 360°: the perfect tour to discover the suggestive Wadi Rum desert, the ancient beauty of Petra, and much more.\n\nVisiting Jordan is one of the most fascinating things that everyone has to do once in their life.You are probably wondering "Why?". Well, that\'s easy: because this country keeps several passions! During our tour in Jordan, you can range from well-preserved archaeological masterpieces to trekkings, from natural wonders excursions to ancient historical sites, from camels trek in the desert to some time to relax.\nDo not forget to float in the Dead Sea and enjoy mineral-rich mud baths, it\'s one of the most peculiar attractions. It will be a tour like no other: this beautiful country leaves a memorable impression on everyone.',
    numberOfDays: 8,
    isPublic: true,
    moods: {
      nature: 80,
      relax: 20,
      history: 90,
      culture: 30,
      party: 10,
    },
    tours: {
      create: [
        {
          name: 'ITJOR20211101',
          startingDate: new Date('2021-11-01'),
          endingDate: new Date('2021-11-09'),
          price: 199900,
        },
        {
          name: 'ITJOR20211112',
          startingDate: new Date('2021-11-12'),
          endingDate: new Date('2021-11-20'),
          price: 189900,
        },
        {
          name: 'ITJOR20211125',
          startingDate: new Date('2021-11-25'),
          endingDate: new Date('2021-12-03'),
          price: 214900,
        },
      ],
    },
  },
  {
    slug: 'iceland-hunting-northern-lights',
    name: 'Iceland: hunting for the Northern Lights',
    description:
      "Why visit Iceland in winter? Because it is between October and March that this land offers the spectacle of the Northern Lights, one of the most incredible and magical natural phenomena in the world, visible only near the earth's two magnetic poles. Come with us on WeRoad to explore this land of ice and fire, full of contrasts and natural variety, where the energy of waterfalls and geysers meets the peace of the fjords... And when the ribbons of light of the aurora borealis twinkle in the sky before our enchanted eyes, we will know that we have found what we were looking for.",
    numberOfDays: 8,
    isPublic: true,
    moods: {
      nature: 100,
      relax: 30,
      history: 10,
      culture: 20,
      party: 10,
    },
    tours: {
      create: [
        {
          name: 'ITICE20211101',
          startingDate: new Date('2021-11-01'),
          endingDate: new Date('2021-11-08'),
          price: 199900,
        },
      ],
    },
  },
  {
    slug: 'united-arab-emirates',
    name: 'United Arab Emirates: from Dubai to Abu Dhabi',
    description:
      'At Dubai and Abu Dhabi everything is huge and majestic: here futuristic engineering works and modern infrastructures meet historical districts, local souks (typical bazars), desert and the sea. In this tour we’ll discover Dubai, where we’ll get on top of the highest skyscraper ever built, the Burj Khalifa. We’ll then take a walk at the Dubai Mall, the biggest mall on the planet, and we’ll spend a night in the desert, with the sight of the skyline on the horizon keeping us company. Then, it will be Abu Dhabi’s tourn! Sheik Zayed’s Grand Mosque’s white marble awaits for us to remain stoked in front of its wonderfulness, and the sea will invade us with peacefulness. UAE are all to discover, we’ll just get a taste of it, but we guarantee you’ll get quite the idea!',
    numberOfDays: 7,
    isPublic: true,
    moods: {
      nature: 30,
      relax: 40,
      history: 20,
      culture: 80,
      party: 70,
    },
    tours: {
      create: [
        {
          name: 'ITARA20211221',
          startingDate: new Date('2021-12-21'),
          endingDate: new Date('2021-12-28'),
          price: 189900,
        },
        {
          name: 'ITARA20211222',
          startingDate: new Date('2022-01-03'),
          endingDate: new Date('2022-01-10'),
          price: 149900,
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const data of roleData) {
    const role = await prisma.role.create({ data });
    console.log(`Created role with id: ${role.id}`);
  }

  for (const data of travelData) {
    const travel = await prisma.travel.create({ data });
    console.log(`Created travel with id: ${travel.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
