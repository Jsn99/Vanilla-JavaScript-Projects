document.getElementById("issueInputForm").addEventListener("submit", saveIssue);

function saveIssue(e) {
  const issueDesc = document.getElementById("issueDescInput").value;
  const issueSeverity = document.getElementById("issueSeverityInput").value;
  const issueAssignedTo = document.getElementById("issueAssignedToInput").value;
  const issueId = chance.guid();
  const issueStatus = "Open";

  //creating a object using all the data fetched from input
  const issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus,
  };
  //checking if the issue is stored in local storage if not pushing the issues
  if (localStorage.getItem("issues") == null) {
    let issues = [];
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  } else {
    let issues = JSON.parse(localStorage.getItem("issues"));
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  }

  document.getElementById("issueInputForm").reset();

  fetchIssues();

  e.preventDefault();
}

function setStatusClosed(id) {
  let issues = JSON.parse(localStorage.getItem("issues"));

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id === id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem("issues", JSON.stringify(issues));

  fetchIssues();
}

function deleteIssue(id) {
  let issues = JSON.parse(localStorage.getItem("issues"));

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem("issues", JSON.stringify(issues));

  fetchIssues();
}

function fetchIssues() {
  let issues = JSON.parse(localStorage.getItem("issues"));
  let issuesList = document.getElementById("issuesList");

  issuesList.innerHTML = "";

  if (issues) {
    for (let i = 0; i < issues.length; i++) {
      var id = issues[i].id;
      var desc = issues[i].description;
      var severity = issues[i].severity;
      var assignedTo = issues[i].assignedTo;
      var status = issues[i].status;

      issuesList.innerHTML += `
       <div class="well"> 
          <h6>Issue ID:${id}</h6> 
          <p><span class="label label-info">${status}</span></p> 
          <h3>${desc}</h3> 
          <p><span class="glyphicon glyphicon-time"></span>${severity}</p>
          <p><span class="glyphicon glyphicon-user"></span>${assignedTo} </p> 
          <a href="#" onclick="setStatusClosed('${id}')" class="btn btn-warning">Close</a>
          <a href="#" onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>
        </div>
      `;
    }
  }
}
