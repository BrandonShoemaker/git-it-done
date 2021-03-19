function displayWarning(repo){
    var limitWarningEl = $("#limit-warning");
    limitWarningEl.text("To view more than 30 issues, visit ");

    var moreIssueLinkEl = $("<a>");
    moreIssueLinkEl.text("See more issues at Github.com");
    moreIssueLinkEl.attr("href", "https://github.com/" + repo + "/issues");
    moreIssueLinkEl.attr("target", "_blank");

    limitWarningEl.append(moreIssueLinkEl);
}

function displayIssues(issues){
    for (let i = 0; i < issues.length; i++) {
        var issueEl = $("<a>");
        issueEl.addClass("list-item flex-row justify-space-between align-center");
        issueEl.attr("href", issues[i].html_url);
        issueEl.attr("target", "_blank");
        
        var titleEl = $("<span>").text(issues[i].title.trim());
        issueEl.append(titleEl);
        debugger;
        var typeEl = $("<span>");
        if(issues.length <= 0){
            $("#issues-container").text("This repo has no issues!");
        }
        else{
            if(issues[i].pull_request){
                typeEl.text("(Pull Request)");
            }
            else{
                typeEl.text("(Issue)");
            }
            issueEl.append(typeEl);
            $("#issues-container").append(issueEl);
        }
    }
}

function getRepoIssues(repo){
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then((response) => {
        if(response.ok){
            response.json().then((issues) => {
                displayIssues(issues);
            });
            if(response.headers.get("link")){
                console.log("Has more the 30 issues");
                displayWarning(repo);
            }
        }
        else{
            response.json().then((result) => {
                alert("Error: " + result.message);
                document.location.replace("./index.html");
            });
        }
    })
    .catch((error) => {
        alert("Unable to connect to Github");
    });
}

getRepoIssues(document.location.search.split("=")[1]);