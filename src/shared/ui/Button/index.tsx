import { ButtonProps, Button as VkButton } from '@vkontakte/vkui/dist/components/Button/Button';

interface Props extends ButtonProps { }

export default function Button(props: Props) {
  const { type = 'accent', content, onClick, children, className, disabled, appearance } = props;

  return (
    <VkButton
      disabled={disabled}
      appearance={appearance}
      className={className}
      type={type}
      onClick={onClick}
    >
      {content}
      {children}
    </VkButton>
  );
}
