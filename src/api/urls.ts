export const urls = {
  products: {
    // can GET and POST
    all: "/products",
    // can GET, PUT, and DELETE
    byId: (id: string) => `/products/${id}`,
  },
  carts: {
    // can GET and POST
    all: "/carts",
    // can GET, PUT, and DELETE
    byId: (id: string) => `/carts/${id}`,
  },
  users: {
    // can GET and POST
    all: "/users",
    // can GET, PUT, and DELETE
    byId: (id: string) => `/users/${id}`,
  },
  auth: "/auth/login",
};
