import { Input, SplitCol, SplitLayout } from '@vkontakte/vkui';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { useForm, SubmitHandler, useController } from 'react-hook-form';
import Button from '../../../shared/ui/Button';
import styles from './GetAgeMenu.module.scss';

async function getAge(name: string, onFinish: VoidFunction, signal: AbortSignal) {
  try {
    const response = await fetch(`https://api.agify.io/?name=${name}`, { signal });
    const data = await response.json();
    onFinish();
    return data.age;
  } catch (error) {
    onFinish();
    throw Error('Unknown error');
  }
}

type GetAgeForm = {
  name: string;
};

export function GetAgeMenu() {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const timerId = useRef<NodeJS.Timeout>()
  const { handleSubmit, control } = useForm<GetAgeForm>({
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  });

  const {
    field: { onChange: setQuery, value: query, ref },
    fieldState: { invalid: isInputInvalid, error },
  } = useController({ control, name: 'name', rules: { validate: (value) => /^[a-zA-Zа-яА-я]+$/.test(value)} });

  const { data, refetch } = useQuery({
    queryKey: ['getFact', query],
    queryFn: ({ signal }) => getAge(query, () => setIsLoading(false), signal),
    enabled: false,
  });


  const fetchAge = useCallback(
    _.debounce(() => {
      refetch();
    }, 300), []
  );

  const onSubmit: SubmitHandler<GetAgeForm> = async (__, event) => {
    clearTimeout(timerId.current)
    event?.preventDefault();
    setIsLoading(true);
    fetchAge();
  };

  const updateQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    clearTimeout(timerId.current)
    if (!isInputInvalid) {
      const timer = setTimeout(() => {
        setIsLoading(true);
        fetchAge();
      }, 3000);
      timerId.current = timer
    }
  }, [fetchAge, query, isInputInvalid])

  return (
    <SplitLayout className={styles.container}>
      <SplitCol width="100%">
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          ref={formRef}
        >
          <Input placeholder='Введите имя' getRef={ref} type="text" value={query} onChange={updateQuery} />
          <p>{error?.message}</p>
          <Button
            disabled={isInputInvalid || !query}
            type="submit"
            appearance={!isInputInvalid ? 'accent' : 'negative'}
            loading={isLoading}
          >
            {!isLoading && 'Узнать возраст'}
            {isLoading && '...'}
          </Button>
        </form>
      </SplitCol>
      <SplitCol width="100%">
        <p className={styles.label}>Возраст {query}:</p>
        <p className={styles.age}>{data}</p>
        {!isLoading && !data && 'Нет результата по данному имени'}
      </SplitCol>
    </SplitLayout>
  );
}
