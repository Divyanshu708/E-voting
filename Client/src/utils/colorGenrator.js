function colorGenerator() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(70 + Math.random() * 30);
  const l = Math.floor(30 + Math.random() * 20);

  return `hsl(${h} ${s} ${l})`;
}

export default colorGenerator;
