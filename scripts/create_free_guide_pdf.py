from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

output = "public/downloads/10-things-to-know-before-moving-to-playa-del-carmen.pdf"

doc = SimpleDocTemplate(output, pagesize=letter)
styles = getSampleStyleSheet()
story = []

story.append(Paragraph("10 Things To Know Before Moving To Playa Del Carmen", styles["Title"]))
story.append(Spacer(1, 18))
story.append(Paragraph("A calmer, more practical introduction to life in Mexico.", styles["Heading2"]))
story.append(Spacer(1, 18))

sections = [
    ("1. Mexico Will Not Solve Everything", "Moving to Mexico can be transformative, but it is not an escape from yourself."),
    ("2. Understand The Real Cost Of Living", "Playa del Carmen can be more affordable than many parts of Canada and the United States, but it is not free."),
    ("3. Rent Before You Buy", "One of the biggest mistakes people make is rushing into long-term commitments before understanding daily life."),
    ("4. Residency Does Not Need To Be Rushed", "The right timing depends on your circumstances, goals, and plans."),
    ("5. Healthcare Is Better Than Many People Expect", "Mexico has excellent private healthcare, often with easier appointments and lower costs."),
    ("6. Neighborhoods Matter More Than Amenities", "Noise, walkability, groceries, coffee shops, green spaces, and community matter deeply."),
    ("7. Relationships Matter", "Information is everywhere. Trust is rare. The right local relationships can save enormous stress."),
    ("8. Slow Down", "There is no prize for rushing. Let the place reveal itself over time."),
    ("9. Life Will Feel Different", "Daily rhythms change. Priorities shift. Many people discover they were seeking more than sunshine."),
    ("10. Begin With Clarity", "You do not need every answer immediately. You simply need a clear next step."),
]

for title, text in sections:
    story.append(Paragraph(title, styles["Heading1"]))
    story.append(Paragraph(text, styles["BodyText"]))
    story.append(Spacer(1, 14))

story.append(Spacer(1, 18))
story.append(Paragraph("Path To Mexico | Cielo Nuevo", styles["Heading2"]))
story.append(Paragraph("Not everyone is meant to stay where they started.", styles["BodyText"]))

doc.build(story)
print("PDF created:", output)
