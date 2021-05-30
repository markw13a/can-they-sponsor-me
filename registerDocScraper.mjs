import htmlParser from 'node-html-parser';
import { readFileSync, writeFileSync } from 'fs';

const fileContents = readFileSync('./org-names.xhtml', 'utf8');
const root = htmlParser.parse(fileContents);

const tableElements = root.querySelectorAll('tr');
const childNodes = tableElements.map(el => el && el.firstChild.childNodes.toString());
const childNodesWithoutBlanks = childNodes.filter(el => el.trim() !== '');
const nodesWithPTagsRemoved = childNodesWithoutBlanks.map(el => el.slice(3, -4));
// There are actually three actual company names that will
// be removed by this. No big deal.
const nodesWithoutPages = nodesWithPTagsRemoved.filter(el => !el.includes("Page"));
const nodesWithHTMLCodesConverted = nodesWithoutPages.map(el => el.replace('&amp;', '&'));

writeFileSync('./listings.json', JSON.stringify(nodesWithHTMLCodesConverted));