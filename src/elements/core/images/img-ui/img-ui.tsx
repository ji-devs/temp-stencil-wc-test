import { Component, Prop, h } from '@stencil/core';
import {uiPath} from "@utils/path";

@Component({
  tag: 'img-ui',
  shadow: false,
})
export class ButtonRect {
  @Prop()
  path: string = '';

  render() {

    const {path} = this;

    return (
        <img src={uiPath(path)} />
    );
  }
}
