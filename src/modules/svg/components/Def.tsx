import type { FC } from 'react';
import { ReactElement, useContext, useEffect } from 'react';
import Context from '../Context';

interface Props {
  children: ReactElement | ReactElement[];
}

const Def: FC<Props> = ({ children }) => {
  const { defs } = useContext(Context);

  let el: ReactElement;

  if (Array.isArray(children)) {
    el = <>{children}</>;
  } else {
    el = children;
  }

  useEffect(() => defs().append(el));
  return null;
};

export default Def;
