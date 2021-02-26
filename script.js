function onClick(e) {
    e.preventDefault();
    let userText = document.getElementById("userText").value;
    let field = document.querySelector('input[name="field"]:checked');
    if (field != null) {
        field = field.value;
    }
    let url = "";
    switch(field) {
        case "meal":
            url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + userText;
            break;
        case "ingredient":

        case "category":
            url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + userText;

            break;
        case "area":

        default:
            url = 'https://www.themealdb.com/api/json/v1/1/random.php';
            url = "https://official-joke-api.appspot.com/random_joke";
            break;
    }
    fetch(url)
        .then(function (response) {
            if (response.status != 200) {
                return {
                    text: "Error calling the API: " + response.statusText
                }
            }
            console.log(response);
            return response.json();
        }).then(function(json) {
            console.log(json.text);
            updateResults(json.text);
        });
}

function updateResults(info) {
    document.getElementById("results").textContent = info;
}

document.getElementById('submit').addEventListener('click', onClick);