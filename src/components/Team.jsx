import { octokit } from '../helpers/github';
import { useQuery } from '../hooks/useQuery';
import Poster from './Poster';

export default function TeamPage() {
  const { data: members, isLoading } = useQuery(async () => {
    const res = await octokit.rest.orgs.listMembers({
      org: 'svsticky',
      per_page: 100,
    });

    return res.data;
  });

  if (isLoading)
    return <>Loading...</>;

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
                  alt="member avatar"
                />
                <div className="member-list__item_name">
                  {member.name || member.login}
                </div>
              </div>
            </>
          );
        })}
      </div>
      <Poster poster="/commitcrowd.jpeg" />
    </section>
  );
}
