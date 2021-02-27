function getData(url) {
    fetch(url)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            updateResults(res);
        });
}

function onClick(e) {
    e.preventDefault();
    let userText = document.getElementById("userText").value;
    let field = document.querySelector('input[name="field"]:checked');
    if (field != null) {
        field = field.value;
    }
    let url = "";
    switch (field) {
        case "meal":
            url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + userText;
            break;
        case "ingredient":
            url = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + userText;
            break;
        case "category":
            url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + userText;

            break;
        case "area":
            url = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + userText;
            break;
        case "random":
            url = "https://www.themealdb.com/api/json/v1/1/random.php";
            break;
        default:
            url = 'https://www.themealdb.com/api/json/v1/1/random.php';
            break;
    }

    getData(url);


    /*
       fetch(url)
        .then(function (response) {
            if (response.status != 200) {
                return {
                    text: "Error calling the API: " + response.statusText
                }
            }
            console.log(response);
            return response.json();
        }).then(function (json) {
            console.log(json.text);
            updateResults(json.text);
        });
        */


}

function updateResults(info) {
    let recipes = "";
    if (info.meals==null){
        document.getElementById("recipe-cont").innerHTML = "<p class='error-text'>Sorry, no results came up for that search. Please try something else!</p>";
    }
    else if (info.meals.length > 1) {
        recipes += "<div class='recipe-prev-cont'>";
        for (let i = 0; i < info.meals.length; i++) {
            recipes += "<div class=recipe-prev>";
            recipes += "<p class='prev-meal-title'>" + info.meals[i].strMeal + "</p>";
            recipes += "<img class='img-prev' src=" + info.meals[i].strMealThumb + "/preview />";
            recipes += "</div>";
        }

        recipes += "</div>";
         document.getElementById("recipe-cont").innerHTML = recipes;
        
    }
    else if (info.meals.length == 1) {
        recipes += "<div class='recipe-full-cont'>";
        recipes += "<div class=recipe>";
        recipes += "<div class='top-cont'";
        recipes += "<p class='meal-title'>" + info.meals[0].strMeal + "</p>";
        recipes += "<img class='preview' src=" + info.meals[0].strMealThumb + "/preview />";
        recipes += "</div>"
        recipes += "<hr/>";
        recipes += "<div class='ingr-cont'>"
        for (let i = 1; i <= 20; i++) {
            let currIng = "strIngredient" + i;
            let currMeasure = "strMeasure" + i;
            if (info.meals[0][currIng] != "" && info.meals[0][currIng] != null) {
                recipes += "<p>" + info.meals[0][currMeasure] + " ";
                recipes += info.meals[0][currIng] + "</p>";
            }
        }
        recipes += "</div>";
        recipes += "<hr />";
        recipes += "<p class='instr'>" + info.meals[0].strInstructions + "</p>";
        recipes += "</div>";
        recipes += "</div>";
        document.getElementById("recipe-cont").innerHTML = recipes;
    }
   
   
}

document.getElementById('submit').addEventListener('click', onClick);