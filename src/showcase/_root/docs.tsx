import { Prop, State, Watch, Component, getAssetPath, h } from '@stencil/core';
//import markdownIt from "markdown-it";
import marked from "marked";
import DOMPurify from "dompurify";

@Component({
  tag: 'showcase-docs',
  styleUrl: 'docs.css',
  shadow: true,
})
export class ShowcaseDocs {
  @Prop() pathParts: Array<string> = [];

  @State() maybeHtml: MaybeHtml = {state: MaybeHtmlState.Loading};

  @Watch('pathParts')
  watchHandler(newValue: Array<string>, oldValue: Array<string>) {
      if(newValue.join('') !== oldValue.join('')) {
        this.loadDocs(newValue);
      }
  }

  componentWillLoad() {
    this.loadDocs(this.pathParts);
  }

  loadDocs(pathParts:Array<string>) {
    this.maybeHtml = {state: MaybeHtmlState.Loading};

    const mdPath = `/static/docs/${pathParts.slice(0, -1).join('/')}/readme.md`;

    fetch(mdPath)
      .then(res => res.text())
      .then(text => marked(text))
      .then(html => DOMPurify.sanitize(html))
      .then(html => {
        this.maybeHtml = {
          html,
          state: MaybeHtmlState.Success
        }
      })
      .catch(error => {
        console.error(error);
        this.maybeHtml = {
          error,
          state: MaybeHtmlState.Error
        }
      });
  }
  render() {
    const { maybeHtml } = this;

    return maybeHtml.state === MaybeHtmlState.Error ? <h1>Error (see console)!</h1>
      : maybeHtml.state === MaybeHtmlState.Success ? <main innerHTML={maybeHtml.html}></main>
      : <h1>Loading...</h1>;
  }
}

interface MaybeHtml {
  error?: any
  html?: string
  state: MaybeHtmlState
}

enum MaybeHtmlState {
  Error,
  Success,
  Loading
}