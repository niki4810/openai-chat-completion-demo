import { faker } from "@faker-js/faker";

export function generateMockContacts(count = 100) {
  const contacts = [];

  for (let i = 0; i < count; i++) {
    const hasMiddleName = faker.datatype.boolean(0.3); // 30% chance

    contacts.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      middleName: hasMiddleName ? faker.person.middleName() : null,

      address: {
        type: faker.helpers.arrayElement(["home", "office"]),
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state({ abbreviated: true }),
        zip: faker.location.zipCode(),
      },

      phone: {
        type: faker.helpers.arrayElement(["home", "office", "mobile"]),
        number: faker.phone.number(),
      },

      email: {
        type: faker.helpers.arrayElement(["office", "personal"]),
        address: faker.internet.email(),
      },

      dob: faker.date
        .birthdate({ min: 18, max: 80, mode: "age" })
        .toISOString(),

      occupation: faker.person.jobTitle(),

      profilePicture: faker.image.avatar(),
    });
  }

  return contacts;
}

console.log(JSON.stringify(generateMockContacts()));
