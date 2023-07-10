document.addEventListener("DOMContentLoaded", function () {
  var searchButtons = document.getElementsByClassName("searchButton");
  function handleSearchGoogle() {
    var searchText = this.innerText;
    var searchQuery = encodeURIComponent(searchText);
    var searchURL = "https://www.google.com/search?q=" + searchQuery;
    window.open(searchURL, "_blank");
  }

  Array.from(searchButtons).forEach(function (button) {
    button.addEventListener("click", handleSearchGoogle);
  });

  var inputElement = document.getElementById("queryText");
  var addBtn = document.getElementById("add-btn");

  addBtn.addEventListener("click", function () {
    var list = document.getElementById("list");
    var input = inputElement.value;
    var linkRegex =
      /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?)([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?$/;

    if (linkRegex.test(input)) {
      var myAnchor = document.createElement("a");
      myAnchor.classList.add("searchButton");
      myAnchor.setAttribute("href", inputElement.value);
      myAnchor.setAttribute("target", "blank");
      myAnchor.textContent = input;
      list.append(myAnchor);
    } else {
      var element = document.createElement("a");
      element.classList.add("searchButton");
      element.innerText = input;

      element.addEventListener("click", handleSearchGoogle);

      list.append(element);
    }
  });
});
