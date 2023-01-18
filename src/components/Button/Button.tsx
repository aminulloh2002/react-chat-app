import { FC } from 'react';
import styles from './Button.module.css';

type ButtonType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  onClick?: () => void;
  children?: string
  type?: ButtonType
  disabled?: boolean
}

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button className={styles.Button} type={props.type || 'button'} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
}

export default Button;
