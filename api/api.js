export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl.replace(/\/$/, "");
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return res
      .json()
      .then((err) =>
        Promise.reject(
          `Error ${res.status}: ${err.message || JSON.stringify(err)}`
        )
      )
      .catch(() => Promise.reject(`Error ${res.status}`));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  async setUserInfo({ name, about }) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
    return this._checkResponse(res);
  }
}
