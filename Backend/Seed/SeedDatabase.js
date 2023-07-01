require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../Models/User');
const OU = require('../Models/OU');
const Division = require('../Models/Division');
const Credential = require('../models/Credential') 

const mongo = process.env.MONGO_URI;

mongoose.connect(mongo, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Error connecting to MongoDB', err));

const ous = [
    { name: 'News management' },
    { name: 'Software reviews' },
    { name: 'Hardware reviews' },
    { name: 'Opinion publishing' },
];

const divisionNames = ['Finance', 'IT', 'Development', 'Marketing', 'Sales', 'Human-Resources'];

// Seed the database with OUs, Divisions, and Users
async function seedDatabase() {
    try {
        // Delete all users, OUs, and Divisions
        await User.deleteMany({});
        await OU.deleteMany({});
        await Division.deleteMany({});
        console.log('Successful deletion');

        // Insert OUs
        const insertedOus = await OU.insertMany(ous);
        console.log('Ous inserted', insertedOus);

        // Generate and assign divisions to OUs
        for(let ou of insertedOus){
            for(let divisionName of divisionNames){
                const newDivision = new Division({
                    name: `${divisionName}-${ou.name}`,
                    OU: ou._id
                });
                await newDivision.save();
                ou.divisions.push(newDivision._id);
            }
            await ou.save();
        }

        console.log('Successfully assigned divisions to ous');

        // Get the inserted OUs with their divisions
        const populatedOus = await OU.find({}).populate('divisions');
    
        let numberOfUsers = 30;
    
        // Create a random list of users with random roles, divisions, and OUs
        for (let i = 0; i < numberOfUsers; i++) {
            // Random value variables
            const RandomOU = populatedOus[Math.floor(Math.random() * populatedOus.length)];
            const RandomDivision = RandomOU.divisions[Math.floor(Math.random() * RandomOU.divisions.length)];
            const randomRole = ['admin', 'manager', 'normal'][Math.floor(Math.random() * 3)];

            const user = await User.register(
                `user${i}`,
                `passw)id$D9rd${i}`,
                `user${i}@cooltech.com`,
                `User ${i}`
            );
            user.role = randomRole;
            user.divisions = [RandomDivision._id];
            user.OU = [RandomOU._id];
            await user.save();
            console.log('Users inserted', user);
        }
        console.log('Successful seeding of users');
    } catch (err){
        console.log('Error seeding database', err);
    } 
}

// Once OUs, Divisions and users have been seeded then seed credentials
async function seedCredentials() {
    try {
        await Credential.deleteMany({});
        console.log('Successful deletion');
        const users = await User.find({}).populate('OU').populate('divisions');
       // create credentials for each user
        for (let user of users) {
            // create an array of user credentials (credentialsInfo) and add to credential schema for each users cred.
            const credentialsArray = [];
            for (let i = 0; i < 3; i++) {
                credentialsArray.push({
                    username: `credential${user.username}${user._id}${i}`,
                    password: `password${user.username}${user._id}${i}`
                });
            }
            const credential = new Credential({
                user: user._id,
                credentials: credentialsArray,
                division: user.divisions.map(division => division._id),
                OU: user.OU.map(ou => ou._id)
            });
            await credential.save();
            console.log('Credentials inserted', credential);
        }
        console.log('Successful seeding of credentials');
    } catch(err) {
        console.log('Error seeding credentials', err);
    } 
 }
 
 

async function main() {
   try{
      await seedDatabase();
      await seedCredentials();
   } catch(err) {
      console.log('Error seeding database', err);
   } finally {
      mongoose.connection.close();
   }
   
   
}

main().catch(err => console.log(err));
