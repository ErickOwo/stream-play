const API = process.env.NEXT_PUBLIC_API_URL;

const endPoints = {
  users: {
    add: `${API}/users`,
    login: `${API}/loginuserpublic`,
    profile: `${API}/profile`,
    api: `${API}/users`,
    recoverPassword: `${API}/users/recoverpassword`,
    changePassword: `${API}/users/changepassword`,
  },
  orders: {
    api: `${API}/orders`,
  },
  passwords: {
    api: `${API}/passwords`,
  },
};

export default endPoints;
