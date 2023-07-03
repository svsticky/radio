import { useQuery } from "react-query";

export default function Announcements() {
  const { data: announcements, isLoading } = useQuery(
    "koala-announcements",
    async () => {
      return "hi";
    }
  );

  return <>HIGIGI</>;
}
