import { faker } from '@faker-js/faker';

/**
 * Centralized test data factory.
 * Extend with domain-specific builders (customer, payment, account, etc.).
 */
export class TestDataFactory {
  static user(overrides: Partial<UserData> = {}): UserData {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      phone: faker.phone.number({ style: 'national' }),
      password: faker.internet.password({ length: 12 }),
      ...overrides,
    };
  }

  static address(overrides: Partial<AddressData> = {}): AddressData {
    return {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      zip: faker.location.zipCode(),
      country: 'CA',
      ...overrides,
    };
  }

  static company(overrides: Partial<CompanyData> = {}): CompanyData {
    return {
      name: faker.company.name(),
      registrationNumber: faker.string.alphanumeric(10).toUpperCase(),
      email: faker.internet.email().toLowerCase(),
      ...overrides,
    };
  }

  static uniqueId(prefix = 'test'): string {
    return `${prefix}_${Date.now()}_${faker.string.alphanumeric(6)}`;
  }

  static randomInt(min: number, max: number): number {
    return faker.number.int({ min, max });
  }

  static futureDate(days = 30): Date {
    return faker.date.soon({ days });
  }

  static pastDate(days = 30): Date {
    return faker.date.recent({ days });
  }
}

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface AddressData {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface CompanyData {
  name: string;
  registrationNumber: string;
  email: string;
}

export default TestDataFactory;
