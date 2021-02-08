import { Component, Prop, h } from '@stencil/core';
import classnames from "classnames";

export type Color = 'red' | 'blue' | 'white' | 'green' | 'whiteblue';
export type Size = 'small' | 'medium' | 'large' | 'x-large';

export type IconAfter = 'arrow';
export type IconBefore = 'magnifyer' | 'share' | 'create' | 'play' | 'plus' | 'blueplay';

@Component({
  tag: 'button-rect',
  styleUrl: 'rect.css',
  shadow: true,
})
export class ButtonRect {
  @Prop()
  size: Size = 'medium';

  @Prop()
  color: Color = 'red';

  @Prop()
  bold: boolean = false;

  @Prop()
  italic: boolean = false;

  @Prop()
  iconBefore?: IconBefore;

  @Prop()
  iconAfter?: IconAfter;

  render() {

    const {size, color, bold, italic,  iconAfter, iconBefore} = this;

    const classes = classnames({ 
      [size]: true,
      [color]: true,
      bold: bold,
      italic: italic,
     
    });
    
    const iconBeforePath = iconBefore === "magnifyer" ? "Icn_Magnfing.svg" 
        : iconBefore === "share" ? "Icn_Share_Red.svg" 
        : iconBefore === "create" ? "icn-plus-red.svg" 
        : iconBefore === "play" ? "icn-video-activity-hover.svg"
        : iconBefore === "plus" ? "icon-add-24-white.svg"
        : iconBefore === "blueplay" ? "play.svg"
        : null;

    const iconAfterPath = iconAfter === "arrow" ? "continue_arrow.svg"
      : null;

    return (
      <button type="button" name="button" class={classes}>
        {iconBefore && <img-ui class="left" path={iconBeforePath}></img-ui>}
        <slot></slot>
        {iconAfter && <img-ui class="right" path={iconAfterPath}></img-ui>}
      </button>
    );
  }
}
