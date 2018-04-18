import * as raw from "raw-body";

export default function xmlBodyParser(options?) {
  if (typeof options !== "object") {
    options = {};
  }
  return async function xml(ctx, next) {
    /**
     * only parse and set ctx.request.body when
     * 1. type is xml (text/xml and application/xml)
     * 2. method is post/put/patch
     */
    if (ctx.is("text/xml", "xml") && /^(POST|PUT|PATCH)$/i.test(ctx.method)) {
      if (!options.encoding && ctx.request.charset) {
        options.encoding = ctx.request.charset;
      }
      const rawOptions = Object.assign(
        {
          limit: "1mb",
          encoding: "utf8",
          xmlOptions: {}
        },
        options
      );
      const len = ctx.req.headers["content-length"];
      if (len) {
        rawOptions.length = len;
      }
      return (raw(ctx.req, rawOptions) as any)
        .then(async str => {
          const xmlObj = await ctx.helper.xml.parseAsync(str);
          ctx.request.body = xmlObj;
          await next();
          if (ctx.request.url.indexOf("/wx") == -1) return;
          let body = ctx.body;
          // console.log(ctx.request);
          ctx.body = ctx.helper.xml.stringify({
            ToUserName: xmlObj.xml.FromUserName,
            FromUserName: xmlObj.xml.ToUserName,
            CreateTime: Math.floor(Date.now() / 1000),
            ...body
          });
        })
        .catch(next);
    } else {
      next();
    }
  };
}
