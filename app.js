const search = document.getElementById("search");

const cardItems = document.querySelector(".card-items");

const loader = document.getElementById("loader");

const sidebarItems = document.querySelector(".sidebar");

function showLoader() {
	loader.classList.add("show");
}

function hideLoader() {
	loader.classList.remove("show");
}

search.addEventListener("keyup", (e) => {
	if (e.keyCode == 13) {
		let inputTxt = e.target.value.trim();
		showLoader();
		fetch(
			`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputTxt}`
		)
			.then((response) => response.json())
			.then((data) => {
				hideLoader();
				cardItems.innerHTML = "";
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

const requestURL = "https://www.themealdb.com/api/json/v1/1/categories.php";
fetch(requestURL)
	.then((response) => response.json())
	.then((data) => {
		let menu = "";

		if (data.categories) {
			data.categories.forEach((category) => {
				menu += `
					<a class="menu-item" data-id="${category.idCategory}">
						<h3>${category.strCategory}</h3>
					</a>
			`;
			});
			sidebarItems.innerHTML = menu;
		}
	})
	.then(() => {
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
				fetch(
					`https://www.themealdb.com/api/json/v1/1/filter.php?i=${item.innerText}`
				)
					.then((response) => response.json())
					.then((data) => {
						hideLoader();
						cardItems.innerHTML = "";
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
			});
		});
	});
