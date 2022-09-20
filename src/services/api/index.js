const API = process.env.NEXT_PUBLIC_API_URL;

const endPoints = {
  users: {
    add: `${API}/users`,
    login: `${API}/loginuserpublic`,
    profile: `${API}/profile`,
    api: `${API}/users`,
  },
  orders: {
    api: `${API}/orders`,
  },
};

export default endPoints;
