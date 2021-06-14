const STORAGE_API = "https://bre4986s3j.execute-api.us-east-2.amazonaws.com/StorageStage/storage";

function showAge() {
  let name = document.querySelector("#NameInput").value;
  let res = get_info(name)["Info"];
  let borderDiv = document.querySelector("#ResultBorder");
  borderDiv.style.display = "block";
  let resultDiv = document.querySelector("#Result");
  resultDiv.innerHTML = "";
  if (res != null) {
    let age = res["Age"];
    let ageElem = document.createElement("p");
    let ageText = document.createTextNode(`Your Age: ${age.toString()} years`);
    ageElem.style.fontSize = "120%";
    ageElem.appendChild(ageText);
    resultDiv.appendChild(ageElem);
  }
  else {
    let errorElem = document.createElement("p");
    let errorText = document.createTextNode("Error: You do not exist!");
    errorElem.style.fontSize = "120%";
    errorElem.style.color = "red";
    errorElem.style.fontWeight = "bold";
    errorElem.appendChild(errorText);
    resultDiv.appendChild(errorElem);
  }
}

function get_info(name) {
  return httpGet(STORAGE_API + `?Name=${name}`)
}

function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
}
