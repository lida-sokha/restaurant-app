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
        image_url: 'https://example.com/images/pepperoni_pizza.jpg',
        is_available: true,
      },
      {
        name: 'Homemade Tiramisu',
        description: 'Layers of coffee-soaked ladyfingers, mascarpone cheese, and cocoa powder.',
        price: 7.25,
        category: 'Dessert',
        image_url: 'https://example.com/images/tiramisu.jpg',
        is_available: true,
      },
      {
        name: 'Fresh Orange Juice',
        description: 'Freshly squeezed orange juice, a perfect start to your day.',
        price: 4.00,
        category: 'Drinks/Alcohol',
        image_url: 'https://example.com/images/orange_juice.jpg',
        is_available: true,
      },
      {
        name: 'Grilled Salmon Fillet',
        description: 'Pan-seared salmon served with roasted asparagus and lemon-dill sauce.',
        price: 22.00,
        category: 'Main Course',
        image_url: 'https://example.com/images/grilled_salmon.jpg',
        is_available: true,
      },
      {
        name: 'Vegetable Spring Rolls',
        description: 'Crispy spring rolls filled with mixed vegetables, served with sweet chili sauce.',
        price: 9.00,
        category: 'Appetizer & Salads',
        image_url: 'https://example.com/images/spring_rolls.jpg',
        is_available: true,
      },
      {
        name: 'BBQ Chicken Pizza',
        description: 'Tender BBQ chicken, red onions, cilantro, and mozzarella on a smoky BBQ base.',
        price: 18.25,
        category: 'Pizza',
        image_url: 'https://example.com/images/bbq_chicken_pizza.jpg',
        is_available: true,
      },
      {
        name: 'New York Cheesecake',
        description: 'Classic creamy cheesecake with a graham cracker crust, topped with berry compote.',
        price: 7.75,
        category: 'Dessert',
        image_url: 'https://example.com/images/cheesecake.jpg',
        is_available: true,
      },
      {
        name: 'Craft Beer Selection (Pint)',
        description: 'Rotating selection of local craft beers. Ask your server for today\'s tap list.',
        price: 7.50,
        category: 'Drinks/Alcohol',
        image_url: 'https://example.com/images/craft_beer.jpg',
        is_available: true,
      },
      {
        name: 'Mushroom Risotto',
        description: 'Creamy Arborio rice cooked with wild mushrooms, Parmesan, and truffle oil.',
        price: 19.50,
        category: 'Main Course',
        image_url: 'https://example.com/images/mushroom_risotto.jpg',
        is_available: true,
      },
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