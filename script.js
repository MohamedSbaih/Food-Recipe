let searchBtn = document.querySelector('#search-btn')
const searchText = document.querySelector('.search-control')
const meal = document.querySelector('#meal')
const mealDetails = document.querySelector('.meal-details-content')
const recipeCloseBtn = document.getElementById('recipe-close-btn');
recipeCloseBtn.addEventListener('click', () => {
    mealDetails.parentElement.classList.remove('showRecipe');
});

//? Functionality to search button that show all result
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let searchInputTxt = searchText.value.trim()
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then((res) => {
        return res.json()
    }).then(data =>{
        // console.log(data)
        if(data.meals){
            data.meals.forEach(food =>{
                let title = document.createElement('div')
                title.setAttribute('class','meal-item')
                title.setAttribute('data-id',food.idMeal)
                meal.appendChild(title)
    
                let divImg = document.createElement('div')
                divImg.setAttribute('class','meal-img')
                title.appendChild(divImg)
    
                let img = document.createElement('img')
                img.setAttribute('src',food.strMealThumb)
                // console.log(food.strMealThumb)
                divImg.appendChild(img)
    
                let mealName = document.createElement('div')
                mealName.setAttribute('class','meal-name')
                title.appendChild(mealName)
    
                let name = document.createElement('h3')
                name.textContent = food.strMeal
                mealName.appendChild(name)
    
                let link = document.createElement('a')
                // console.log(food.strYoutube)
                link.setAttribute('href',"#")
                link.setAttribute('class','recipe-btn')
                link.textContent = 'Get Recipe'
                mealName.appendChild(link)
            }) 
            meal.classList.remove('notFound')
        }else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }
    })
})


//? functionality to show details the food
meal.addEventListener('click', getMealRecipe);
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        // console.log(mealItem)
        // console.log(mealItem.dataset.id)


        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response =>{ 
            // console.log(response)
            // console.log(response.json())
            return response.json()})
        .then(data =>{
            // console.log(data)
            mealRecipeModal(data.meals)
        } )
    }
}

//? function to create details card
// create a modal
function mealRecipeModal(meal){
    // console.log(meal);
    meal = meal[0];
    console.log(meal);

   
    let title = document.createElement('h2')
    title.setAttribute('class','recipe-title')
    title.textContent = meal.strMeal
    mealDetails.appendChild(title)

    let cat = document.createElement('p')
    cat.setAttribute('class','recipe-category')
    cat.textContent = meal.strCategory
    mealDetails.appendChild(cat)

    let inst = document.createElement('div')
    inst.setAttribute('class','recipe-instruct')
    mealDetails.appendChild(inst)

    let h3 = document.createElement('h3')
    h3.textContent="Instructions: "
    inst.appendChild(h3)

    let p1 = document.createElement('p')
    p1.textContent = meal.strInstructions
    inst.appendChild(p1)

    // let p2 = document.createElement('p')
    // p2.textContent = food.strMeal
    // inst.appendChild(p2)

    let recipeImg = document.createElement('div')
    recipeImg.setAttribute('class','recipe-meal-img')
    mealDetails.appendChild(recipeImg)

    let img = document.createElement('img')
    img.setAttribute('src',meal.strMealThumb)
    recipeImg.appendChild(img)


    
    let recipeLink = document.createElement('div')
    recipeLink.classList.add('recipe-link')
    mealDetails.appendChild(recipeLink)

    let link = document.createElement('a')
    link.setAttribute('href',meal.strYoutube)
    // link.setAttribute('target ','_blank')
    link.textContent = 'Watch Video'
    recipeLink.appendChild(link)

    mealDetails.parentElement.classList.add('showRecipe');
}