import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  return res.json();
};

const Post = ({ initialData }) => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(
    `http://localhost:3000/api/posts/${id}`,
    fetcher,
    {
      initialData,
      refreshInterval: 10000,
    }
  );

  if (error) return <div>Error loading post</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Post {id}</h1>
      <p>{data.title}</p>
      <p>{data.content}</p>
      <p>Timestamp: {data.timestamp}</p>
    </div>
  );
};

export async function getStaticPaths() {
  const paths = Array.from({ length: 5 }, (_, i) => ({
    params: { id: `${i + 1}` },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const initialData = await fetcher(
    `http://localhost:3000/api/posts/${params.id}`
  );

  return {
    props: {
      initialData,
    },
    revalidate: 10,
  };
}

export default Post;
