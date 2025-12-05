export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
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

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, about }),
    }).then((res) => this._checkResponse(res));
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  createCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    }).then(this._checkResponse);
  }

  toggleLike(cardId, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";

    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method,
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // dentro de class Api { ... }
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
}
