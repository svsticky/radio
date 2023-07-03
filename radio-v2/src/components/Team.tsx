import { octokit } from "@/helpers/github";
import { useQuery } from "react-query";

export const TeamSlide = () => {
  const { data: members, isLoading } = useQuery("members", async () => {
    const commitPromise = octokit.rest.repos.get({
      repo: "constipated-koala",
      owner: "svsticky",
    });

    const x = await commitPromise;
    console.log(x.data);

    return (
      await octokit.rest.orgs.listMembers({ org: "svsticky", per_page: 100 })
    ).data;
  });

  if (isLoading) return <> Loading... </>;

  return (
    <section className="member-wrapper">
      <div className="member-list">
        {members?.map((member) => {
          return (
            <>
              <div className="member-list__item">
                <img
                  className="member-list__item__img"
                  src={member.avatar_url}
                />
                <div className="member-list__item_name">
                  {member.name || member.login}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </section>
  );
};
