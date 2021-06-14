const STORAGE_API = "https://bre4986s3j.execute-api.us-east-2.amazonaws.com/StorageStage/storage";

function httpPost(url, paramsObj) {
  var http = new XMLHttpRequest();
  let params = JSON.stringify(paramsObj);

  http.open('POST', url, false);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  http.send(params);
  return JSON.parse(http.responseText);
}

function submitForm() {
  let paramsObj = {
    "Name": document.querySelector("#NameInput").value,
    "Age": document.querySelector("#AgeInput").value
  };
  let res = httpPost(STORAGE_API, paramsObj);
  let message = res["message"];
  if (message === "Item added successfully!") {
    let formDiv = document.querySelector("#Form");
    formDiv.innerHTML = "";
    let submittedElem = document.createElement("p");
    let submitText = document.createTextNode("Form Submitted!");
    submittedElem.appendChild(submitText);
    submittedElem.style.fontSize= "150%";
    formDiv.appendChild(submittedElem);
  }
  else {
    let errorDiv = document.querySelector("#Error");
    let errorElem = document.createElement("p");
    let errorText = document.createTextNode("Error: Age was invalid");
    errorElem.appendChild(errorText);
    errorElem.style.color = "red";
    errorDiv.appendChild(errorElem);
  }
}
