import {
  Project,
  Customer,
  CustomerSignInResult,
  CustomerDraft,
} from '@commercetools/platform-sdk/dist/declarations/src/generated';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { type returnType } from '@/types/apiClient';
export class API {
  private client: ByProjectKeyRequestBuilder;
  static limit = 100;
  constructor(client: ByProjectKeyRequestBuilder) {
    this.client = client;
  }
  async getProject() {
    let result = {} as Project;
    try {
      const { body } = await this.client.get().execute();
      result = body;
    } catch (error) {
      console.log(error);
    }
    return result;
  }
  async getCategories() {
    let errorMsg = '';
    try {
      const { body } = await this.client
        .categories()
        .get({
          queryArgs: {
            sort: 'orderHint asc',
          },
        })
        .execute();
      const result = body.results;
      return { data: result, error: errorMsg };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async getProductsByCat(catId: string) {
    let errorMsg = '';
    try {
      const respsone = await this.client
        .productProjections()
        .search()
        .get({
          queryArgs: {
            limit: API.limit,
            facet: ['variants.attributes.color.en', 'variants.price.centAmount'],
            filter: [`categories.id:subtree("${catId}")`],
          },
        })
        .execute();
      console.log('CAT', respsone.body);
      const result = respsone;
      return { data: result.body.results, error: errorMsg };
    } catch (error) {
      console.log('error', error);
      console.log(error);
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }
  async getProductsWithFilter(filter: string[], sort: string, search: string = '') {
    let errorMsg = '';
    try {
      const respsone = await this.client
        .productProjections()
        .search()
        .get({
          queryArgs: {
            'text.en': search,
            fuzzy: true,
            sort,
            limit: API.limit,
            'filter.query': filter,
          },
        })
        .execute();
      const result = respsone;
      return { data: result.body.results, error: errorMsg };
    } catch (error) {
      console.log('error', error);
      console.log(error);
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }
  async getProductsBySearch(search: string) {
    let errorMsg = '';
    try {
      const respsone = await this.client
        .productProjections()
        .search()
        .get({
          queryArgs: {
            'text.en': search,
            limit: API.limit,
          },
        })
        .execute();
      console.log('SEARCH', respsone.body);
      const result = respsone;
      return { data: result.body.results, error: errorMsg };
    } catch (error) {
      console.log('error', error);
      console.log(error);
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async getProducts() {
    let errorMsg = '';
    try {
      const { body } = await this.client
        .productProjections()
        .search()
        .get({
          queryArgs: {
            limit: API.limit,
            facet: [
              'variants.attributes.color.en',
              'variants.attributes.size.en',
              'variants.attributes.gender.en',
              'variants.attributes.designer.en',
              'variants.price.centAmount',
            ],
          },
        })
        .execute();
      return { data: body, error: errorMsg };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async getCustomers(ID: string) {
    let result = {} as Customer;
    try {
      const { body } = await this.client.customers().withId({ ID }).get().execute();
      result = body;
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  async createCustomer(customer: CustomerDraft): returnType<CustomerSignInResult> {
    let errorMsg = '';
    try {
      const result = await this.client.customers().post({ body: customer }).execute();
      return { data: result.body, error: errorMsg };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }
  async signIn(credentials: { email: string; password: string }): returnType<CustomerSignInResult> {
    let errorMsg = '';
    try {
      const result = await this.client.me().login().post({ body: credentials }).execute();
      return { data: result.body, error: errorMsg };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async signInByToken() {
    const result: Customer = {} as Customer;
    try {
      const result = await this.client.me().get().execute();
      return result.body;
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  async createCart() {
    let result = {};
    try {
      const { body } = await this.client
        .me()
        .carts()
        .post({
          body: {
            currency: 'EUR',
          },
        })
        .execute();

      result = body;
    } catch (error) {
      console.log(error);
    }
    return result;
  }
  async setCustomerFirstName(ID: string, firstName: string, version = 1) {
    let result = {};
    try {
      const { body } = await this.client
        .customers()
        .withId({ ID })
        .post({
          body: { version, actions: [{ action: 'setFirstName', firstName: firstName }] },
        })
        .execute();

      result = body;
    } catch (error) {
      console.log(error);
    }
    console.log(result);
    return result;
  }

  async setCustomerLastName(ID: string, lastName: string, version = 1) {
    let result = {};
    try {
      const { body } = await this.client
        .customers()
        .withId({ ID })
        .post({
          body: { version, actions: [{ action: 'setLastName', lastName: lastName }] },
        })
        .execute();

      result = body;
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  async setCustomerEmail(ID: string, email: string, version = 1) {
    let result = {};
    try {
      const { body } = await this.client
        .customers()
        .withId({ ID })
        .post({
          body: { version, actions: [{ action: 'changeEmail', email: email }] },
        })
        .execute();

      result = body;
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  async setCustomerDateOfBirth(ID: string, date: string, version = 1) {
    let result = {};
    try {
      const { body } = await this.client
        .customers()
        .withId({ ID })
        .post({
          body: { version, actions: [{ action: 'setDateOfBirth', dateOfBirth: date }] },
        })
        .execute();

      result = body;
    } catch (error) {
      console.log(error);
    }
    return result;
  }
  // async setCustomerBillingAddress(ID: string, address: string) {
  //   let result = {};
  //   try {
  //     const { body } = await this.client
  //       .customers()
  //       .withId({ ID })
  //       .post({
  //         body: { version, actions: [{ action: 'changeAddress', address: address }] },
  //       })
  //       .execute();

  //     result = body;
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   return result;
  // }

  async getProduct(ID: string) {
    let errorMsg = '';
    try {
      const { body } = await this.client.productProjections().withId({ ID }).get().execute();
      const result = body;
      return { data: result, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }
}
