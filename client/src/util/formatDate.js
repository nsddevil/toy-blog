export default function formatDate(date) {
  if (!date) return;
  const result = new Date(date);
  const year = result.getFullYear();
  const month = result.getMonth();
  const day = result.getDate();
  const hour = result.getHours();
  const min = result.getMinutes();

  return `${year}년 ${month + 1}월 ${day}일 ${hour}시${min}분`;
}
