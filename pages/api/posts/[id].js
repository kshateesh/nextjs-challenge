export default async function handler(req, res) {
  console.log(req.query);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${req.query.id}`
  );
  const post = await response.json();

  res.status(200).json({ ...post, timestamp: Date.now() });
}
