import { GetServerSideProps } from "next";
import Dashboard from "@/components/Dashboard"

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const username = req.cookies.username;

  if (!username) {
      res.writeHead(302, { Location: "/login" });
      res.end();
  }

  return {
      props: {}
  };
}

export default function Home() {
    return (
        <>
          <Dashboard />
        </>
    )
}
