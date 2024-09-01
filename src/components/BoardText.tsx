import { useBoardMessagesQuery } from '../store/api';

type BoardTextProps = {
  current: number;
};

export default function BoardText({ current }: BoardTextProps) {
  const { data: boardMessages, isSuccess } = useBoardMessagesQuery();

  if (!isSuccess) return <></>;

  const { message } = boardMessages[current];

  return (
    <section className="boardTextSection">
      <h1 id="boardText">{message}</h1>
    </section>
  );
}
