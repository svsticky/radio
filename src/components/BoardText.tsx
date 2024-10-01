import { StateMachineSlideProps } from '../App';
import { useBoardMessagesQuery } from '../store/api';

export default function BoardText({ current }: StateMachineSlideProps) {
  const { data: boardMessages, isSuccess } = useBoardMessagesQuery();

  if (!isSuccess)
    return <></>;

  const { message } = boardMessages[current];

  return (
    <section className='boardTextSection'>
      <h1 id='boardText'>{message}</h1>
    </section>
  );
}