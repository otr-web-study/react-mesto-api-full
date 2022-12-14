class Auth {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.text()
      .then(text => Promise.reject(`Ошибка: ${res.status}: ${text}`));
  }

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({email, password}),
    }).then(this._handleResponse);
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({email, password}),
    }).then(this._handleResponse);
  }

  checkJWT(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {...this._headers, ...{"Authorization": `Bearer ${jwt}`}}
    }).then(this._handleResponse);
  }
}

const auth = new Auth({
  baseUrl: "https://api.frontend.otrproject.nomoredomains.sbs",
  headers: {
    "Content-Type": "application/json"
  }
});

export default auth;