# httpjax

MathJax-over-HTTP, a free public REST API to render TeX where it really
makes no sense to drag the entire library of LaTeX just to show a neatly
formatted math expression.

> [!NOTE]
> httpjax is in early development stage and is largely just Proof-of-Concept
> as of now; while I commit to avoid introducing breaking changes, the API
> design and/or layout is still subject to change.

## Docs

You can find up-to-date REST API docs (and a convenient Swagger UI)
[here](https://httpjax.dcache.workers.dev/docs/swagger).

OpenAPI JSON schema can be found [here (this repo)](openapi.json) or
[here (hosted)](https://httpjax.dcache.workers.dev/docs/openapi.json).

## You may be wondering...

### Why?

Because of [this issue](https://github.com/Monika-After-Story/MonikaModDev/issues/10475).
Then I thought it's certainly not the only use case for a TeX rendering
REST API.

### Why Cloudflare Workers?

Because it's free and it's been a while since I last did something useful
with Hono and Workers. Check out [QRify](https://qrify.dev), by the way 😎

### Why HTTP 302 to R2 bucket?

Because I thought it'd be neat to use it as sort of a cache. It's free
anyway 😛
