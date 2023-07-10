document.addEventListener("DOMContentLoaded", function () {
  var searchButtons = document.getElementsByClassName("searchButton");

  Array.from(searchButtons).forEach(function (button) {
    button.addEventListener("click", function () {
      var searchText = button.innerText;
      var searchQuery = encodeURIComponent(searchText);
      var searchURL = "https://www.google.com/search?q=" + searchQuery;
      chrome.tabs.create({ url: searchURL });
    });
  });

  let inputElement = document.getElementById("queryText");
  let input = inputElement.value;
  console.log({ input });

  let list = document.getElementById("list");
  let element = document.createElement("p");
  element.innerText = input;
  list.append(element);

  console.log({ element });

  let addBtn = document.getElementsById("add-btn");

  addBtn.addEventListener("click", function () {
    console.log("clicked");
  });
});
