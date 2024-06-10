export default function convertLikesCount(likes: number) {
  if (likes < 1000) return likes;
  if (likes >= 1000 && likes < 999999) return parseFloat((likes / 1000).toFixed(1)) + 'k';
  if (likes >= 1000000) return parseFloat((likes / 1000000).toFixed(1)) + 'mln'; // :D
}
