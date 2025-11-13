import { liteAdaptor } from "@mathjax/src/js/adaptors/liteAdaptor.js";
import { RegisterHTMLHandler } from "@mathjax/src/js/handlers/html.js";
import { TeX } from "@mathjax/src/js/input/tex.js";
import { mathjax } from "@mathjax/src/js/mathjax.js";
import { SVG } from "@mathjax/src/js/output/svg.js";

// Setup mathjax
const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

const tex = new TeX();
const svg = new SVG({ fontCache: "none" });

export async function tex2svg(source: string): Promise<string> {
	const html = mathjax.document("", { InputJax: tex, OutputJax: svg });
	const node = await html.convertPromise(source, { display: true });
	return adaptor.innerHTML(node);
}
