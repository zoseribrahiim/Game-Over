// <reference types="../@types/jquery"/>
import { ui } from "./ui.js";
import { Details } from "./details.js";

let game = new ui();
let link = document.querySelectorAll(".nav-link");
let loading = document.querySelector(".spinnerr");

export class Games {
  constructor() {
    this.getgames("mmorpg");
    link.forEach((navLink) => {
      navLink.addEventListener("click", (eventInfo) => {
        document.querySelector(".active").classList.remove("active");
        eventInfo.target.classList.add("active");
        this.getgames(eventInfo.target.innerHTML);
      });
    });
  }

  async getgames(category) {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    try {
      loading.classList.replace("d-none", "d-flex"); // Show loading spinner
      const api = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
        options
      );
      const response = await api.json();
      game.display(response);
      this.getId();
    } catch (error) {
      console.error("Error fetching games:", error);
      alert("Failed to load games. Please try again later.");
    } finally {
      loading.classList.replace("d-flex", "d-none"); // Hide loading spinner
    }
  }

  getId() {
    document.querySelectorAll(".card").forEach((item) => {
      item.addEventListener("click", () => {
        this.show($(item).attr("id"));
      });
    });
  }

  show(detId) {
    new Details(detId);
    document.querySelector("main").classList.add("d-none");
    document.querySelector(".navbar").classList.add("d-none");
    document.querySelector(".head").classList.add("d-none");
    document.querySelector(".details").classList.remove("d-none");
  }
}
