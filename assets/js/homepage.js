function displayRepos(repo, searchTerm){
    $("#repo-search-form").text(searchTerm);
    var repoContainer = $("#repos-container");

    for (let i = 0; i < repo.length; i++) {
        var repoName = repo[i].owner.login + "/" + repo[i].name;
        var repoEl = $("<a>");
        
        repoEl.addClass("list-item flex-row justify-space-between align-center")
        repoEl.attr("href", "./single-repo.html?repo=" + repoName);
        var repoNameEl = $("<span>").text(repoName);
        var statusEl = $("<span>").addClass("flex-row align-center");
        if(repo[i].open_issues_count > 0){
            statusEl.html("<i class='fas fa-times status-icon icon-danger'></i>" + repo[i].open_issues_count + " issue(s)");
        }
        else if(repo[i].open_issues_count === 0){
            statusEl.text("There are no repositories.");
        }
        else{
            statusEl.html("<i class='fas fa-check-square status-icon icon-success'></i>");
        }

        repoEl.append(repoNameEl, statusEl);
        repoContainer.append(repoEl);
    }
}

function getUserRepos(user){
    var apiUrl = "https://api.github.com/users/"+user+"/repos";
    fetch(apiUrl).then(response => {
        if(response.ok){
            response.json().then(data => {
                displayRepos(data, user);
            });
        }
        else{
            response.json().then(errorMessage => {
                alert("Error: " + errorMessage.message);
            });
        }
    })
    .catch((error) => {
        alert("Unable to connect to github");
    });

}

$(document).ready(function () {
    $("#user-form").on("click", "button", () => {
        var username = $("#username");
        if(!username.val()){
            alert("Please enter a valid username!");
            return;
        }
        else{
            getUserRepos(username.val().trim());
            username.val("");
        }
    });
});