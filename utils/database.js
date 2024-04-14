const mongoose = require('mongoose');

require('dotenv').config();

main()
  .then(console.log('Successfully connected to the DB'))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}
