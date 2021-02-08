const chokidar = require('chokidar');
const dree = require('dree');
const fs = require('fs');
const path = require('path');
const myArgs = process.argv.slice(2);

if(myArgs.indexOf("--watch") !== -1) {
    chokidar.watch('src/elements').on('all', (event, path) => {
        rebuild();
    });
} else {
    rebuild();
}

function rebuild() {

    const options = {
        extensions: [ 'tsx']
    };


    const tree = dree.scan('./src/elements', options);


    let output = '';

    function recurse(node, parentPath) {
        const {name, type, children} = node;

        const tabs = parentPath.map(() => "\t").join('');

        if(type === "directory") {
            if(name === "elements") {
                if(children.length) {
                    children.forEach(child => recurse(child, parentPath));
                }
            } else {
                output += `${tabs}<ul><div class="label">${name}</div>\n`;
                if(children.length) {
                    const childPath = parentPath.concat([name]);
                    children.forEach(child => recurse(child, childPath));
                }
                output += `${tabs}</ul>\n`;
            }
        } else if(type === "file") {
            output += makeLine(name, parentPath, tabs); 
        }
    }

    recurse(tree, []);

    const final = buildTemplate(output);

    fs.writeFile(path.resolve("./src/showcase/_root/home.tsx"), final, "UTF-8", err => {
        if(err) {
            console.error(err);
        }
    });
}

function makeLine(name, parentPath, tabs) {
    const baseFileName = getBaseFileName(name); 
    const elementName = parentPath.join('-') + `-${baseFileName}`;
    const viewPath = `/view/` + parentPath.join('/') + `/${baseFileName}`;
    const docsPath = `/docs/` + parentPath.join('/') + `/${baseFileName}`;

    let line = '';
    line += `${tabs}<li>`;
    line += `${tabs}\t<div class="label">${elementName}</div>\n`;
    line += `${tabs}\t<stencil-route-link url="${viewPath}">\n`;
    line += `${tabs}\t\t<div class="link">View</div>`;
    line += `${tabs}\t</stencil-route-link>`;

    line += `${tabs}\t<stencil-route-link url="${docsPath}">\n`;
    line += `${tabs}\t<div class="link">Docs</div>`;
    line += `${tabs}\t\t</stencil-route-link>`;

    line += `${tabs}</li>`;

    return line;
}

function getBaseFileName(name) {
    const idx = name.lastIndexOf('.');
    if(idx === -1) {
        return name;
    }

    return name.substr(0, idx);
}

function buildTemplate(output) {
const template = `
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
        %REPLACE_ME%
      </main>
    );
  }
}`
    return template.replace("%REPLACE_ME%", output);
}


