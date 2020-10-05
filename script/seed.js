'use strict'

const db = require('../server/db')
const {User, Recipe} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
  ])

  const recipes = await Promise.all([
    Recipe.create({
      userId: 1,
      food: 'pho',
      ingredients: [
        {
          name: 'white onion',
          measure: {amount: 1, name: 'whole', cups: 0},
          line: '1 large white onion, peeled and halved',
        },
        {
          name: 'ginger',
          measure: {amount: 3, name: 'whole', cups: 3},
          line: '3-inch piece of fresh ginger, halved lengthwise',
        },
        {
          name: 'star anise',
          measure: {amount: 5, name: 'whole', cups: 0.1041665},
          line: '5 star anise',
        },
        {
          name: 'cloves',
          measure: {amount: 4, name: 'whole', cups: 0},
          line: '4 whole cloves',
        },
        {
          name: 'cinnamon',
          measure: {amount: 3, name: 'whole', cups: 0.0624999},
          line: '3 (3-inch) cinnamon sticks',
        },
        {
          name: 'cardamom pods',
          measure: {amount: 2, name: 'whole', cups: 0},
          line: '2 cardamom pods',
        },
        {
          name: 'coriander seeds',
          comment: 'whole',
          measure: {amount: 1, name: 'tablespoon', cups: 0.0625},
          line: '1 tablespoon whole coriander seeds',
        },
        {
          name: 'beef stock',
          comment: 'good quality',
          measure: {amount: 8, name: 'cups', cups: 8},
          line:
            '8 cups good-quality beef stock (or chicken or vegetable stock)',
        },
        {
          name: 'brown sugar',
          measure: {amount: 1, name: 'tablespoon', cups: 0.0625},
          line: '1 tablespoon brown sugar',
        },
        {
          name: 'fish sauce',
          measure: {amount: 2, name: 'teaspoons', cups: 0.041666},
          line: '2 teaspoons fish sauce',
        },
        {
          name: 'steak',
          comment: 'raw',
          measure: {amount: 8, name: 'ounces', cups: 1.13398},
          line:
            '8 ounces raw steak, very thinly sliced (or chicken, pork, or shrimp -- see notes below)',
        },
        {
          name: 'rice noodles',
          comment: 'uncooked thin',
          measure: {amount: 7, name: 'ounces', cups: 0.9922325},
          line: '7 ounces uncooked thin rice noodles',
        },
      ],
    }),
    Recipe.create({
      userId: 1,
      food: 'pho',
      ingredients: [
        {
          name: 'onions',
          measure: {amount: 2, name: 'whole', cups: 0},
          line: '2  large onions (, halved)',
        },
        {
          name: 'star anise',
          measure: {amount: 10, name: 'whole', cups: 0.208333},
          line: '10  star anise',
        },
        {
          name: 'cinnamon',
          measure: {amount: 4, name: 'whole', cups: 0.0833332},
          line: '4  cinnamon quills',
        },
        {
          name: 'cloves',
          measure: {amount: 3, name: 'whole', cups: 0},
          line: '3  cloves ((the spice cloves!))',
        },
        {
          name: 'coriander seeds',
          measure: {amount: 6, name: 'tbsp', cups: 0.375},
          line: '1.5 tbsp coriander seeds',
        },
        {
          name: 'beef brisket',
          measure: {amount: 1, name: 'whole', cups: 0},
          line: '1.5kg / 3lb   beef brisket',
        },
        {
          name: 'water',
          measure: {amount: 8, name: 'quarts', cups: 32},
          line: '3.5 litres / 3.75 quarts   water ((15 cups))',
        },
        {
          name: 'sugar',
          comment: 'white',
          measure: {amount: 2, name: 'tbsp', cups: 0.125},
          line: '2 tbsp white sugar',
        },
        {
          name: 'salt',
          measure: {amount: 1, name: 'tbsp', cups: 0.0625},
          line: '1 tbsp salt',
        },
        {
          name: 'rice',
          comment: 'dried',
          measure: {amount: 5, name: 'oz', cups: 1.589097533632287},
          line:
            '50g / 1.5 oz   dried rice sticks ((or 120g/4oz fresh) (Note 3))',
        },
        {
          name: 'brisket',
          measure: {amount: 8, name: 'whole', cups: 0},
          line: '3 - 5  brisket slices ((used for broth))',
        },
        {
          name: 'thai basil',
          measure: {amount: 8, name: 'whole', cups: 0.1666664},
          line: 'Thai basil, 3 - 5 sprigs',
        },
      ],
    }),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${recipes.length} recipes`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
