function displayUser(user) {
    const userDataElement = document.getElementById('github-user-data');
    userDataElement.innerHTML = `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="github-content">
            <div class="github-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following: ${user.following} - Repos: ${user.public_repos}</p>
        </div>`;
}
function displayRepos(repos) {
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }

    var listItemsHTML = repos.map(function (repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });

    const repoDataElement = document.getElementById('github-repo-data');
    repoDataElement.innerHTML = `
    <div class="repo-list">
        <p><strong>Repo List:</strong></p>
        <ul>${listItemsHTML.join("\n")}</ul>
    </div>
    `;
}
function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function json(response) {
    return
}

function fetchGitHubInformation() {
    const usernameElement = document.getElementById('github-user-name');
    const userdataElement = document.getElementById('github-user-data');
    const userrepoElement = document.getElementById('github-repo-data');
    if (!usernameElement.value) {
        userdataElement.innerHTML = '<h4>Please enter a GitHub user name</h4>';
        return;
    }

    userdataElement.innerHTML = '<div id="loader"><img src="./assets/css/octocat-spinner-smil.min.svg" alt="loading..."></div>';
    userrepoElement.innerHTML = '';
    // https://www.pluralsight.com/guides/using-fetch-with-github-api-v3
    // https://developers.google.com/web/updates/2015/03/introduction-to-fetch
    fetch(`https://api.github.com/users/${usernameElement.value}`, { headers: { 'Accept': 'application/vnd.github.v3+json' } })
        .then(status)
        .then(response => response.json())
        .then(displayUser)
        .catch(error => {
            console.error(error);
            userdataElement.innerHTML = `<h2>No info found for user ${usernameElement.value}</h2>`;
        });

    fetch(`https://api.github.com/users/${usernameElement.value}/repos`, { headers: { 'Accept': 'application/vnd.github.v3+json' } })
        .then(status)
        .then(response => response.json())
        .then(displayRepos)
        .catch(error => {
            console.error(error);
            userdataElement.innerHTML = `<h2>No info found for user ${usernameElement.value}</h2>`;
        });

}

