import { useTimer } from '../App';
import { useMembersQuery } from '../store/api';
import Poster from './Poster';

export default function Team() {
  useTimer();
  const { data: members, isSuccess } = useMembersQuery();

  if (!isSuccess) return <></>;

  return (
    <section className="member-wrapper">
      <div className="member-list">
        {members.map((member) => {
          return (
            <>
              <div className="member-list__item">
                <img
                  className="member-list__item__img"
                  src={member.avatar_url}
                  alt="member avatar"
                />
                <div className="member-list__item_name">{member.name}</div>
              </div>
            </>
          );
        })}
      </div>
      <Poster src="/commitcrowd.jpeg" />
    </section>
  );
}
