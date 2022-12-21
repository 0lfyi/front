import { ReactElement, createRef, ReactNode, PureComponent, cloneElement } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

type Def = {
  id: string;
  element: ReactElement;
};

class Defs extends PureComponent {
  private defs = createRef<SVGDefsElement>();

  private children: Def[] = [];

  public append(element: ReactElement): () => void {
    const id = _.uniqueId('__cc-def-');

    this.children.push({
      id,
      element: cloneElement(element, { key: id }),
    });

    this._render();

    return () => {
      this.children = this.children.filter((it) => it.id !== id);
      this._render();
    };
  }

  private _render(): void {
    window.requestAnimationFrame(() => {
      if (this.defs.current) {
        ReactDOM.render(_.map(this.children, 'element'), this.defs.current);
      }
    });
  }

  public render(): ReactNode {
    return <defs ref={this.defs} />;
  }
}

export default Defs;
