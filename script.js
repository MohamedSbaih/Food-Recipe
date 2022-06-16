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


