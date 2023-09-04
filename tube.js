// category section
let sortViews = false;
let defaultCategoryId = 1000;
document.getElementById("sortButton").addEventListener("click", () => {
  sortViews = !sortViews;
  if (defaultCategoryId) {
    cards(defaultCategoryId, sortViews);
  }
});

const category = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const dataArray = data.data;
  const tabContainer = document.getElementById("tab-container");
  let activeTab = null;
  dataArray.forEach((category) => {
    const tab = document.createElement("a");
    tab.innerHTML = `
        <a onclick="tabClicked('${category.category_id}')" class="tab bg-[#D3D3D3]  rounded-md font-semibold">${category.category}</a>
        `;
    tabContainer.appendChild(tab);
    // tab color change
    tab.addEventListener("click", (event) => {
      if (activeTab) {
        activeTab.classList.remove("bg-[#FF1F3D]", "text-white");
      }
      event.target.classList.add("bg-[#FF1F3D]", "text-white", "rounded-md");
      activeTab = event.target;
    });
  });
  const defaultTab = tabContainer.querySelector(".tab");
  defaultTab.classList.add("bg-[#FF1F3D]", "text-white", "rounded-md");
  activeTab = defaultTab;
};
const tabClicked = (categoryId) => {
  defaultCategoryId = categoryId;
  cards(categoryId, sortViews);
};

const cards = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();
  const cardArray = data.data;
  if (sortViews) {
    cardArray.sort(
      (a, b) => parseFloat(b.others.views) - parseFloat(a.others.views)
    );
  }
  const cardContainer = document.getElementById("card-container");
  const emptyContainer = document.getElementById("empty");
  cardContainer.innerHTML = "";
  emptyContainer.innerHTML = "";
  cardArray.length > 0
    ? cardArray.forEach((card) => {
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
    <div class="card card-compact">
            <figure class="relative">
              <img class="rounded-lg w-[312px] h-[200px]" src="${
                card?.thumbnail
              }" alt="Title" />
              <div>
              <p class="text-xs text-white absolute p-1 rounded right-10 md:right-8  lg:right-4 bottom-3 ${
                card?.others?.posted_date ? " bg-[#171717]" : ""
              }">${
          card?.others?.posted_date
            ? `${timeHour(card.others.posted_date)} hrs ${timeMinute(
                card.others.posted_date
              )} min ago`
            : ""
        } </p>
              </div>
            </figure>
            <div class="card-body">
              <div class="flex gap-4">
                <div class="avatar">
                  <div class="w-10 h-10 mt-2 rounded-full">
                    <img src="${card.authors[0]?.profile_picture}" />
                  </div>
                </div>
                <div>
                  <h2 class="font-bold card-title">${card?.title}</h2>
                  <p class="inline-block font-medium text-sm text-[#171717B2] align-middle">${
                    card.authors[0]?.profile_name
                  }</p>
                  <img class="inline-block w-4 ml-1 align-middle" src="${
                    card?.authors[0]?.verified
                      ? "resoureces/fi_10629607.svg"
                      : ""
                  }" />
                  <p class="text-sm font-medium text-[#171717B2]">${
                    card.others?.views
                  } views</p>
                </div>
              </div>
            </div>
          </div>
    `;
        cardContainer.appendChild(cardDiv);
      })
    : (emptyContainer.innerHTML = `
  <img class="mb-8" src="resoureces/Icon.png" alt="">
          <h1 class="p-5 text-4xl font-bold text-center">Oops!! Sorry, There is no <br class="hidden md:block">content here</h1>
  `);
};

// time function

const timeHour = (seconds) => {
  let hour = parseInt(seconds / 3600);
  return hour;
};
const timeMinute = (seconds) => {
  let minute = parseInt((seconds % 3600) / 60);
  return minute;
};

const questions = () => {
  window.location.href = "questions.html";
};
category();
cards(1000, sortViews);
