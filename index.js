async function getRepos() {
    const response = await fetch("https://api.github.com/users/linesreflect/repos?sort=created&direction=desc&per_page=6&type=public", {
        method: "GET"
    } );

    const repos = await response.json();

    setCardProjectName(repos);

    return repos
        
}

function setCardProjectName(repos) {
    repos.forEach((repo, index) => {
        const cardProjectName = document.getElementById(`card-${index + 1}-project-name`);
        cardProjectName.textContent = repo.name;
    })
}

async function getReposReadMe(repos) {

    repos.forEach(async (repo, index) => {
        const response = await fetch(`https://api.github.com/repos/linesreflect/${repo.name}/readme`, {
            method: "GET"
        } );

        const readMe = await response.json();

        setCardReadMe(readMe, index);
    })
}

function setCardReadMe(readMe, index) {
    const cardReadMe = document.getElementById(`card-${index + 1}-read-me`)
    if (readMe.content) {
        cardReadMe.textContent = atob(readMe.content)
    }
}

function getReposUrl(repos) {
    
    repos.forEach(async (repo, index) => {

        setRepoLink(repo.html_url, index + 1);
    })

}

function setRepoLink(url, index) {
    const cardRepoUrl = document.getElementById(`card-${index}-repo-url`);

    cardRepoUrl.href = url;
}

function getReposExternalLink(repos) {
    
    repos.forEach(async (repo, index) => {
        if (repo.homepage) {
            console.log("GOOOOOOOOOOOODDDDD")
            setRepoExternalLink(repo.homepage, index + 1);
        } else {
            document.getElementById(`card-${index + 1}-external-link`).style.display = 'none';
        }
    })

}

function setRepoExternalLink(externalLink, index) {
    const repoExternalLink = document.getElementById(`card-${index}-external-link`);

    repoExternalLink.href = externalLink;
}

function setPreviewImage(repos) {
    repos.forEach((repo, index) => {
        const imageUrl = `https://raw.githubusercontent.com/linesreflect/${repo.name}/main/preview.png`;
        
        const img = document.getElementById(`card-${index + 1}-preview-image`)
        img.src = imageUrl
        img.onerror = function() {
            img.src = 'assets/images/odin_homepage_placeholder.png';
        }
    })
}

async function setCardInfo() {
    const repos = await getRepos();
    setCardProjectName(repos);
    getReposReadMe(repos);
    getReposUrl(repos);
    getReposExternalLink(repos);
    setPreviewImage(repos)
}

setCardInfo();

