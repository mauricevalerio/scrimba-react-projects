import { blogsArrayData } from "./data.js";

document.addEventListener('click', e => {
	if (e.target.id === 'view-more-button') {
		document.querySelectorAll('.blog-section:nth-child(n + 4)').forEach(
			elem => elem.style.display = 'flex'
		);
		document.getElementById('view-more-button').style.display = 'none';
		document.getElementById('view-less-button').style.display = 'block';
	} else if (e.target.id === 'view-less-button') {
		hideBlogs();
	}
})

function createHtmlTemplate(html) {
	const template = document.createElement('template');
	template.innerHTML = html.trim();
	return template.content.firstChild;
}

function renderBlogs() {
	const blogsContainer = document.getElementById('blogs');

	blogsArrayData.forEach((blog, index) => {
		blogsContainer.appendChild(
			createHtmlTemplate(`
				<section class='blog-section'>
					<img src='${blog.imgPath}' class='blog-image'/>
					<p class='blog-date margin-zero'>${blog.date}</p>
					<h2 class='blog-title margin-zero'>${blog.title}</h2>
					<p class='blog-content margin-zero text-justify'>${blog.content}</p>
				</section>
			`)
		)
	})

	blogsContainer.insertAdjacentElement('afterend', createHtmlTemplate(`<button id='view-more-button' class='btn'>View More</button>`))
	blogsContainer.insertAdjacentElement('afterend', createHtmlTemplate(`<button id='view-less-button' class='btn'>View Less</button>`))
}

renderBlogs();
hideBlogs();

function hideBlogs() {
	document.querySelectorAll('.blog-section:nth-child(n + 4)').forEach(
		elem => elem.style.display = 'none'
	);
	document.getElementById('view-more-button').style.display = 'block';
	document.getElementById('view-less-button').style.display = 'none';
}

// function mobileMenuShow() {
// 	return (window.matchMedia('(max-width: 480px)').matches) ? true : false
// }