export default function clickCheckFunction(name?: string) {
  const text = `${name ? `${name}が` : ''}クリックされました。`;
  console.log(text);
}
