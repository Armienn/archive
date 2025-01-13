"use strict"

const carousels = [
	{
		title: "Animals and creatures",
		images: [
			"art/12022-1-10 1.jpg",
			"art/12022-3-17 2.jpg",
			"art/12022-9-15 4.jpg",
			"art/12022-3-18 2b.jpg",
			"art/12022-10-11 1.jpg",
			"art/12022-12-20 3.jpg",
			"art/12021-10-08 1.jpg",
			"art/12021-10-18 2.jpg",
			"art/12022-1-13 1.jpg",
			"art/12022-4-23 1.jpg",
			"art/12022-5-13 3.jpg",
			"art/12022-9-11 2.jpg",
			"art/12022-2-27 1.jpg",
			"art/12022-2-27 2.jpg",
			"art/12022-4-15 1.jpg",
		],
	},
	{
		title: "People",
		images: [
			"art/12021-08-14 3.jpg",
			"art/12021-08-14 4.jpg",
			"art/12022-12-25 1.jpg",
			"art/12022-10-18 2.jpg",
			"art/12021-08-24 1a.jpg",
			"art/12021-08-23 1c.jpg",
			"art/12022-1-25 1.jpg",
			"art/12022-2-19 1.jpg",
			"art/12022-4-12 1.jpg",
			"art/12021-09-23.jpg",
			"art/12022-4-24 2.jpg",
			"art/12022-4-26 1.jpg",
			"art/12021-09-04 2.jpg",
			"art/12021-12-30 1.jpg",
			"art/12022-5-30 1.jpg",
			"art/12021-06-13 2.jpg",
		],
	},
	{
		title: "Things and scenery",
		images: [
			"art/12022-12-15 1.jpg",
			"art/12022-4-26 4.jpg",
			"art/12022-11-6 1.jpg",
			"art/12022-11-16 2.jpg",
			"art/12022-6-25 1.jpg",
			"art/12022-12-31 1.jpg",
			"art/12022-3-5 1.jpg",
			"art/12022-8-18 3.jpg",
			"art/12022-10-27 1.jpg",
			"art/12022-4-26 3.jpg",
			"art/12022-6-30 1.jpg",
		],
	},
]

function buildArt() {


	return /* html */`
<h2>Art</h2>
<p class="aber">TODO</p>
${carousels.map(toCarousel).join("")}
`
}

function toCarousel(carousel) {
	return /* html */`
<p>${carousel.title}</p>
<ol onclick="switchImage(event, ${carousel.images.length})">
${carousel.images.map(toCarouselEntry).join("")}
</ol>`
}

function toCarouselEntry(entry, index) {
	const firstItemStyle = 'style="margin-left: calc(50% - 210rem);"'
	return /* html */`
<li ${index == 0 ? firstItemStyle : ""}>
	<img src="${entry}" />
</li>`
}

function switchImage(event, numberOfImages) {
	const goLeft = event.clientX < window.innerWidth / 2
	const maxOffset = (numberOfImages - 1) * 60 + 30
	const firstItem = event.currentTarget.children[0]

	const currentOffset = +firstItem.style.marginLeft.split(" - ")[1].split("rem")[0]
	let newOffset = currentOffset + (goLeft ? -60 : 60)
	if (newOffset < 0)
		newOffset = maxOffset
	else if (newOffset > maxOffset)
		newOffset = 30
	firstItem.style.marginLeft = "calc(50% - " + newOffset + "rem)"
}

if (!pages)
	var pages = {}
pages["art"] = buildArt()