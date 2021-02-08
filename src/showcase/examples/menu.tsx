import { Component, h } from '@stencil/core';

@Component({
  tag: 'core-menus-demo-demo',
  shadow: true,
})

export class MenuDemo {
  render() {
      return (
          <menu-demo>
                <button-rect>I am a button inside a menu</button-rect>
          </menu-demo>
    );
  }
}
