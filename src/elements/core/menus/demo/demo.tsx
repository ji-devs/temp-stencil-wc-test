import { Component, h } from '@stencil/core';

@Component({
  tag: 'menu-demo',
  shadow: true,
})

export class MenuDemo {
  render() {
    return (
        <ul>
            <slot></slot>
        </ul>
    );
  }
}
