document.addEventListener("DOMContentLoaded", () => {
  let data;

  async function displayRecommendations() {
    try {
      const response = await fetch("travel_recommendation_api.json");
      if (!response.ok) throw new Error("Network response was not ok");

      data = await response.json();
      console.log(data); // Check the structure of the data

      const recommendationsContainer =
        document.getElementById("recommendations");

      // Display all sections initially
      data.countries.forEach((country) => {
        createSection(country.name, country.cities, recommendationsContainer);
      });

      createSection("Temples", data.temples, recommendationsContainer);
      createSection("Beaches", data.beaches, recommendationsContainer);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  // Function to handle the search functionality
  function search() {
    const searchInput = document
      .getElementById("searchInput")
      .value.toLowerCase()
      .trim();
    const searchResultsContainer = document.getElementById("searchResults");
    searchResultsContainer.innerHTML = ""; // Clear previous search results

    if (!searchInput) {
      searchResultsContainer.innerHTML =
        "<p>Please enter a keyword to search.</p>";
      return;
    }

    let resultsFound = false;

    // Search countries and cities
    data.countries.forEach((country) => {
      const countryMatch = country.name.toLowerCase().includes(searchInput);
      const matchingCities = country.cities.filter((city) =>
        city.name.toLowerCase().includes(searchInput)
      );

      if (countryMatch || matchingCities.length > 0) {
        resultsFound = true;
        const countrySection = document.createElement("div");
        countrySection.classList.add("recommendation-section");

        const countryTitle = document.createElement("h2");
        countryTitle.textContent = country.name;
        countrySection.appendChild(countryTitle);

        matchingCities.forEach((city) => {
          const cityCard = createCard(city);
          countrySection.appendChild(cityCard);
        });

        searchResultsContainer.appendChild(countrySection);
      }
    });

    // Search temples
    const matchingTemples = data.temples.filter((temple) =>
      temple.name.toLowerCase().includes(searchInput)
    );

    if (matchingTemples.length > 0) {
      resultsFound = true;
      const templeSection = document.createElement("div");
      templeSection.classList.add("recommendation-section");

      const templeTitle = document.createElement("h2");
      templeTitle.textContent = "Temples";
      templeSection.appendChild(templeTitle);

      matchingTemples.forEach((temple) => {
        const templeCard = createCard(temple);
        templeSection.appendChild(templeCard);
      });

      searchResultsContainer.appendChild(templeSection);
    }

    // Search beaches
    const matchingBeaches = data.beaches.filter((beach) =>
      beach.name.toLowerCase().includes(searchInput)
    );

    if (matchingBeaches.length > 0) {
      resultsFound = true;
      const beachSection = document.createElement("div");
      beachSection.classList.add("recommendation-section");

      const beachTitle = document.createElement("h2");
      beachTitle.textContent = "Beaches";
      beachSection.appendChild(beachTitle);

      matchingBeaches.forEach((beach) => {
        const beachCard = createCard(beach);
        beachSection.appendChild(beachCard);
      });

      searchResultsContainer.appendChild(beachSection);
    }

    if (!resultsFound) {
      searchResultsContainer.innerHTML =
        "<p>No results found for your search.</p>";
    }
  }

  // Helper function to create a section and populate it with cards
  function createSection(title, items, container) {
    const section = document.createElement("div");
    section.classList.add("recommendation-section");

    const heading = document.createElement("h2");
    heading.textContent = title;
    section.appendChild(heading);

    items.forEach((item) => {
      const card = createCard(item);
      section.appendChild(card);
    });

    container.appendChild(section);
  }

  // Helper function to create a card element
  function createCard(item) {
    const card = document.createElement("div");
    card.classList.add("recommendation-card");

    const img = document.createElement("img");
    img.src = item.imageUrl;
    img.alt = item.name;
    card.appendChild(img);

    const name = document.createElement("h3");
    name.textContent = item.name;
    card.appendChild(name);

    const description = document.createElement("p");
    description.textContent = item.description;
    card.appendChild(description);

    return card;
  }

  // Event listener for the search button
  document.getElementById("searchButton").addEventListener("click", search);

  // Event listener for the clear button
  document.getElementById("clearButton").addEventListener("click", clear);

  // Function to clear search input and results
  function clear() {
    document.getElementById("searchInput").value = ""; // Reset the search input field
    document.getElementById("searchResults").innerHTML = ""; // Clear previous search results
  }

  // Fetch and display recommendations on page load
  displayRecommendations();
});
