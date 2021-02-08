import { Component, h } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
//This will eventually be auto-generated

@Component({
  tag: 'showcase-root',
  styleUrl: 'root.css',
  shadow: true,
})
export class ShowcaseRoot {
  render() {
    return (
      <div>
        <header>
          <h1>Showcase</h1>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="showcase-home" exact={true} />
              <stencil-route url="/view/:path" routeRender={renderView}/>
              <stencil-route url="/docs/:path" routeRender={renderDocs}/>
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}

function renderView({history}:{history: RouterHistory}) {
  return h(getElementNameFromHistory(history));
}

function renderDocs({history}:{history: RouterHistory}) {
  const pathParts = getPathPartsFromHistory(history);
  return <showcase-docs pathParts={pathParts} />
}
function getElementNameFromHistory(history: RouterHistory):string {
  return getPathPartsFromHistory(history).join('-');
}
function getPathPartsFromHistory(history: RouterHistory):Array<string> {
  return trimByChar(history.location.pathname, '/')
    .split('/')
    .slice(1)
    .map(x => x.toLowerCase());
}
//credit: https://stackoverflow.com/a/43333491/784519
function trimByChar(string, character) {
  const arr = Array.from(string);
  const first = arr.findIndex(char => char !== character);
  const last = arr.reverse().findIndex(char => char !== character);
  return (first === -1 && last === -1) ? '' : string.substring(first, string.length - last);
}