export default function renderLoading(isLoading, data) {
  if(isLoading) {
    data.textContent = `${data.textContent}` + '...';
  } else {
    data.textContent = data.textContent.slice(0, -3);
  }
}
