const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["error", "warn", "info"],
});

async function main() {
  prisma.$connect().then(() => {
    console.log("Connection established");
  }).catch(err=> console.log(err));
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

module.exports = {
  prisma,
};
