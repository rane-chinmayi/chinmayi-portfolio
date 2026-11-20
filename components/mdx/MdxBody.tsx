import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "./components";

/**
 * Renders a case-study MDX body in a readable column (max 720px, left-aligned
 * with the page header). Compiled at build time in a Server Component, so no
 * MDX runtime reaches the browser. remark-gfm provides tables; MDX comments
 * (curly-brace slash-star) render nothing.
 */
export default function MdxBody({ source }: { source: string }) {
  return (
    <div className="w-full max-w-[720px] [&>*:first-child]:mt-0">
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  );
}
