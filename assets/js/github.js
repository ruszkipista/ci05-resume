
function userInformationHTML(user) {
    return `
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

function fetchGitHubInformation() {
    const usernameElement = document.getElementById('github-user-name');
    const userdataElement = document.getElementById('github-user-data');
    if (!usernameElement.value) {
        userdataElement.innerHTML = '<h4>Please enter a GitHub user name</h4>';
        return;
    }

    userdataElement.innerHTML = '<div id="loader"><img src="./assets/css/octocat-spinner-smil.min.svg" alt="loading..."></div>'

    // https://www.pluralsight.com/guides/using-fetch-with-github-api-v3
    fetch(`https://api.github.com/users/${usernameElement.value}`, { headers: { 'Accept': 'application/vnd.github.v3+json' } })
        .then(response => {
            if (response.status === 404) {
                userdataElement.innerHTML = `<h2>No info found for user ${usernameElement.value}</h2>`;
                return null;
            } else {
                return response.json()
            }
        })
        .then(data => {
            if (data){
                if (data.message) {
                    userdataElement.innerHTML = `<h2>${data.message}</h2>`;
                } else {
                    userdataElement.innerHTML = userInformationHTML(data);
                }
            }
        })
        .catch(error => {
            console.error(error);
            userdataElement.innerHTML = `<h2>Error: ${error}</h2>`;
        });
}

