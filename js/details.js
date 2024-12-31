// <reference types="../@types/jquery"/>

export class Details {
    constructor(id) {
      this.getDetails(id);
    }
  
    async getDetails(id) {
      const loading = document.querySelector(".spinnerr");
      loading.classList.replace("d-none", "d-flex"); // Show the loading spinner
      const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "34ad6a04a9msh2c9812247aab354p1dfcd0jsn27f4e282cf93",
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        },
      };
  
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result); // Debugging purposes, can be removed in production
        this.displayDetails(result);
      } catch (error) {
        console.error("Error fetching game details:", error);
        alert("Failed to load game details. Please try again later.");
      } finally {
        loading.classList.replace("d-flex", "d-none"); // Hide the loading spinner
      }
    }
  
    displayDetails(res) {
      const detailsHTML = `
        <div class="col-md-4 mt-5">
          <img src="${res.thumbnail}" class="w-100" alt="${res.title}">
        </div>
        <div class="col-md-8 mt-5 fw-bold">
          <h3 class="text-warning">Title: <span>${res.title}</span></h3>
          <p class="text-white">Category: <span class="bg-info p-1 rounded-2 text-black">${res.genre}</span></p>
          <p class="text-white">Platform: <span class="bg-info p-1 rounded-2 text-black">${res.platform}</span></p>
          <p class="text-white">Status: <span class="bg-info p-1 rounded-2 text-black">${res.status}</span></p>
          <p class="text-white">${res.description}</p>
          <a class="btn btn-outline-warning" target="_blank" href="${res.game_url}">Show Game</a>
        </div>
      `;
      document.querySelector("#details").innerHTML = detailsHTML;
    }
  }
  
  // Event listener for closing the details section
  document.querySelector("#btnClose").addEventListener("click", () => {
    document.querySelector("main").classList.remove("d-none");
    document.querySelector(".navbar").classList.remove("d-none");
    document.querySelector(".head").classList.remove("d-none");
    document.querySelector(".details").classList.add("d-none");
  });
  