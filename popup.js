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

  var inputElement = document.getElementById("queryText");
  var addBtn = document.getElementById("add-btn");

  addBtn.addEventListener("click", function () {
    var list = document.getElementById("list");

    var element = document.createElement("p");
    element.classList.add("searchButton");
    element.innerText = inputElement.value;

    list.append(element);

    console.log("clicked");
  });
});
