import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// All data exported from the original LCF database
const data = require('/home/z/my-project/db-export.json');

async function main() {
  console.log('🌱 Starting database seed...\n');

  // 1. Admin Users
  console.log('--- Admin Users ---');
  for (const item of data.adminUser) {
    await prisma.adminUser.upsert({
      where: { pin: item.pin },
      update: { name: item.name, role: item.role },
      create: {
        id: item.id,
        name: item.name,
        pin: item.pin,
        role: item.role,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      },
    });
    console.log(`  ✓ ${item.name} (${item.role})`);
  }

  // 2. Sponsors
  console.log('\n--- Sponsors ---');
  for (const item of data.sponsor) {
    await prisma.sponsor.upsert({
      where: { id: item.id },
      update: { name: item.name, logo: item.logo, website: item.website, tier: item.tier, active: item.active, order: item.order },
      create: {
        id: item.id,
        name: item.name,
        logo: item.logo,
        website: item.website,
        tier: item.tier,
        active: item.active,
        order: item.order,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      },
    });
    console.log(`  ✓ ${item.name}`);
  }

  // 3. Tournaments
  console.log('\n--- Tournaments ---');
  for (const item of data.tournament) {
    await prisma.tournament.upsert({
      where: { id: item.id },
      update: {
        name: item.name,
        description: item.description,
        startDate: item.startDate ? new Date(item.startDate) : null,
        endDate: item.endDate ? new Date(item.endDate) : null,
        status: item.status,
        category: item.category,
        image: item.image,
      },
      create: {
        id: item.id,
        name: item.name,
        description: item.description,
        startDate: item.startDate ? new Date(item.startDate) : null,
        endDate: item.endDate ? new Date(item.endDate) : null,
        status: item.status,
        category: item.category,
        image: item.image,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      },
    });
    console.log(`  ✓ ${item.name} (${item.category})`);
  }

  // 4. Matches
  console.log('\n--- Matches ---');
  for (const item of data.match) {
    if (!item.id) continue;
    await prisma.match.upsert({
      where: { id: item.id },
      update: {
        tournamentId: item.tournamentId,
        homeTeam: item.homeTeam,
        awayTeam: item.awayTeam,
        homeScore: item.homeScore,
        awayScore: item.awayScore,
        matchDate: item.matchDate ? new Date(item.matchDate) : null,
        venue: item.venue,
        status: item.status,
        homeTeamLogo: item.homeTeamLogo,
        awayTeamLogo: item.awayTeamLogo,
      },
      create: {
        id: item.id,
        tournamentId: item.tournamentId,
        homeTeam: item.homeTeam,
        awayTeam: item.awayTeam,
        homeScore: item.homeScore,
        awayScore: item.awayScore,
        matchDate: item.matchDate ? new Date(item.matchDate) : null,
        venue: item.venue,
        status: item.status,
        homeTeamLogo: item.homeTeamLogo,
        awayTeamLogo: item.awayTeamLogo,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      },
    });
    console.log(`  ✓ ${item.homeTeam} vs ${item.awayTeam}`);
  }

  // 5. News
  console.log('\n--- News ---');
  for (const item of data.news) {
    await prisma.news.upsert({
      where: { id: item.id },
      update: {
        title: item.title,
        content: item.content,
        summary: item.summary,
        image: item.image,
        author: item.author,
        published: item.published,
        featured: item.featured,
        publishedAt: item.publishedAt ? new Date(item.publishedAt) : null,
      },
      create: {
        id: item.id,
        title: item.title,
        content: item.content,
        summary: item.summary,
        image: item.image,
        author: item.author,
        published: item.published,
        featured: item.featured,
        publishedAt: item.publishedAt ? new Date(item.publishedAt) : null,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      },
    });
    console.log(`  ✓ ${item.title}`);
  }

  // 6. Events
  console.log('\n--- Events ---');
  for (const item of data.event) {
    await prisma.event.upsert({
      where: { id: item.id },
      update: {
        title: item.title,
        description: item.description,
        date: item.date ? new Date(item.date) : null,
        endDate: item.endDate ? new Date(item.endDate) : null,
        location: item.location,
        image: item.image,
        eventType: item.eventType,
      },
      create: {
        id: item.id,
        title: item.title,
        description: item.description,
        date: item.date ? new Date(item.date) : null,
        endDate: item.endDate ? new Date(item.endDate) : null,
        location: item.location,
        image: item.image,
        eventType: item.eventType,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      },
    });
    console.log(`  ✓ ${item.title}`);
  }

  // 7. Carousel Slides
  console.log('\n--- Carousel Slides ---');
  for (const item of data.carouselSlide) {
    await prisma.carouselSlide.upsert({
      where: { id: item.id },
      update: {
        title: item.title,
        subtitle: item.subtitle,
        image: item.image,
        video: item.video,
        link: item.link,
        linkText: item.linkText,
        order: item.order,
        active: item.active,
      },
      create: {
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        image: item.image,
        video: item.video,
        link: item.link,
        linkText: item.linkText,
        order: item.order,
        active: item.active,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      },
    });
    console.log(`  ✓ ${item.title || '(sin título)'}`);
  }

  // 8. Info Cards
  console.log('\n--- Info Cards ---');
  for (const item of data.infoCard) {
    await prisma.infoCard.upsert({
      where: { id: item.id },
      update: {
        title: item.title,
        description: item.description,
        image: item.image,
        icon: item.icon,
        link: item.link,
        linkText: item.linkText,
        color: item.color,
        order: item.order,
        active: item.active,
      },
      create: {
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image,
        icon: item.icon,
        link: item.link,
        linkText: item.linkText,
        color: item.color,
        order: item.order,
        active: item.active,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      },
    });
    console.log(`  ✓ ${item.title}`);
  }

  // 9. Gallery Items
  console.log('\n--- Gallery Items ---');
  for (const item of data.galleryItem) {
    await prisma.galleryItem.upsert({
      where: { id: item.id },
      update: {
        title: item.title,
        description: item.description,
        image: item.image,
        category: item.category,
        order: item.order,
        active: item.active,
      },
      create: {
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image,
        category: item.category,
        order: item.order,
        active: item.active,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      },
    });
    console.log(`  ✓ ${item.title}`);
  }

  // 10. Schedule Files
  console.log('\n--- Schedule Files ---');
  for (const item of data.scheduleFile) {
    await prisma.scheduleFile.upsert({
      where: { id: item.id },
      update: {
        name: item.name,
        fileName: item.fileName,
        fileType: item.fileType,
        fileData: item.fileData,
        description: item.description,
        active: item.active,
      },
      create: {
        id: item.id,
        name: item.name,
        fileName: item.fileName,
        fileType: item.fileType,
        fileData: item.fileData,
        description: item.description,
        active: item.active,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      },
    });
    console.log(`  ✓ ${item.name}`);
  }

  // 11. Statistics Files
  console.log('\n--- Statistics Files ---');
  for (const item of data.statisticsFile) {
    await prisma.statisticsFile.upsert({
      where: { id: item.id },
      update: {
        name: item.name,
        fileName: item.fileName,
        fileType: item.fileType,
        fileData: item.fileData,
        description: item.description,
        active: item.active,
      },
      create: {
        id: item.id,
        name: item.name,
        fileName: item.fileName,
        fileType: item.fileType,
        fileData: item.fileData,
        description: item.description,
        active: item.active,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      },
    });
    console.log(`  ✓ ${item.name}`);
  }

  // 12. Resolutions
  console.log('\n--- Resolutions ---');
  for (const item of data.resolution) {
    await prisma.resolution.upsert({
      where: { id: item.id },
      update: {
        title: item.title,
        type: item.type,
        number: item.number,
        description: item.description,
        fileUrl: item.fileUrl,
        fileData: item.fileData,
        fileName: item.fileName,
        fileType: item.fileType,
        date: item.date ? new Date(item.date) : new Date(),
        active: item.active,
      },
      create: {
        id: item.id,
        title: item.title,
        type: item.type,
        number: item.number,
        description: item.description,
        fileUrl: item.fileUrl,
        fileData: item.fileData,
        fileName: item.fileName,
        fileType: item.fileType,
        date: item.date ? new Date(item.date) : new Date(),
        active: item.active,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      },
    });
    console.log(`  ✓ ${item.title}`);
  }

  // 13. Standings
  console.log('\n--- Standings ---');
  for (const item of data.standing) {
    if (!item.id) continue;
    await prisma.standing.upsert({
      where: { id: item.id },
      update: {
        teamName: item.teamName,
        teamLogo: item.teamLogo,
        category: item.category,
        played: item.played,
        won: item.won,
        drawn: item.drawn,
        lost: item.lost,
        goalsFor: item.goalsFor,
        goalsAgainst: item.goalsAgainst,
        points: item.points,
        order: item.order,
        active: item.active,
      },
      create: {
        id: item.id,
        teamName: item.teamName,
        teamLogo: item.teamLogo,
        category: item.category,
        played: item.played,
        won: item.won,
        drawn: item.drawn,
        lost: item.lost,
        goalsFor: item.goalsFor,
        goalsAgainst: item.goalsAgainst,
        points: item.points,
        order: item.order,
        active: item.active,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      },
    });
    console.log(`  ✓ ${item.teamName}`);
  }

  // 14. Top Scorers
  console.log('\n--- Top Scorers ---');
  for (const item of data.topScorer) {
    if (!item.id) continue;
    await prisma.topScorer.upsert({
      where: { id: item.id },
      update: {
        name: item.name,
        team: item.team,
        goals: item.goals,
        assists: item.assists,
        category: item.category,
        order: item.order,
        active: item.active,
      },
      create: {
        id: item.id,
        name: item.name,
        team: item.team,
        goals: item.goals,
        assists: item.assists,
        category: item.category,
        order: item.order,
        active: item.active,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      },
    });
    console.log(`  ✓ ${item.name}`);
  }

  // 15. Teams
  console.log('\n--- Teams ---');
  for (const item of data.team) {
    if (!item.id) continue;
    await prisma.team.upsert({
      where: { id: item.id },
      update: {
        name: item.name,
        logo: item.logo,
        city: item.city,
        category: item.category,
      },
      create: {
        id: item.id,
        name: item.name,
        logo: item.logo,
        city: item.city,
        category: item.category,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      },
    });
    console.log(`  ✓ ${item.name}`);
  }

  // 16. Social Media
  console.log('\n--- Social Media ---');
  for (const item of data.socialMedia) {
    if (!item.id) continue;
    await prisma.socialMedia.upsert({
      where: { id: item.id },
      update: {
        platform: item.platform,
        url: item.url,
        icon: item.icon,
        active: item.active,
        order: item.order,
      },
      create: {
        id: item.id,
        platform: item.platform,
        url: item.url,
        icon: item.icon,
        active: item.active,
        order: item.order,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      },
    });
    console.log(`  ✓ ${item.platform}: ${item.url}`);
  }

  console.log('\n✅ Seed completed successfully!');
  console.log('All data has been imported to the database.');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
