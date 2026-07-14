import SEO from "../../../components/SEO";
import SchemaScript from "../schema/SchemaScript";
import { buildSchemaGraph } from "../schema/buildSchemaGraph";
import { buildMetadata } from "./buildMetadata";

/**
 * The single metadata entry point a guide template needs: reuses the
 * site's existing <SEO/> component for title/description/canonical/OG/
 * Twitter (React 19 head-hoisting), and additionally emits the JSON-LD
 * schema graph (Organization + Article + Breadcrumb + optional FAQ) for
 * that guide. Nothing here duplicates SEO.js's own tag logic.
 * @param {import('../types/guide').GuideRecord} guide
 * @param {import('../schema/breadcrumbSchema').BreadcrumbItem[]} breadcrumbs
 */
export default function GuideSEO({ guide, breadcrumbs = [] }) {
  const metadata = buildMetadata(guide);
  const schema = buildSchemaGraph(guide, breadcrumbs);

  return (
    <>
      <SEO {...metadata} />
      <SchemaScript schema={schema} />
    </>
  );
}
