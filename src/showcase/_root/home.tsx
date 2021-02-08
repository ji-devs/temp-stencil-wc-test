
/*AUTO GENERATED */
import { Component, h } from '@stencil/core';

@Component({
  tag: 'showcase-home',
  styleUrl: 'home.css',
  shadow: true,
})
export class ShowcaseHome {
  render() {
    return (
      <main>
        <p>
            The following is auto-generated from the elements
            <br/>
            And may eventually be a nice folder menu on the side.
        </p>
        <ul><div class="label">core</div>
	<ul><div class="label">buttons</div>
		<ul><div class="label">rect</div>
			<li>				<div class="label">core-buttons-rect-rect</div>
				<stencil-route-link url="/view/core/buttons/rect/rect">
					<div class="link">View</div>				</stencil-route-link>				<stencil-route-link url="/docs/core/buttons/rect/rect">
				<div class="link">Docs</div>					</stencil-route-link>			</li>		</ul>
	</ul>
	<ul><div class="label">images</div>
		<ul><div class="label">img-ui</div>
			<li>				<div class="label">core-images-img-ui-img-ui</div>
				<stencil-route-link url="/view/core/images/img-ui/img-ui">
					<div class="link">View</div>				</stencil-route-link>				<stencil-route-link url="/docs/core/images/img-ui/img-ui">
				<div class="link">Docs</div>					</stencil-route-link>			</li>		</ul>
	</ul>
	<ul><div class="label">menus</div>
		<ul><div class="label">demo</div>
			<li>				<div class="label">core-menus-demo-demo</div>
				<stencil-route-link url="/view/core/menus/demo/demo">
					<div class="link">View</div>				</stencil-route-link>				<stencil-route-link url="/docs/core/menus/demo/demo">
				<div class="link">Docs</div>					</stencil-route-link>			</li>		</ul>
	</ul>
</ul>

      </main>
    );
  }
}