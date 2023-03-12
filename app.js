const menuItems = document.querySelectorAll(".menu-item");

const changeActiveItem = () => {
	menuItems.forEach((item) => {
		item.classList.remove("active");
	});
};

menuItems.forEach((item) => {
	item.addEventListener("click", () => {
		changeActiveItem();
		item.classList.add("active");
	});
});

const search = document.getElementById("search");

const cardItems = document.querySelector(".card-items");

search.addEventListener("keyup", (e) => {
	if (e.keyCode == 13) {
		let inputTxt = e.target.value.trim();
		fetch(
			`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputTxt}`
		)
			.then((response) => response.json())
			.then((data) => {
				let html = "";
				if (data.meals) {
					data.meals.forEach((meal) => {
						html += `
						<div class="card" data-id="${meal.idMeal}">
							<div class="card-img">
								<div class="card-btn">
									<svg>
										<use xlink:href="#cart-plus"></use>
									</svg>
								</div>
								<img src="${meal.strMealThumb}" alt="food">
							</div>
							<div class="card-content">
								<div class="card-title">
									${meal.strMeal}
								</div>
								<div class="card-description">
									<div class="card-frame">1 | Croatian | Nutty</div>
									<div class="card-tag">Nutty</div>
								</div>
							</div>
						</div>
						`;
					});
					cardItems.classList.remove("not-found");
				} else {
					html = "Sorry, we didn't find any meal!";
					cardItems.classList.add("not-found");
				}
				cardItems.innerHTML = html;
			});
	}
});
