export default class UserInfo {
  constructor({ nameSelector, professionSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._professionElement = document.querySelector(professionSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      profession: this._professionElement.textContent,
    };
  }

  setUserInfo({ name, profession }) {
    this._nameElement.textContent = name;
    this._professionElement.textContent = profession;
  }
}

fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
  headers: {
    authorization: "deef7c77-f9e7-4733-81e9-ce1d4b6db3d3",
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });

fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
  method: "PATCH",
  headers: {
    authorization: "deef7c77-f9e7-4733-81e9-ce1d4b6db3d3",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: " Osvaldo Ochoa",
    about: "Desarrollador Web Jr",
  }),
});
