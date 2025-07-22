// seedMenu.js
const db = require('./models'); // This imports the db object from models/index.js
const { sequelize, Menu } = db; // Destructure sequelize and your Menu model from the db object

async function seedMenu() {
  try {
    // 1. Authenticate (test connection)
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // 2. Sync models (create tables if they don't exist)
    // IMPORTANT:
    // { force: true } will DROP and re-create the table. Use ONLY in development!
    // { alter: true } will try to make necessary changes to match the model. Use with caution.
    // No option will create if not exists, but won't alter existing.
    await sequelize.sync({ force: true }); // Using force:true for demonstration, be careful!
    console.log("Menu table (re-)created!");

    // Data to insert
    const menuItems = [
      {
        name: 'Classic Caesar Salad',
        description: 'Crisp romaine lettuce, croutons, Parmesan, and a creamy Caesar dressing.',
        price: 8.50,
        category: 'Appetizer & Salads',
        image_url: '/image/Classic Caesar Salad.jpg', 
        is_available: true,
      },
      {
        name: 'Spicy Pepperoni Pizza',
        description: 'Our classic pizza with spicy pepperoni, mozzarella, and a rich tomato sauce.',
        price: 16.75,
        category: 'Pizza',
        image_url: '/image/Spicy Pepperoni Pizza.jpeg',
        is_available: true,
      },
      {
        name:'Capricciosa Pizza',
        description:'A classic Italian pizza topped with artichokes, mushrooms, ham, and olives.',
        price: 17.50,
        category: 'Pizza',
        image_url: '/image/capricciosa_pizza.jpg',
        is_available: true,
      },
      {
        name: 'Homemade Tiramisu',
        description: 'Layers of coffee-soaked ladyfingers, mascarpone cheese, and cocoa powder.',
        price: 7.25,
        category: 'Dessert',
        image_url: '/image/Homemade Tiramisu.jpg',
        is_available: true,
      },
      {
        name: 'Fresh Orange Juice',
        description: 'Freshly squeezed orange juice, a perfect start to your day.',
        price: 4.00,
        category: 'Drinks/Alcohol',
        image_url: '/image/Fresh Orange Juice.jpg',
        is_available: true,
      },
      {
        name: 'Grilled Salmon Fillet',
        description: 'Pan-seared salmon served with roasted asparagus and lemon-dill sauce.',
        price: 15.00,
        category: 'Main Course',
        image_url: '/image/Grilled Salmon Fillet.jpg',
        is_available: true,
      },
      {
        name: 'Watermelon Feta',
        description: 'Refreshing watermelon cubes topped with feta cheese, mint, and a drizzle of balsamic glaze.',
        price: 5.00,
        category: 'Appetizer & Salads',
        image_url: '/image/Watermelon Feta.jpg',
        is_available: true,
      },
      {
        name: 'BBQ Chicken Pizza',
        description: 'Tender BBQ chicken, red onions, cilantro, and mozzarella on a smoky BBQ base.',
        price: 18.25,
        category: 'Pizza',
        image_url: '/image/BBQ Chicken Pizza.jpg',
        is_available: true,
      },
      {
        name: 'New York Cheesecake',
        description: 'Classic creamy cheesecake with a graham cracker crust, topped with berry compote.',
        price: 7.75,
        category: 'Dessert',
        image_url: '/image/New York Cheesecake.jpg',
        is_available: true,
      },
      {
        name: 'Craft Beer Selection (Pint)',
        description: 'Rotating selection of local craft beers. Ask your server for today\'s tap list.',
        price: 7.50,
        category: 'Drinks/Alcohol',
        image_url: '/image/Craft Beer Selection (Pint).jpg',
        is_available: true,
      },
      {
        name: 'Mushroom Risotto',
        description: 'Creamy Arborio rice cooked with wild mushrooms, Parmesan, and truffle oil.',
        price: 19.50,
        category: 'Main Course',
        image_url: '/image/Mushroom Risotto.jpg',
        is_available: true,
      },
      {
        name: 'ROAST BEEF SALAD',
        description: 'Tender slices of roast beef on a bed of mixed greens with balsamic vinaigrette.',
        price: 12.00,
        category: 'Appetizer & Salads',
        image_url: '/image/beef-salad.jpg',
        is_available: true,
      },
      {
        name:'French Onion Dip Cups',
        description:'hese tasty little cups are packed with warm, creamy and cheesy onion dip. ',
        price: 5.00,
        category:'Appetizer & Salads',
        image_url:'/image/French Onion Dip Cups.jpg',
        is_available: true,
      },
      {
        name:'TItalian Panzanella Salad',
        description:'Grated tomato adds a gentle acidity and chunky texture to the vinaigrette, helping it cling to every bite. ',
        price: 8.00,
        category:'Appetizer & Salads',
        image_url:'/image/Italian Panzanella Sallad.jpg',
        is_available: true,
      },
      {
        name:'Burrata Caprese',
        description:'This burrata Caprese elevates the classic Caprese salad with creamy burrata, fresh basil, and olive oil. A must-try Italian salad!.',
        price: 8.80,
        category:'Appetizer & Salads',
        image_url:'/image/burrata-caprese.jpg',
        is_available: true,
      }
    ];

    // 3. Insert the data
    const createdItems = await Menu.bulkCreate(menuItems);
    console.log(`${createdItems.length} menu items successfully inserted!`);

  } catch (error) {
    console.error('Error during menu seeding:', error);
  } finally {
    // 4. Close connection
    await sequelize.close();
    console.log('Database connection closed.');
  }
}

// Execute the seeding function
seedMenu();