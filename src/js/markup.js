export function createElements(items) {
  return items
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a href="${largeImageURL}" class="photo-link">
					<div class="photo-card">
					  <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
					  <div class="info">
						 <p class="info-item">
							<b>Likes</b>
							<span id="likes">${likes}</span>
						 </p>
						 <p class="info-item">
							<b>Views</b>
							<span id="views">${views}</span>
						 </p>
						 <p class="info-item">
							<b>Comments</b>
							<span id="comments">${comments}</span>
						 </p>
						 <p class="info-item">
							<b>Downloads</b>
							<span id="downloads">${downloads}</span>
						 </p>
					  </div>
					</div>
				 </a>`;
      }
    )
    .join('');
}
