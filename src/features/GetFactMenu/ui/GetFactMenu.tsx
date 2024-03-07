import { Textarea } from '@vkontakte/vkui/dist/components/Textarea/Textarea';
import { SplitCol, SplitLayout } from '@vkontakte/vkui';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import Button from '../../../shared/ui/Button';
import styles from './GetFactMenu.module.scss';

export function GetFactMenu() {
  const [fact, setFact] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const { isFetching, data, refetch } = useQuery({
    queryKey: ['getFact'],
    queryFn: () =>
      fetch('https://catfact.ninja/fact')
        .then((response) => {
          return response.json();
        })
        .then((dto) => {
          if ('fact' in dto) {
            return dto.fact;
          }

          return 'Упс...';
        })
        .catch(() => 'Упс...'),
    enabled: false,
  });

  useEffect(() => {
    const { current: textArea } = textAreaRef
    if (data && textArea) {
      setFact(data)
      textArea.focus()
      textArea.setSelectionRange(data.length, data.length)
    }
  }, [data])

  const fetchRandomFact = () => {
    refetch();
  };

  const updateFact = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFact(event.target.value);
  };

  return (
    <SplitLayout className={styles.container}>
      <SplitCol width="100%">
        <Textarea
          getRef={textAreaRef}
          className={styles.textarea}
          placeholder="Здесь отобразится случайный факт, нажмите на кнопку"
          value={fact}
          onChange={updateFact}
          rows={12}
        />
      </SplitCol>
      <SplitCol width="max-content" style={{ alignSelf: 'center' }}>
        <Button disabled={isFetching} onClick={fetchRandomFact} loading={isFetching}>
          Получить факт
        </Button>
      </SplitCol>
    </SplitLayout>
  );
}
