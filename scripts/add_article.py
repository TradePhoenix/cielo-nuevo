from pathlib import Path

title = input("Title: ").strip()
slug = input("Slug: ").strip()
description = input("Description: ").strip()

component = "".join(word.capitalize() for word in slug.split("-")) + "Page"
page_file = Path(f"src/pages/{component}.js")
app_file = Path("src/App.js")
guides_file = Path("src/pages/GuidesPage.js")

page_code = f'''import ArticleLayout from "../components/ArticleLayout";
import Section from "../components/ArticleSection";

function {component}() {{
  return (
    <ArticleLayout
      title="{title}"
      subtitle="{description}"
      category="2026 Guide"
    >
      <Section title="Overview">
        <p>
          This guide is being prepared as part of the Path To Mexico relocation guide library.
        </p>
      </Section>
    </ArticleLayout>
  );
}}

export default {component};
'''

page_file.write_text(page_code)

app_text = app_file.read_text()
import_line = f'import {component} from "./pages/{component}";'
route_line = f'        <Route path="/guides/{slug}" element={{<{component} />}} />'

if import_line not in app_text:
    app_text = app_text.replace('import BestAreasToLivePage from "./pages/BestAreasToLivePage";', f'import BestAreasToLivePage from "./pages/BestAreasToLivePage";\n{import_line}')

if route_line not in app_text:
    app_text = app_text.replace('        <Route path="/guides/best-areas-to-live-in-playa-del-carmen" element={<BestAreasToLivePage />} />', f'        <Route path="/guides/best-areas-to-live-in-playa-del-carmen" element={{<BestAreasToLivePage />}} />\n{route_line}')

app_file.write_text(app_text)

guides_text = guides_file.read_text()

card = f'''      {{
        title: "{title}",
        description:
          "{description}",
        href: "/guides/{slug}",
        label: "2026 Guide",
      }},'''

if f'href: "/guides/{slug}"' not in guides_text:
    guides_text = guides_text.replace("    ],\n  },", card + "\n    ],\n  },")

guides_file.write_text(guides_text)

print(f"Created article page: src/pages/{component}.js")
print(f"Added route: /guides/{slug}")
print("Added guide card.")
