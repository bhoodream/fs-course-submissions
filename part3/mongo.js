const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as arguments");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb://bhoodream:${password}@rc1d-mfpf3ojizyfedsoi.mdb.yandexcloud.net:27018/fs-open?replicaSet=rs01&tls=true&tlsCAFile=/Users/vadimfedorov/.mongodb/root.crt`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const Person = mongoose.model(
  "Person",
  new mongoose.Schema({
    name: String,
    phone: String,
  })
);

if (process.argv.length === 3) {
  console.log("phonebook:");

  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.phone}`);
    });

    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const name = process.argv[3];
  const phone = process.argv[4];
  const person = new Person({ name, phone });

  person.save().then(() => {
    console.log(`added ${name} number ${phone} to phonebook`);

    mongoose.connection.close();
  });
} else {
  console.log("give bad params");
  process.exit(1);
}
